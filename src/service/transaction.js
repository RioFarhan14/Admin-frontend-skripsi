import axios from "axios";

export const getCardInformation = async (type) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/information/card`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
        params: {
          type: type,
        },
      }
    );

    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};

export const getChardInformation = async (type) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/information/chard`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
        params: {
          type: type,
        },
      }
    );

    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};

export const getMostSpentCustomer = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/information/most-spent`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );

    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};

export const getAllTransaction = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/transaction`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );

    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};

export const getFieldMostSpentCustomer = async (type) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.online:3000/api/users/information/field`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
        params: {
          type: type,
        },
      }
    );

    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};
