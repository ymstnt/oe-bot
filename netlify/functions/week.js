import { verifyKey } from "discord-interactions";

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

  if (interaction.type === 2 && interaction.data.name === "hét") {
    console.log("event:", JSON.stringify(event));
    try {
      const res = await fetch("https://api.ymstnt.com/uwc");
      const data = await res.json();
      let responseBody = "";

      if (data.regWeek) {
        responseBody = "Regisztrációs hét";
      } else if (data.exam) {
        responseBody = `Vizsgaidőszak - szünet (${data.daysLeft} nap van hátra)`;
      } else if (data.study) {
        responseBody = `Aktuális hét: **${data.week}. hét**`;
      } else {
        responseBody = `Szünet (${data.daysLeft} nap van hátra)`;
      }

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 4,
          data: { content: responseBody },
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

  return { statusCode: 404, body: "unknown command" };
};
