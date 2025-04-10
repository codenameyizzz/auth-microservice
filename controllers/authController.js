require('dotenv').config();

const { User } = require("../models");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { caesarEncrypt } = require("../helpers/caesarCipher");

const { getExternalApiToken } = require("../services/authService");

exports.register = async (req, res) => {
  const { name, nim, prodi, fakultas, tahun_lulus, password } = req.body;

  if (!name || !nim || !prodi || !fakultas || !tahun_lulus || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    // 1. Ambil token API eksternal
    const token = await getExternalApiToken();
    if (!token)
      return res
        .status(500)
        .json({ message: "Gagal mendapatkan token eksternal" });

    // 2. Panggil API alumni
    const response = await axios.get(
      "https://cis-dev.del.ac.id/api/library-api/alumni",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { nim },
      }
    );

    const alumniData = response.data?.data?.alumni?.[0];
    if (!alumniData)
      return res.status(404).json({ message: "Data alumni tidak ditemukan" });

    console.log(
      "📋 Data dari API alumni:",
      JSON.stringify(alumniData, null, 2)
    );
    console.log("🧾 Data input user:", {
      name,
      nim,
      prodi,
      fakultas,
      tahun_lulus,
    });

    // 3. Validasi kesesuaian data
    if (
      alumniData.nim !== nim ||
      alumniData.nama.trim().toLowerCase() !== name.trim().toLowerCase() ||
      alumniData.prodi_name.trim().toLowerCase() !==
        prodi.trim().toLowerCase() ||
      alumniData.fakultas.trim().toLowerCase() !==
        fakultas.trim().toLowerCase() ||
      parseInt(alumniData.tahun_lulus) !== parseInt(tahun_lulus)
    ) {
      return res
        .status(400)
        .json({ message: "Data tidak sesuai dengan catatan alumni" });
    }

    // 4. Simpan user (asumsikan fakultas_id dan prodi_id disediakan dari Laravel atau mapping tersendiri)
    const user = await User.create({
      nim,
      name, // akan terenkripsi otomatis di hook
      password, // akan di-hash otomatis
      tahun_lulus,
      fakultas_id: 1, // ← ganti sesuai mapping dari Laravel DB
      prodi_id: 1, // ← ganti sesuai mapping dari Laravel DB
    });

    res
      .status(201)
      .json({ message: "Registrasi berhasil", user: { nim: user.nim, name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
  }
};

exports.login = async (req, res) => {
  console.log('DARI LARAVEL:', req.body);
  try {
    const { username, password } = req.body;

    // Cari user berdasarkan username atau email
    const user = await User.findOne({
      where: { nim: username },
    });

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Cek password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    // Buat token
    const token = jwt.sign(
      { uid: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    const refreshToken = jwt.sign(
      { uid: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      result: true,
      success: "Login berhasil",
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      token,
      refresh_token: refreshToken
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
};