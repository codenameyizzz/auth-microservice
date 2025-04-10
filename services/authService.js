const axios = require('axios');
const qs = require('qs');

const getExternalApiToken = async () => {
  try {
    const data = qs.stringify({
      username: 'johannes',
      password: 'Del@2022'
    });

    const response = await axios.post(
      'https://cis-dev.del.ac.id/api/jwt-api/do-auth',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log("🔑 Token response:", response.data);

    if (response.data.result && response.data.token) {
      return response.data.token;
    }

    return null;
  } catch (error) {
    console.error('❌ Gagal ambil token:', error.message);
    return null;
  }
};

module.exports = {
  getExternalApiToken 
};
