import axios from "axios";

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get("http://resource.futsal-am.online:3000/api/users/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Pastikan Authorization benar
      },
    });

    // Pastikan data adalah array sebelum memetakan
    if (Array.isArray(res.data.data)) {
      const result = res.data.data.map((user) => ({
        id: user.user_id,
        name: user.name,
        username: user.username,
        user_phone: user.user_phone,
        role: user.role,
      }));
      return result;
    } else {
      console.error("Data format is not as expected:", res.data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    return []; // Mengembalikan array kosong jika terjadi error
  }
};

export const getUserid = async (username) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/id?username=${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const getUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/data`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
        params: {
          user_id: id,
        },
      }
    );
    return { success: true, data: res.data.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const createUser = async (data) => {
  const token = localStorage.getItem("token");
  const request = {
    name: data.name,
    username: data.username,
    password: data.password,
    role: data.role,
    user_phone: data.user_phone,
  };
  try {
    const res = await axios.post(
      "http://resource.futsal-am.online:3000/api/users/create",
      request,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const updateUser = async (data) => {
  const token = localStorage.getItem("token");
  // Prepare request payload
  const request = {
    user_id: data.user_id,
    name: data.name,
    username: data.username,
    user_phone: data.user_phone,
    ...(data.role && { role: data.role }), // Conditionally add role
    ...(data.password && { password: data.password }), // Conditionally add password
  };
  try {
    const res = await axios.patch(
      `http://resource.futsal-am.online:3000/api/users/update`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `http://resource.futsal-am.online:3000/api/users/delete`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
        params: {
          user_id: id,
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const Logout = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/logout`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};
