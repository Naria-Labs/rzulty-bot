# Module

## Location

Modules are located in `modules/<module name>` subdirectories.

## Format

There exists a [template repository](https://github.com/Naria-Labs/base-module) containing a simple example of a module. The format is as follows:

### module.js
The main file of the module, placed in its root. Exports at least:
- `commands` - array of active module [commands](#commands)
- (optional) `initDB` - function that will be given the sequelize database as the only parameter, called before any command becomes active. Module-specific database parts should be initiated there if necessary.

### Commands

Commands are files exporting at least:
- `data` - an instance of `SlashCommandBuilder`
- `execute` - `async` function to be executed with an appropriate `Interaction` as a parameter
