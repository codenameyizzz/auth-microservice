const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Fakultas, Prodi } = require("../models");
const { getExternalApiToken } = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { name, nim, prodi, fakultas, tahun_lulus, password } = req.body;

    const token = await getExternalApiToken();
    if (!token) throw new Error("Failed to retrieve external API token");

    const apiRes = await axios.get(
      "https://cis-dev.del.ac.id/api/library-api/alumni",
      { headers: { Authorization: `Bearer ${token}` }, params: { nim } }
    );

    const alumni = apiRes.data.data.alumni?.[0];
    if (
      !alumni ||
      alumni.nim !== nim ||
      alumni.nama.trim().toLowerCase() !== name.trim().toLowerCase() ||
      alumni.prodi_name !== prodi ||
      String(alumni.tahun_lulus) !== String(tahun_lulus) ||
      alumni.fakultas !== fakultas
    ) {
      return res
        .status(400)
        .json({ message: "Data mismatch with external API" });
    }

    const [fakultasRecord] = await Fakultas.findOrCreate({
      where: { name: fakultas },
    });
    const [prodiRecord] = await Prodi.findOrCreate({ where: { name: prodi } });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      nim,
      tahun_lulus,
      fakultas_id: fakultasRecord.id,
      prodi_id: prodiRecord.id,
      password: hashed,
    });

    const tokenPayload = { sub: user.id, role: "alumni" };
    const jwtToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { nim, password } = req.body;
    const user = await User.findOne({ where: { nim } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const tokenPayload = { sub: user.id, role: user.role };
    const jwtToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out" });
};
