import { verifyKey } from "discord-interactions";
import week from "../commands/week.js";

const commands = [week];

export const handler = async (event) => {
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
  const body = event.body;

  const isValid = await verifyKey(
    body,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY,
  );

  if (!isValid) {
    return { statusCode: 401, body: "invalid signature" };
  }

  const interaction = JSON.parse(body);

  if (interaction.type === 1) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: 1 }),
    };
  }

  if (interaction.type === 2) {
    const cmd = commands.find((c) => c.name === interaction.data.name);

    if (cmd) {
      try {
        const content = await cmd.execute();
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: 4,
            data: { content },
          }),
        };
      } catch (err) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: 4,
            data: { content: "API hiba történt." },
          }),
        };
      }
    }
  }

  return { statusCode: 404, body: "unknown command" };
};
