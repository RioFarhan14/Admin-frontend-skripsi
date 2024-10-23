const formatRupiah = (number) => {
  if (number == null) return "0";
  if (isNaN(number)) return "Invalid number";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export default formatRupiah;
