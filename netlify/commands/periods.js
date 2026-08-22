import { buildEmbed } from "../utils/buildEmbed.js";

export default {
  name: "időszakok",
  async execute() {
    const res = await fetch("https://api.ymstnt.com/uwc");
    const data = await res.json();

    const sp = data.studyPeriods?.[0];
    const ep = data.examPeriods?.[0];

    const formatDate = (d) =>
      new Date(d).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    let content = "";
    if (sp) content += `**Szorgalmi időszak**\n${formatDate(sp.start)} - ${formatDate(sp.end)}\n\n`;
    if (ep) content += `**Vizsgaidőszak**\n${formatDate(ep.start)} - ${formatDate(ep.end)}`;
    
    const semester = sp?.semester ?? "";

    return buildEmbed({
      title: "Időszakok",
      content: content || "Nincs aktív időszak.",
      footer: semester, 
    });
  },
};
