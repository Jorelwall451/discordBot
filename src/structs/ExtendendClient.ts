import { 
    ApplicationCommandDataResolvable,
    BitFieldResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentsString,
    IntentsBitField,
    Partials
} from "discord.js";
import { 
    CommandType,
    ComponentsButton,
    ComponentsModal,
    ComponentsSelect 
} from "./Command";
import dotenv from "dotenv";
import path from "path";
import { readdirSync } from "fs";
import { EventType } from "./Event";

dotenv.config();

function fileCondition(fileName: string): boolean {
    return fileName.endsWith(".ts") || fileName.endsWith(".js");
}

export default class ExtendedClient extends Client { 
    public commands: Collection<string, CommandType> = new Collection(); 
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();

    constructor(){
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User
            ]
        });
    }

    public start(): void {
        this.registerModules();
        this.registerEvents();
        const BOT_TOKEN: string = process.env.BOT_TOKEN;

        this.login(BOT_TOKEN);
    }

    private registerCommands(commands: Array<ApplicationCommandDataResolvable>): void {
        this.application?.commands.set(commands)
            .then(function(){
                console.log("✔️ Slash Commands (/) defined".green);
            })
            .catch(function(error){
                throw new Error(`❌ An error ocurred when trying to set the Slash commands(/): ${error}`);
            });
    }

    private registerModules(): void {
        const slashCommands: Array<ApplicationCommandDataResolvable> = [];

        const commandsPath: string = path.join(__dirname, "..", "commands");

        readdirSync(commandsPath).forEach(async local => {
            readdirSync(commandsPath + `/${local}/`)
                .filter(fileCondition)
                .forEach(async fileName => {
                    const command: CommandType = (
                        await import(`../commands/${local}/${fileName}`)
                    )?.default;

                    const { 
                        name,
                        buttons,
                        selects,
                        modals
                    } = command;

                    if(name){
                        this.commands.set(name, command);
                        slashCommands.push(command);
                    }

                    if(buttons) buttons.forEach(( run, key ) => this.buttons.set(key, run));
                    if(selects) selects.forEach(( run, key ) => this.selects.set(key, run));
                    if(modals) modals.forEach(( run, key ) => this.modals.set(key, run));

                });
        });

        this.on("ready", () => this.registerCommands(slashCommands));
    }

    private registerEvents(): void { 
        const eventsPath: string = path.join(__dirname, "..", "events");

        readdirSync(eventsPath)
            .forEach(local => {
                readdirSync( `${eventsPath}/${local}`)
                    .filter(fileCondition)
                    .forEach(async fileName => { 
                        const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`)).default;

                        try {
                            if( name ) ( once ) ? this.once(name, run) : this.on(name, run);
                        }catch(error){ 
                            throw new Error(`An error ocurred on event: ${name} \n ${error}`);
                        }
                    });
            });
    }
}