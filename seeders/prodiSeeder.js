const { Prodi, Fakultas } = require("../models");

async function seedProdi() {
  const entries = [
    {
      name: "S1 Informatika",
      fakultasName: "Fakultas Informatika dan Teknik Elektro",
    },
    {
      name: "S1 Sistem Informasi",
      fakultasName: "Fakultas Informatika dan Teknik Elektro",
    },
    {
      name: "S1 Teknik Elektro",
      fakultasName: "Fakultas Informatika dan Teknik Elektro",
    },
    { name: "S1 Teknik Bioproses", fakultasName: "Fakultas Bioteknologi" },
    {
      name: "S1 Manajemen Rekayasa",
      fakultasName: "Fakultas Teknologi Industri",
    },
    {
      name: "S1 Teknik Metalurgi",
      fakultasName: "Fakultas Teknologi Industri",
    },
    { name: "DIII Teknologi Komputer", fakultasName: "Vokasi" },
    { name: "DIII Teknologi Informasi", fakultasName: "Vokasi" },
    { name: "DIV Teknologi Rekayasa Perangkat Lunak", fakultasName: "Vokasi" },
  ];

  for (const { name, fakultasName } of entries) {
    const fakultas = await Fakultas.findOne({ where: { name: fakultasName } });
    await Prodi.findOrCreate({
      where: { name, fakultasId: fakultas ? fakultas.id : null },
    });
  }
}

module.exports = seedProdi;
