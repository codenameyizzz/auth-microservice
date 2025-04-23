const bcrypt = require("bcrypt");
const { User, Fakultas, Prodi } = require("../models");

async function seedUsers() {
  // ADMIN USER
  const adminFakultas = await Fakultas.findOne({
    where: { name: "Fakultas Informatika dan Teknik Elektro" },
  });
  const adminProdi = await Prodi.findOne({ where: { name: "S1 Informatika" } });

  await User.create({
    name: "Admin Albukerki",
    nim: "admin000",
    fakultas_id: adminFakultas ? adminFakultas.id : null,
    prodi_id: adminProdi ? adminProdi.id : null,
    tahun_lulus: 2012,
    password: "password",
    role: "admin",
  });

  // ALUMNI USERS
  const vokasi = await Fakultas.findOne({ where: { name: "Vokasi" } });
  const bioDiv = await Prodi.findOne({
    where: { name: "DIV Teknologi Rekayasa Perangkat Lunak" },
  });
  const fiteProdi = await Prodi.findOne({ where: { name: "S1 Informatika" } });

  await User.create({
    name: "Alumni Pinkman",
    nim: "alumni001",
    fakultas_id: vokasi ? vokasi.id : null,
    prodi_id: bioDiv ? bioDiv.id : null,
    tahun_lulus: 2022,
    password: "password",
    role: "alumni",
  });

  await User.create({
    name: "Alumni Skyler",
    nim: "alumni002",
    fakultas_id: adminFakultas ? adminFakultas.id : null,
    prodi_id: fiteProdi ? fiteProdi.id : null,
    tahun_lulus: 2022,
    password: "password",
    role: "alumni",
  });
}

module.exports = seedUsers;
