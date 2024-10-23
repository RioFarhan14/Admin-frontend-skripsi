import axios from "axios";

export const getProductsField = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "http://resource.futsal-am.my.id/api/users/products/field",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );

    // Pastikan data adalah array sebelum memetakan
    if (Array.isArray(res.data.data)) {
      const result = res.data.data.map((product) => ({
        id: product.product_id,
        name: product.product_name,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
      }));
      return result;
    } else {
      console.error("Data format is not as expected:", res.data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching products field:", err);
    return []; // Mengembalikan array kosong jika terjadi error
  }
};

export const getProductsMembership = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "http://resource.futsal-am.my.id/api/users/products/membership",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pastikan Authorization benar
        },
      }
    );

    // Pastikan data adalah array sebelum memetakan
    if (Array.isArray(res.data.data)) {
      const result = res.data.data.map((product) => ({
        id: product.product_id,
        name: `${product.product_name} Bulan`,
        price: product.price,
        image_url: product.image_url,
        description: product.description,
      }));
      return result;
    } else {
      console.error("Data format is not as expected:", res.data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching products field:", err);
    return []; // Mengembalikan array kosong jika terjadi error
  }
};

export const getProductById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      `http://resource.futsal-am.my.id/api/users/products`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        params: {
          product_id: id,
        },
      }
    );
    return res.data; // Assuming the data you want is in `res.data`
  } catch (err) {
    console.error("Error fetching product:", err);
    return { errors: err.response?.data?.errors || "Unknown error occurred" };
  }
};

export const CreateProduct = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `http://resource.futsal-am.my.id/api/users/products`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `http://resource.futsal-am.my.id/api/users/products`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        params: {
          product_id: id,
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};

export const updateProduct = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.patch(
      `http://resource.futsal-am.my.id/api/users/products`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { errors: err.response.data.errors || "Unknown error occurred" };
  }
};
