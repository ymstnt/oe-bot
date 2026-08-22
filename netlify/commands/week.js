export default {
  name: "hét",
  async execute() {
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

    return responseBody;
  },
};
