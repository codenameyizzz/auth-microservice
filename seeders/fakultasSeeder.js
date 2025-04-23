const { Fakultas } = require("../models");

async function seedFakultas() {
  const names = [
    "Vokasi",
    "Fakultas Informatika dan Teknik Elektro",
    "Fakultas Teknologi Industri",
    "Fakultas Bioteknologi",
  ];

  for (const name of names) {
    await Fakultas.findOrCreate({ where: { name } });
  }
}

module.exports = seedFakultas;
