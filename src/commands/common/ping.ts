import { 
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle 
} from "discord.js";
import Command from "../../structs/Command";

export default new Command({
    name: "ping",
    description: "reply with the pong",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }){

        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>({
            components: [ 
                new ButtonBuilder({
                    customId: "test-button",
                    label: "Clique aqui",
                    style: ButtonStyle.Success
                })
            ]
        });

        interaction.reply({
            ephemeral: true,
            content: "pong",
            components: [ row ]
        });
    }
});