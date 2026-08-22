import dotenv from "dotenv";
dotenv.config();

import { REST, Routes } from "discord.js";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

await rest.put(Routes.applicationCommands(process.env.DISCORD_APP_ID), {
  body: [
    {
      name: "hét",
      description: "Információt ad a jelenlegi hét számáról, a vizsgaidőszakból és a szünetből hátralévő napok számáról.",
    },
  ],
});

console.log("Command registered");
