import { useEffect, useState } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import Dropdown from "../../Elements/Dropdown";
import { useParams } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { getUser, updateUser } from "../../../service/user";

const UpdateAccount = () => {
  useLogin();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState(null);
  const [originalData, setOriginalData] = useState(null); // To store the fetched user data

  useEffect(() => {
    // Fetch the user data and set it in state
    getUser(id).then((res) => {
      const { name, username, user_phone, role } = res.data;
      setName(name);
      setUsername(username);
      setPhoneNumber(user_phone);
      setRole(role);
      setOriginalData({ name, username, user_phone, role }); // Store original data
    }).catch((err) => {
      setErrorResponse(err.errors);
    });
  }, [id]);

  const handleNameChange = (value) => setName(value);
  const handleUsernameChange = (value) => setUsername(value);
  const handlePhoneNumberChange = (value) => setPhoneNumber(value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleRoleChange = (value) => setRole(value);

  const options = [
    { value: "", label: "Pilih Role" },
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Nama wajib diisi";
    if (!username) newErrors.username = "Username wajib diisi";
    if (!phoneNumber) newErrors.phoneNumber = "Nomor telepon wajib diisi";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Compare with original data and build the form data
    const formData = {
      user_id: id,
      name,
      username,
      user_phone: phoneNumber,
      password,
      role,
    };

    // Only send fields that have changed
    const updateData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== originalData[key])
    );

    if (Object.keys(updateData).length > 0) {
      // Send the update request only if there are changes
      const result = await updateUser(updateData);
      if (result.success) {
        window.location.href = "/management-account";
        alert("Data Berhasil diubah");
      } else {
        setErrorResponse(result.errors);
      }
    } else {
      alert("Tidak ada perubahan data untuk diperbarui.");
    }
  };

  return (
    <SecondaryLayouts title="Ubah Akun">
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
            textColor="text-dark"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="product" fontSize="text-lg">
              Membership
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={options}
              name="Role"
              disabledValue=""
              value={role}
              handleChange={handleRoleChange}
            />
            {errors.product && (
              <p className="text-red-500 text-sm">{errors.product}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <Button bgColor="bg-orange-500" buttonheight="h-10" type="submit">
            Ubah Akun
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default UpdateAccount;
