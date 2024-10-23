import MainLayouts from "../../Layouts/MainLayouts";
import TableAction from "../../Elements/CardTableAction/table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProductsField } from "../../../service/product";
import { getBookings } from "../../../service/booking";
import { useLogin } from "../../../hooks/useLogin";

const FieldPage = () => {
  useLogin();
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Inisialisasi state dengan useState
  const [booking, setBooking] = useState([]);
  const headerTableField = useMemo(() => [
    { Header: "Nama Lapangan", accessor: "name" },
    { Header: "Harga Sewa", accessor: "price" },
    { Header: "Deskripsi", accessor: "description" },
  ], []);

  const headerTableBooking = useMemo(() => [
    { Header: "Nama", accessor: "name" },
    { Header: "Nama Lapangan", accessor: "field_name" },
    { Header: "Tanggal", accessor: "booking_date" },
    { Header: "Waktu Mulai", accessor: "start_time" },
    { Header: "Waktu Selesai", accessor: "end_time" },
  ], []);

  useEffect(() => {
    getBookings().then((res) => {
      setBooking(res);
    });
  }, []);

  useEffect(() => {
    getProductsField().then((res) => {
      setData(res);
    });
   
  }, []); // Kosong array dependency memastikan hanya dipanggil sekali saat komponen di-mount

  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    if (res.success === true) {
      window.location.reload();
    }else{
      alert("Lapangan Gagal Dihapus");
    }
  };

  const handleEdit = (id) => {
    navigate(`/management-field/update-field/${id}`);
  };

  return (
    <MainLayouts>
      <main className="grow bg-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Manajemen Lapangan
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 mb-5">
              <TableAction
                columns={headerTableField}
                data={data}
                pageSize={5}
                title="Tambah Lapangan"
                ButtonActive
                currency="price"
                FilterActive
                onClick={() => navigate("/management-field/create-field")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              >
                List Lapangan
              </TableAction>
            </div>
            <div className="col-span-12">
              <TableAction
                columns={headerTableBooking}
                data={booking}
                pageSize={5}
                title="Tambah Reservasi"
                ButtonActive
                FilterActive
                onClick={() => navigate("/management-field/create-booking")}
                onEdit={handleEdit}
                DisableDelete
              >
                List Reservasi
              </TableAction>
            </div>
          </div>
        </div>
      </main>
    </MainLayouts>
  );
};

export default FieldPage;
