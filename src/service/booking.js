import axios from "axios";

export const getBookings = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "http://resource.futsal-am.my.id/api/users/booking",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );

    // Pastikan data adalah array sebelum memetakan
    if (Array.isArray(res.data.data)) {
      const result = res.data.data.map((booking) => ({
        id: booking.booking_id,
        name: booking.user_name,
        field_name: booking.product_name,
        start_time: booking.start_time,
        end_time: booking.end_time,
        booking_date: booking.booking_date,
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
export const createBookingWithCash = async (data) => {
  const token = localStorage.getItem("token");

  const req = {
    user_id: data.user_id,
    product_id: parseInt(data.product_id),
    booking_date: data.booking_date,
    start_time: data.start_time,
    duration: data.duration,
  };
  try {
    const res = await axios.post(
      "http://resource.futsal-am.my.id/api/users/transaction-cash",
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

export const createBookingWithDigitalPayment = async (data) => {
  const token = localStorage.getItem("token");

  const req = {
    user_id: data.user_id,
    product_id: parseInt(data.product_id),
    booking_date: data.booking_date,
    start_time: data.start_time,
    duration: data.duration,
  };
  try {
    const res = await axios.post(
      "http://resource.futsal-am.my.id/api/users/transaction",
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
