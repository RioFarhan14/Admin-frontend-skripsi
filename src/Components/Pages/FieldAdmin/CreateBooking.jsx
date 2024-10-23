import Label from "../../Elements/Input/Label";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import Dropdown from "../../Elements/Dropdown";
import DatePickerComponent from "../../Elements/DatePicker";
import Input from "../../Elements/Input/input";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { getProductsField } from "../../../service/product";
import { createBookingWithCash, createBookingWithDigitalPayment } from "../../../service/booking";
import { getUserid } from "../../../service/user";
import { useNavigate } from "react-router-dom";
import { PUBLIC_CLIENT_KEY } from "../../../utils/constant";
const CreateBooking = () => {
  useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    product_id: "",
    booking_date: null,
    start_time: "",
    duration: "",
    payment_method: "",
  });

  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [productPrices, setProductPrices] = useState({});
  const [optionsProducts, setOptionsProducts] = useState([]); // State for product options
  const [errorResponse, setErrorResponse] = useState(null);
  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username harus diisi";
    if (!formData.product_id) newErrors.product_id = "Lapangan harus dipilih";
    if (!formData.booking_date) newErrors.booking_date = "Tanggal harus diisi";
    if (!formData.start_time) newErrors.start_time = "Jam harus diisi";
    if (!formData.duration) newErrors.duration = "Durasi harus diisi";
    if (!formData.payment_method) newErrors.payment_method = "Metode pembayaran harus dipilih";
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
      const res = await getUserid(formData.username);
      if (res.success === true) {
        console.log(res.data.data.user_id);
        formData.user_id = res.data.data.user_id;
      }
      else{
        setErrorResponse(res.errors);
        return;
      }
      console.log(formData);
      if(formData.payment_method === "cash") {
        const result = await createBookingWithCash(formData);
        if(result.success === true) {
          alert("Booking Berhasil");
          navigate("/management-field");
        } else {
          setErrorResponse(result.errors);
          return;
        }
      } else {
        const res = await createBookingWithDigitalPayment(formData);
        if (res.data && res.data.data && res.data.data.snap_token) {
          window.snap.pay(res.data.data.snap_token, {
            onSuccess: () => {
              alert("Booking Berhasil");
              navigate("/management-field");
            },
            onPending: () => {
              navigate("/management-field");
            },
            onError: () => {
              alert("Booking Gagal");
              navigate("/management-field");
            },
            onClose: () => {
              navigate("/management-field");
            }
          });
        } else {
          alert("Terjadi kesalahan saat memproses pembayaran");
          setErrorResponse("Snap token tidak valid");
        }
      }
      

    },
    [formData, validateForm, navigate]
  );

  useEffect(() => {
    getProductsField().then((res) => {
      const options = [
        { value: "", label: "Pilih Lapangan" }
      ];

      const newProductPrices = {};
      res.forEach((product) => {
        options.push({
          value: product.id.toString(),
          label: product.name,
        });
        newProductPrices[product.id] = product.price; // Assuming 'price' field exists
      });

      setOptionsProducts(options); // Set the options state
      setProductPrices(newProductPrices); // Set the product prices state
    });
  }, []);

  const handleProductChange = useCallback(
    (value) => {
      handleInputChange("product_id", value);
      setPrice(productPrices[value] || 0); // Get price from productPrices state
    },
    [handleInputChange, productPrices]
  );


  const optionsPayment = useMemo(
    () => [
      { value: "", label: "Pilih Metode Pembayaran" },
      { value: "cash", label: "Tunai" },
      { value: "digital_payment", label: "Online Payment" },
    ],
    []
  );

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", PUBLIC_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);
  return (
    <SecondaryLayouts title="Tambah Reservasi">
      {errorResponse && (
        <p className="text-red-500 text-sm mb-4">{errorResponse}</p>
      )}
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col">
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="username" fontSize="text-lg">
              Username Pengguna
            </Label>
          </div>
          <div className="w-full">
            <Input
              name="username"
              type="text"
              placeholder="Username"
              onChange={(value) => handleInputChange("username", value)}
              value={formData.username}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="product_id" fontSize="text-lg">
              Nama Lapangan
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={optionsProducts}
              name="product_id"
              disabledValue=""
              handleChange={handleProductChange}
            />
            {errors.product_id && (
              <p className="text-red-500 text-sm">{errors.product_id}</p>
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="price" fontSize="text-lg">
              Harga Lapangan
            </Label>
          </div>
          <input
            type="text"
            value={`Rp. ${price}`}
            readOnly
            name="price"
            id="price"
            className="w-full text-sm p-4 text-gray-900 h-10 rounded-lg bg-gray-50"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="booking_date" fontSize="text-lg">
              Tanggal
            </Label>
          </div>
          <div className="w-full">
            <DatePickerComponent
              name="booking_date"
              onChange={(value) => handleInputChange("booking_date", value)} // Updated to booking_date
            />
            {errors.booking_date && (
              <p className="text-red-500 text-sm">{errors.booking_date}</p> // Updated to booking_date
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="start_time" fontSize="text-lg">
              Jam
            </Label>
          </div>
          <div className="w-full">
            <input
              type="time"
              name="start_time" // Updated to start_time
              id="start_time" // Updated to start_time
              value={formData.start_time} // Updated to start_time
              onChange={(e) => handleInputChange("start_time", e.target.value)} // Updated to start_time
              className="w-full text-sm p-4 text-gray-900 h-10 rounded-lg bg-gray-50"
            />
            {errors.start_time && (
              <p className="text-red-500 text-sm">{errors.start_time}</p> // Updated to start_time
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="duration" fontSize="text-lg">
              Waktu Bermain
            </Label>
          </div>
          <div className="w-full">
            <input
              type="number"
              name="duration"
              id="duration"
              placeholder="Masukan durasi dalam jam"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="w-full text-sm p-4 text-gray-900 h-10 rounded-lg bg-gray-50"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration}</p>
            )}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="payment_method" fontSize="text-lg">
              Metode Pembayaran
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={optionsPayment}
              name="payment_method"
              disabledValue=""
              handleChange={(value) =>
                handleInputChange("payment_method", value)
              }
            />
            {errors.payment_method && (
              <p className="text-red-500 text-sm">{errors.payment_method}</p>
            )}
          </div>
        </div>
        <div className="flex justify-start mt-4">
          <Button type="submit" bgColor="bg-orange-500" buttonheight="h-10">
            Tambah Reservasi
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default CreateBooking;
