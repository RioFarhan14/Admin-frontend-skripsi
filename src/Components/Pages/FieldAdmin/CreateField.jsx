import { useState, useCallback } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import { useLogin } from "../../../hooks/useLogin";
import { CreateProduct } from "../../../service/product";
import { useNavigate } from "react-router-dom";

// URL gambar default
const DEFAULT_IMAGE_URL = "../assets/landscape-placeholder-svgrepo-com.png";

const CreateField = () => {
  useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    image_url: DEFAULT_IMAGE_URL,
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Fungsi untuk mengupdate state formData
  const handleChange = useCallback((name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Fungsi untuk menangani perubahan pada input file gambar
  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image_url: file ? URL.createObjectURL(file) : DEFAULT_IMAGE_URL,
      image: file,
    }));
  }, []);

  // Fungsi untuk validasi form
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.price.trim() || isNaN(Number(formData.price)))
      newErrors.price = "Harga wajib diisi dan harus berupa angka";
    if (!formData.description.trim())
      newErrors.description = "Deskripsi wajib diisi";
    return newErrors;
  }, [formData]);

  // Fungsi untuk menangani submit form
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Mengirim data ke server
      try {
        const finalFormData = new FormData();
        finalFormData.append("product_name", formData.name);
        finalFormData.append("product_type", "field");
        finalFormData.append("price", formData.price);
        finalFormData.append("description", formData.description);
        finalFormData.append("image", formData.image);
        const res = await CreateProduct(finalFormData);

        if (res.success === true) {
          navigate("/management-field");
          alert("Lapangan berhasil dibuat.");
        } else {
          setErrorMessage(res.errors);
        }
      } catch (error) {
        setErrorMessage("Terjadi kesalahan saat membuat lapangan.");
        console.error("Error creating product:", error);
      }
    },
    [formData, validateForm, navigate]
  );

  return (
    <SecondaryLayouts title="Tambah Lapangan">
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col space-y-4">
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
              onChange={(e) => handleChange("description", e.target.value)}
              value={formData.description}
            />
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
            Tambah Lapangan
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default CreateField;
