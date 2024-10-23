import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/index.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, validateToken } from "../../service/auth.js";

const FormLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (value) => setUsername(value);
  const handlePasswordChange = (value) => setPassword(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lakukan validasi form atau aksi lainnya sebelum navigasi
    try {
        const res = await login(username, password);
        
        if (res.success) {
            console.log(res.data.data.token);
            const result = await validateToken(res.data.data.token);
            if (result.success) {
              localStorage.setItem("token", res.data.data.token);
              navigate("/dashboard"); 
            }
            setErrorMessage(result.error.errors);
        } else {
            // Menampilkan pesan error di dalam komponen React
            // Update state username dan password ke nilai awal
            setUsername("");
            setPassword("");
            // Menampilkan pesan error dengan menggunakan state atau props di komponen React
            setErrorMessage(res.error.errors);
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <InputForm
        name="username"
        label="Username"
        placeholder="Username"
        inputValue={username}
        required={true}
        handleInputChange={handleUsernameChange}
      />
      <InputForm
        name="password"
        type="password"
        inputValue={password}
        label="Password"
        required={true}
        placeholder="Password"
        handleInputChange={handlePasswordChange}
      />

      <div className="flex items-center">
        <Button
          bgColor="bg-orange-500"
          textColor="text-white"
          buttonwidth={"w-full"}
          buttonheight={"h-10"}
          type="submit">
          Masuk
        </Button>
      </div>
    </form>
  );
};

export default FormLogin;
