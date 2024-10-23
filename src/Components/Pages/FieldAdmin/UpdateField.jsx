import { useCallback, useEffect, useState } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import { useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { getProductById, updateProduct } from "../../../service/product";
const UpdateField = () => {
  useLogin();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    image_url: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        if (res && !res.errors) {
          setFormData({
            name: res.data.product_name,
            price: res.data.price.toString(),
            description: res.data.description,
            image_url: `http://resource.futsal-am.my.id/images/${res.data.image_url}`,
          });
        } else {
          console.error("Error loading product:", res.errors);
          navigate(-1); // Navigate back if there's an error
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate(-1);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = useCallback((name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image_url: file ? URL.createObjectURL(file) : prevData.image_url,
      image: file,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.price.trim() || isNaN(Number(formData.price)))
      newErrors.price = "Harga wajib diisi dan harus berupa angka";
    if (!formData.description.trim())
      newErrors.description = "Deskripsi wajib diisi";
    return newErrors;
  }, [formData]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const finalFormData = new FormData();
        finalFormData.append("product_name", formData.name);
        finalFormData.append("price", formData.price);
        finalFormData.append("description", formData.description);
        if (formData.image) {
          finalFormData.append("image", formData.image);
        }
        finalFormData.append("product_id", id);

        const res = await updateProduct(finalFormData);

        if (res.success === true) {
          alert("Lapangan Berhasil Diubah");
          navigate("/management-field");
        } else {
          setErrorMessage(
            res.errors || "Terjadi kesalahan saat mengubah lapangan."
          );
        }
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat mengubah lapangan.");
        console.error("Error updating product:", error);
      }
    },
    [formData, validateForm, navigate, id]
  );
  return (
    <SecondaryLayouts title="Ubah Lapangan">
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="name" fontSize="text-lg">
              Nama Lapangan
            </Label>
          </div>
          <Input
            type="text"
            name="name"
            required
            textColor="text-dark"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="price" fontSize="text-lg">
              Harga Lapangan
            </Label>
          </div>
          <Input
            type="number"
            name="price"
            required
            textColor="text-dark"
            value={formData.price}
            onChange={(value) => handleChange("price", value)}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="description" fontSize="text-lg">
              Deskripsi
            </Label>
          </div>
          <div className="w-full">
            <textarea
              name="description"
              className="p-2 border border-gray-400 rounded-lg h-32"
              id="description"
              cols="30"
              onChange={(value) =>
                handleChange("description", value.target.value)
              }
              value={formData.description}></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="image" fontSize="text-lg">
              Gambar
            </Label>
          </div>
          <div className="w-full rounded-lg flex flex-col">
            <img
              src={formData.image_url}
              alt="Preview"
              className="w-2/4 my-2 max-h-40"
            />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              name="image"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <Button bgColor="bg-orange-500" buttonheight="h-10" type="submit">
            Ubah Lapangan
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default UpdateField;
