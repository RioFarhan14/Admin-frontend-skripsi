import { useState, useCallback } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import { useLogin } from "../../../hooks/useLogin";
import { CreateProduct } from "../../../service/product";

// URL gambar default
const DEFAULT_IMAGE = "../assets/landscape-placeholder-svgrepo-com.png";

const CreateProductMembership = () => {
  useLogin();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState(null);
  // Handlers for input changes
  const handleNameChange = useCallback((value) => setName(value), []);
  const handlePriceChange = useCallback((value) => setPrice(value), []);

  // Handler for image file input
  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImage(DEFAULT_IMAGE); // Reset to default image if no file
    }
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Nama wajib diisi";
    if (!price) newErrors.price = "Harga wajib diisi";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = {
      name,
      price,
      image,
    };
    console.log("Form Data:", formData);
    const finalFormData = new FormData();
    finalFormData.append("product_name", formData.name);
    finalFormData.append("product_type", "membership");
    finalFormData.append("price", formData.price);
    finalFormData.append("image", formData.image);

    // Add functionality to handle form submission here
    const res = await CreateProduct(finalFormData);
    if (res.success === true) {
      window.location.href = "/membership";
      alert("Membership Berhasil ditambahkan");
    } else {
      setErrorResponse(res.errors);
    }
  };

  return (
    <SecondaryLayouts title="Tambah Produk Membership">
      {errorResponse && <p className="text-red-500 mb-4">{errorResponse}</p>}
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col space-y-4">
        <div className="flex mb-4">
          <div className="w-3/4 pr-2">
            <Label color="text-dark" name="name" fontSize="text-lg">
              Rentang Waktu (bulan)
            </Label>
          </div>
          <Input
            type="text"
            name="name"
            required
            textColor="text-dark"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="flex mb-4">
          <div className="w-3/4 pr-2">
            <Label color="text-dark" name="price" fontSize="text-lg">
              Harga
            </Label>
          </div>
          <Input
            type="number"
            name="price"
            required
            textColor="text-dark"
            value={price}
            onChange={handlePriceChange}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

        <div className="flex mb-4">
          <div className="w-3/4 pr-2">
            <Label color="text-dark" name="image" fontSize="text-lg">
              Gambar
            </Label>
          </div>
          <div className="w-full rounded-lg flex flex-col">
            <img src={imageUrl} alt="Preview" className="w-2/4 my-2 max-h-40" />
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

        <div>
          <Button bgColor="bg-orange-500" buttonheight="h-10" type="submit">
            Tambah Membership
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default CreateProductMembership;
