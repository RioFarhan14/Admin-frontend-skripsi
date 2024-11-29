import axios from "axios";

export const createMemberWithCash = async (data) => {
  const token = localStorage.getItem("token");

  const req = {
    user_id: data.user_id,
    product_id: parseInt(data.product_id),
    quantity: data.quantity,
  };
  try {
    const res = await axios.post(
      "http://resource.futsal-am.online:3000/api/users/transaction-cash",
      req,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const createMemberWithDigitalPayment = async (data) => {
  const token = localStorage.getItem("token");

  const req = {
    user_id: data.user_id,
    product_id: parseInt(data.product_id),
    quantity: data.quantity,
  };
  try {
    const res = await axios.post(
      "http://resource.futsal-am.online:3000/api/users/transaction",
      req,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const getMember = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "http://resource.futsal-am.online:3000/api/users/membership",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    if (Array.isArray(res.data.data)) {
      const result = res.data.data.map((member) => ({
        id: member.id,
        name: member.name,
        start_date: member.start_date,
        end_date: member.end_date,
        duration: member.duration,
      }));
      return result;
    } else {
      console.error("Data format is not as expected:", res.data);
      return [];
    }
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};
