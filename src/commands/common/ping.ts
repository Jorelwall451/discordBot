import { 
    ApplicationCommandType,
} from "discord.js";
import Command from "../../structs/Command";

export default new Command({
    name: "ping",
    description: "reply with the pong",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }){

        interaction.reply({
            ephemeral: true,
            content: "pong"
        });
    }
});