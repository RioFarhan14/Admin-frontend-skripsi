import axios from "axios";

export const getAllNotification = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "http://resource.futsal-am.my.id/api/users/notifications",
      {
        headers: {
          Authorization: token, // Pastikan Authorization benar
          "Content-Type": "application/json",
        },
      }
    );

    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};

export const createNotification = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://resource.futsal-am.my.id/api/users/notification",
      data,
      {
        headers: {
          Authorization: token, // Pastikan Authorization benar
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};
