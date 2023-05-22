import { client } from "../..";
import Event from "../../structs/Event";

export default new Event({
    name: "ready",
    once: true,
    run(){
        const { 
            commands,
            buttons, 
            selects, 
            modals
        } = client;

        console.log("✅ Bot Online".green);
        console.log(`Commands loaded: ${commands.size}`);
        console.log(`Buttons loaded: ${buttons.size}`);
        console.log(`Selects loaded: ${selects.size}`);
        console.log(`Modals loaded: ${modals.size}`);
    }
});