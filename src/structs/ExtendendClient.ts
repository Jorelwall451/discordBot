import { 
    BitFieldResolvable,
    Client,
    GatewayIntentsString,
    IntentsBitField,
    Partials
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export default class ExtendedClient extends Client { 
    constructor(){
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent,
                Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User
            ]
        });
    }

    public start(): void {
        const BOT_TOKEN: string = process.env.BOT_TOKEN;

        this.login(BOT_TOKEN);
    }
}