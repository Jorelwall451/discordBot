import ExtendedClient from "./structs/ExtendendClient";
export * as colors from "colors";
import configsJson from "./configs.json";

export const client: ExtendedClient = new ExtendedClient();
export const configs = configsJson;

client.start();