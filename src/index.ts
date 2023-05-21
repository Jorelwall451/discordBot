import ExtendedClient from "./structs/ExtendendClient";
export * as colors from "colors";

export const client: ExtendedClient = new ExtendedClient();

client.start();

client.on("ready", function(): void { 
    console.log("Bot is ready.".green);
});