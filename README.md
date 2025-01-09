# rzulty-bot
A simple bot for Discord, written with modularity and extendability in mind.

## General information and motivation
We wanted to automate some functionalities, but didn't really want to agree on standard and required quality of code.
Therefore, so as not to impact each other's work on unrelated commands, modularity was the obvious solution.
This repository serves as a base and functionalities are to be added as [modules](docs/module.md).

## Features
- dynamic module import
- (for now hardcoded to sqlite) database integration
- code you can steal if you are newer to this than us and want to reverse engineer something

Actual bot features aimed towards users are to be imported as modules.

## Documentation
Located in [docs](docs) subdirectory. Bot is WIP with no users other than us for now, so just create an issue if something is missing.

## Development
Node.js is required. Not sure about the specific version requirements, so just hope for the best and create an issue if it fails.

Before starting, you need to create a [Discord application](https://discord.com/developers/applications) with a corresponsing bot user. Specific permissions the bot needs depend on the modules to be installed. Then, in the main directory create a file called `.env` with content:

```
DISCORD_TOKEN=<your bot user discord token>
CLIENT_ID=<your bot application id>
```

Then, install required modules: hopefully, just this will work:

```bash
> npm install
```


The bot package has these scripts available:
- `test` - will test everything (will be implemented before a push to master)
- `start` - runs the bot
- `update-commands` - register slash commands for the Discord application. Needs to be run after a new command is added and before the first run.

Therefore, to properly start the bot for the first time, you need to run:
```bash
> npm run update-commands
> npm start
```