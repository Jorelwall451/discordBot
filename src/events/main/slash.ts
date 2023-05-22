import { CacheType, CommandInteractionOptionResolver } from "discord.js";
import { client } from "../..";
import { CommandType } from "../../structs/Command";
import Event from "../../structs/Event";

export default new Event({
    name: "interactionCreate",
    run(interaction){
        if(!interaction.isCommand()) return;

        const command: CommandType | undefined = client.commands.get(interaction.commandName);

        if(!command) return;

        const options: CommandInteractionOptionResolver<CacheType> = interaction.options as CommandInteractionOptionResolver;

        command.run({
            client,
            interaction,
            options
        });
    }
});