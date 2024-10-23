import { useMemo, useCallback, useState, useEffect } from "react";
import TableAction from "../../Elements/CardTableAction/table";
import MainLayouts from "../../Layouts/MainLayouts";
import { useNavigate } from "react-router-dom";
import { getProductsMembership } from "../../../service/product";
import { useLogin } from "../../../hooks/useLogin";
import { getMember } from "../../../service/membership";

const MembershipPage = () => {
  const navigate = useNavigate();
  useLogin();
  const [products, setProducts] = useState([]);
  const [member, setMember] = useState([]);
  // Memoize table headers
  const headerTableProduct = useMemo(
    () => [
      {
        Header: "Durasi",
        accessor: "name",
      },
      {
        Header: "Harga",
        accessor: "price",
      },
    ],
    [] // Dependency array kosong berarti columns hanya akan dibuat sekali
  );

  const headerTableMember = useMemo(
    () => [
      {
        Header: "Nama",
        accessor: "name",
      },
      {
        Header: "Masa Berlaku",
        accessor: "duration",
      },
      {
        Header: "Tanggal Dimulai",
        accessor: "start_date",
      },
      {
        Header: "Tanggal Selesai",
        accessor: "end_date",
      },
    ],
    [] // Dependency array kosong berarti columns hanya akan dibuat sekali
  );

  useEffect(() => {
    getProductsMembership().then((res) => {
      setProducts(res);
    });
  }, []);
  useEffect(() => {
    getMember().then((res) => {
      setMember(res);
    });
  }, []);
  // Memoize onClick handlers
  const handleProductClick = useCallback(() => {
    navigate("/membership/create-product");
  }, [navigate]);

  const handleMembershipClick = useCallback(() => {
    navigate("/membership/create-membership");
  }, [navigate]);

  return (
    <MainLayouts>
      <main className="grow bg-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Membership
              </h1>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Table Field */}
            <div className="col-span-12 xl:col-span-4">
              <TableAction
                columns={headerTableProduct}
                data={products}
                pageSize={5}
                title="Tambah Membership"
                ButtonActive
                currency="price"
                onClick={handleProductClick}
                DisableDelete
                DisableEdit>
                List Produk Membership
              </TableAction>
            </div>
            {/* Table Booking */}
            <div className="col-span-12 xl:col-span-8">
              <TableAction
                columns={headerTableMember}
                data={member}
                pageSize={5}
                title="Tambah Pengguna"
                ButtonActive
                FilterActive
                onClick={handleMembershipClick}
                DisableEdit
                DisableDelete>
                List Membership
              </TableAction>
            </div>
          </div>
        </div>
      </main>
    </MainLayouts>
  );
};

export default MembershipPage;
