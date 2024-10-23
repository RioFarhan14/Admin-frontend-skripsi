import { useState, useCallback } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import Dropdown from "../../Elements/Dropdown";
import { useLogin } from "../../../hooks/useLogin";
import { createUser } from "../../../service/user";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  useLogin();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState("");

  // Handlers for input changes
  const handleNameChange = useCallback((value) => setName(value), []);
  const handleUsernameChange = useCallback((value) => setUsername(value), []);
  const handlePhoneNumberChange = useCallback(
    (value) => setPhoneNumber(value),
    []
  );
  const handlePasswordChange = useCallback((value) => setPassword(value), []);

  // Handler for dropdown changes
  const handleRoleChange = useCallback((value) => setRole(value), []);

  // Dropdown options
  const options = [
    { value: "", label: "Pilih Role" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Nama wajib diisi";
    if (!username) newErrors.username = "Username wajib diisi";
    if (!phoneNumber) newErrors.phoneNumber = "Nomor telepon wajib diisi";
    if (!password) newErrors.password = "Password wajib diisi";
    if (!role) newErrors.role = "Role wajib dipilih"; // Validasi role
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
      name,
      username,
      user_phone: phoneNumber,
      password,
      role,
    };
    console.log("Form Data:", formData);
    const result = await createUser(formData);
    if (result.success === true) {
      navigate("/management-account");
      alert("Akun Berhasil ditambahkan");
    } else {
      setErrorResponse(result.errors);
    }
  };

  return (
    <SecondaryLayouts title="Tambah Akun">
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col">
        {errorResponse && <p className="text-red-500 mb-4">{errorResponse}</p>}
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="name" fontSize="text-lg">
              Nama
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

        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="username" fontSize="text-lg">
              Username
            </Label>
          </div>
          <Input
            type="text"
            name="username"
            required
            textColor="text-dark"
            value={username}
            onChange={handleUsernameChange}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="phone_number" fontSize="text-lg">
              Nomor Telepon
            </Label>
          </div>
          <Input
            type="text"
            name="phone_number"
            required
            textColor="text-dark"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="password" fontSize="text-lg">
              Password
            </Label>
          </div>
          <Input
            type="password"
            name="password"
            required
            textColor="text-dark"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="role" fontSize="text-lg">
              Role
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={options}
              name="role"
              disabledValue=""
              value={role}
              handleChange={handleRoleChange}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Button bgColor="bg-orange-500" buttonheight="h-10" type="submit">
            Tambah Akun
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default CreateAccount;
