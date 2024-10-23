import { useState, useCallback, useEffect, useMemo } from "react";
import Label from "../../Elements/Input/Label";
import Input from "../../Elements/Input/input";
import Button from "../../Elements/Button";
import SecondaryLayouts from "../../Layouts/SecondaryLayouts";
import Dropdown from "../../Elements/Dropdown";
import { useLogin } from "../../../hooks/useLogin";
import { getUserid } from "../../../service/user";
import { useNavigate } from "react-router-dom";
import { getProductsMembership } from "../../../service/product";
import { createMemberWithCash, createMemberWithDigitalPayment } from "../../../service/membership";
import { PUBLIC_CLIENT_KEY } from "../../../utils/constant";

const CreateMember = () => {
  useLogin();
  const [username, setUsername] = useState("");
  const [productId, setProductId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState(null);
  const [productPrices, setProductPrices] = useState({});
  const [optionsProducts, setOptionsProducts] = useState([]); // State for product options
  const navigate = useNavigate();

  // Fetch product options and prices
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsMembership();
        const options = [{ value: "", label: "Pilih Membership" }];
        const newProductPrices = {};

        res.forEach((product) => {
          options.push({
            value: product.id.toString(),
            label: product.name,
          });
          newProductPrices[product.id] = product.price;
        });

        setOptionsProducts(options);
        setProductPrices(newProductPrices);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorResponse("Gagal memuat data produk.");
      }
    };

    fetchProducts();
  }, []);

  // Update price when productId changes
  useEffect(() => {
    setPrice(productPrices[productId] || 0);
  }, [productId, productPrices]);

  const handleProductChange = (value) => {
    setProductId(value);
  };

  const handlePaymentMethodChange = useCallback(
    (value) => setPaymentMethod(value),
    []
  );

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username wajib diisi";
    if (!productId) newErrors.productId = "Durasi membership wajib dipilih";
    if (!paymentMethod)
      newErrors.paymentMethod = "Metode pembayaran wajib dipilih";
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

    try {
      const user_id = await getUserid(username);
      if (!user_id.success) {
        setErrorResponse(user_id.errors || "Gagal mendapatkan ID pengguna.");
        return;
      }

      const formData = {
        username,
        product_id: productId,
        quantity: 1,
        paymentMethod,
        user_id: user_id.data.data.user_id,
      };

      let result;
      if (paymentMethod === "cash") {
        result = await createMemberWithCash(formData);
      } else {
        const res = await createMemberWithDigitalPayment(formData);
        window.snap.pay(res.data.data.snap_token);
        navigate("/membership");
        return;
      }

      if (result.success) {
        navigate("/membership");
        alert("Transaksi Berhasil");
      } else {
        setErrorResponse(result.errors || "Gagal melakukan transaksi.");
      }
    } catch (error) {
      console.error("Error during transaction:", error);
      setErrorResponse("Terjadi kesalahan saat memproses transaksi.");
    }
  };

  const optionsPayment = useMemo(() => [
    { value: "", label: "Pilih Metode Pembayaran" },
    { value: "cash", label: "Tunai" },
    { value: "digital_payment", label: "Online Payment" },
  ], []);

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
    <SecondaryLayouts title="Tambah Member">
      {errorResponse && <p className="text-red-500 text-sm mb-4">{errorResponse}</p>}
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col space-y-4">
        <div className="flex mb-4">
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
            onChange={setUsername}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="product_id" fontSize="text-lg">
              Membership
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={optionsProducts}
              name="product_id"
              disabledValue=""
              value={productId}
              handleChange={handleProductChange}
            />
            {errors.productId && (
              <p className="text-red-500 text-sm">{errors.productId}</p>
            )}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="price" fontSize="text-lg">
              Harga
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
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <Label color="text-dark" name="payment_method" fontSize="text-lg">
              Metode Pembayaran
            </Label>
          </div>
          <div className="w-full">
            <Dropdown
              options={optionsPayment}
              name="payment_method"
              value={paymentMethod}
              disabledValue=""
              handleChange={handlePaymentMethodChange}
            />
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </div>
        </div>

        <div>
          <Button bgColor="bg-orange-500" buttonheight="h-10" type="submit">
            Tambah Member
          </Button>
        </div>
      </form>
    </SecondaryLayouts>
  );
};

export default CreateMember;
