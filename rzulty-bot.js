// basic code using a lot from https://discordjs.guide

const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js");
const { ActivityType } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const { db, registerModuleModels } = require("database.js");

if (!db.initDatabase()) {
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const modulesPath = path.join(__dirname, "modules");
const moduleFolders = fs.readdirSync(modulesPath);

for (const folder of moduleFolders) {
  const modulePath = path.join(modulesPath, folder, "module.js");
  const importedModule = require(modulePath);
  registerModuleModels(importedModule);
  if ("commands" in importedModule) {
    for (const command of importedModule.commands) {
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        console.log(`Command ${command.data.name} from module ${folder}`);
      } else {
        console.log(
          `[WARNING] A command from module ${folder} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  client.user.setActivity("/help", {
    type: ActivityType.Listening,
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  console.log(interaction);
});

process.on("SIGINT", function () {
  db.closeDatabase();
});

client.login(process.env.DISCORD_TOKEN);
