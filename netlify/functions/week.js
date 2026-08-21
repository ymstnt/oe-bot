import { verifyKey } from "discord-interactions";

export const handler = async (event) => {
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
  const body = event.body;

  // Signature verification
  const isValid = await verifyKey(
    body,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY
  );

  if (!isValid) {
    return { statusCode: 401, body: "invalid signature" };
  }

  const interaction = JSON.parse(body);

  // Ping válasz
  if (interaction.type === 1) {
    return { statusCode: 200, body: JSON.stringify({ type: 1 }) };
  }

  // Slash command
  if (interaction.type === 2 && interaction.data.name === "hét") {
    try {
      const res = await fetch("https://api.ymstnt.com/uwc");
      const week = await res.text();

      return {
        statusCode: 200,
        body: JSON.stringify({
          type: 4,
          data: { content: `Aktuális egyetemi hét: **${week}**` },
        }),
      };
    } catch (err) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          type: 4,
          data: { content: "API hiba történt." },
        }),
      };
    }
  }

  return { statusCode: 404, body: "unknown command" };
};
