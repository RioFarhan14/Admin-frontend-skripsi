import { useEffect, useMemo, useState } from "react";
import TableAction from "../../Elements/CardTableAction/table";
import MainLayouts from "../../Layouts/MainLayouts";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../../service/user";
import { useLogin } from "../../../hooks/useLogin";

const AccountPage = () => {
  useLogin();
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/management-account/update-account/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (result.success === true) {
      window.location.reload();
    }else{
      alert("Akun Gagal Dihapus");
    }
  };
  const [data, setData] = useState([]);
  const headerTableProduct = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nama",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "No. Telepon",
        accessor: "user_phone",
      },
    ],
    [] // Dependency array kosong berarti columns hanya akan dibuat sekali
  );

  useEffect(() => {
    getUsers().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <MainLayouts>
      <main className="grow bg-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Management Akun
              </h1>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Table Field */}
            <div className="col-span-12">
              <TableAction
                columns={headerTableProduct}
                data={data}
                pageSize={5}
                title="Tambah Akun"
                ButtonActive
                onClick={() => {
                  navigate("/management-account/create-account");
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}>
                List Pengguna
              </TableAction>
            </div>
          </div>
        </div>
      </main>
    </MainLayouts>
  );
};
export default AccountPage;
