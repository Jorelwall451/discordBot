/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    ApplicationCommandData,
    ButtonInteraction,
    Collection,
    CommandInteraction,
    CommandInteractionOptionResolver,
    ModalSubmitInteraction,
    StringSelectMenuInteraction
} from "discord.js";
import ExtendedClient from "./ExtendendClient";

 interface CommandProps { 
    client: ExtendedClient;
    interaction: CommandInteraction;
    options: CommandInteractionOptionResolver;
}

export type ComponentsButton = Collection<string, (Interaction: ButtonInteraction ) => any>;
export type ComponentsSelect = Collection<string, (Interaction: StringSelectMenuInteraction ) => any>;
export type ComponentsModal = Collection<string, (Interaction: ModalSubmitInteraction ) => any>;

interface CommandComponents { 
    buttons?: ComponentsButton;
    selects?: ComponentsSelect;
    modals?: ComponentsModal;
}

export type CommandType = ApplicationCommandData & CommandComponents & { 
    run(props: CommandProps): any;   
}

export default class Command {
    constructor(options: CommandType){
        options.dmPermission = false;
        Object.assign(this, options);
    }
}