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

    let msg = "";
    if (sp) {
      msg += `**Szorgalmi időszak**\n${formatDate(sp.start)} - ${formatDate(sp.end)} (${sp.semester})\n\n`;
    }
    if (ep) {
      msg += `**Vizsgaidőszak**\n${formatDate(ep.start)} - ${formatDate(ep.end)} (${ep.semester})`;
    }

    return msg || "Nincs aktív időszak.";
  },
};
