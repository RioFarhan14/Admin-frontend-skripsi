import axios from "axios";

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      "http://resource.futsal-am.online:3000/api/users/login",
      {
        username: username,
        password: password,
      }
    );

    return { success: true, data: res.data }; // Mengembalikan objek dengan informasi login berhasil
  } catch (err) {
    return { success: false, error: err.response.data }; // Mengembalikan objek dengan informasi login gagal dan error
  }
};

export const validateToken = async (token) => {
  try {
    const res = await axios.get(
      "http://resource.futsal-am.online:3000/api/users/admin",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return { success: true, data: res.data }; // Mengembalikan objek dengan informasi login berhasil
  } catch (err) {
    return { success: false, error: err.response.data }; // Mengembalikan objek dengan informasi login gagal dan error
  }
};

export const getDataUser = async (token) => {
  try {
    const res = await axios.get("http://resource.futsal-am.online:3000/api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return { success: true, data: res.data }; // Mengembalikan objek dengan informasi login berhasil
  } catch (err) {
    return { success: false, error: err.response.data }; // Mengembalikan objek dengan informasi login gagal dan error
  }
};
