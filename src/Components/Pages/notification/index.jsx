import { useMemo, useCallback, useState, useEffect } from "react";
import TableAction from "../../Elements/CardTableAction/table";
import MainLayouts from "../../Layouts/MainLayouts";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { getAllNotification } from "../../../service/notification";

const NotificationPage = () => {
  const navigate = useNavigate();
  useLogin();
  const [notification, setNotification] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

  // Memoize table headers
  const headerTable = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Judul",
        accessor: "title",
      },
      {
        Header: "Deskripsi",
        accessor: "description",
      },
      {
        Header: "Kategori",
        accessor: "category",
      },
      {
        Header: "Tujuan",
        accessor: "user_id",
      },
    ],
    [] // Empty dependency array ensures columns are created only once
  );

  useEffect(() => {
    getAllNotification()
      .then((res) => {
        setNotification(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
        setLoading(false); // Ensure loading is stopped even on error
      });
  }, []);

  // Memoize onClick handlers
  const handleProductClick = useCallback(() => {
    navigate("/notification/create-notification");
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
                Notifikasi
              </h1>
            </div>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Table Notifikasi */}
            <div className="col-span-12">
              {loading ? (
                <div>Loading...</div> // Show a loading message or spinner
              ) : (
                <TableAction
                  columns={headerTable}
                  data={notification || []} // Ensure data is never null
                  pageSize={5}
                  title="Tambah Notifikasi"
                  ButtonActive
                  currency="price"
                  onClick={handleProductClick}
                  DisableDelete
                  DisableEdit>
                  List Notifikasi
                </TableAction>
              )}
            </div>
          </div>
        </div>
      </main>
    </MainLayouts>
  );
};

export default NotificationPage;
