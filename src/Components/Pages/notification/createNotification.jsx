import { useState, useCallback } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import Dropdown from "../../Elements/Dropdown";
import { useLogin } from "../../../hooks/useLogin";
import { createNotification } from "../../../service/notification";

const CreateNotification = () => {
  useLogin();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState("");

  // Handlers for input changes
  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handleMessageChange = useCallback((value) => setMessage(value), []);
  // Handler for dropdown changes
  const handleCategoryChange = useCallback((value) => setCategory(value), []);

  // Dropdown options
  const options = [
    { value: "", label: "Pilih Kategori" },
    { value: "1", label: "info" },
    { value: "2", label: "promo" },
  ];

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title wajib diisi";
    if (!message) newErrors.message = "Deskripsi wajib diisi";
    if (!category) newErrors.category = "Kategori wajib dipilih"; // Validasi Kategori
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = {
      title,
      message,
      category_id: parseInt(category),
    };
    console.log("Form Data:", formData);
    const result = await createNotification(formData);
    if (result.success === true) {
      window.location.href = "/notification";
      alert("Notifikasi Berhasil ditambahkan");
    } else {
      setErrorResponse(result.errors);
    }
  };

  return (
    <SecondaryLayouts title="Tambah Notifikasi">
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col">
        {errorResponse && <p className="text-red-500 mb-4">{errorResponse}</p>}
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="title" fontSize="text-lg">
              Title
            </Label>
          </div>
          <Input
            type="text"
            name="title"
            required
            textColor="text-dark"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="messsage" fontSize="text-lg">
              Deskripsi
            </Label>
          </div>
          <div className="w-full">
            <textarea
              name="description"
              className="p-2 border border-gray-400 rounded-lg h-32 w-full"
              id="description"
              cols="30"
              onChange={(e) => handleMessageChange(e.target.value)}
              value={message}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="category" fontSize="text-lg">
              Kategori
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={options}
              name="category"
              disabledValue=""
              value={category}
              handleChange={handleCategoryChange}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Button bgColor="bg-orange-500" buttonheight="h-10" type="submit">
            Tambah Notifikasi
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default CreateNotification;
