import { REST, Routes } from "discord.js";

const TOKEN = process.env.DISCORD_TOKEN;
const APP_ID = process.env.DISCORD_APP_ID;

const rest = new REST({ version: "10" }).setToken(TOKEN);

await rest.put(Routes.applicationCommands(APP_ID), {
  body: [
    {
      name: "hét",
      description: "Információt ad a jelenlegi hét számáról, a vizsgaidőszakból és a szünetből hátralévő napok számáról.",
    },
  ],
});

console.log("Command registered");
