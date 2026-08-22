import { buildEmbed } from "../utils/buildEmbed.js";

export default {
  name: "hét",
  async execute() {
    const res = await fetch("https://api.ymstnt.com/uwc");
    const data = await res.json();
    let responseBody;

    if (data.regWeek) {
      responseBody = "Regisztrációs hét";
    } else if (data.exam) {
      responseBody = `Vizsgaidőszak - szünet (${data.daysLeft} nap van hátra)`;
    } else if (data.study) {
      responseBody = `${data.week}. hét**`;
    } else {
      responseBody = `Szünet (${data.daysLeft} nap van hátra)`;
    }

    const semester = data.studyPeriods?.[0]?.semester ?? "";

    return buildEmbed({
      title: "Aktuális hét",
      content: responseBody,
      footer: semester,
    });
  },
};
