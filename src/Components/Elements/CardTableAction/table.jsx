import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Input from "../Input/input";
import Button from "../Button";
import DialogCustomAnimation from "../Popup";
import formatRupiah from "../../../utils/format";
// Fungsi untuk memformat angka menjadi format mata uang (Rupiah)

const TableAction = ({
  columns,
  data,
  children,
  pageSize,
  ButtonActive = false,
  FilterActive = false,
  onClick,
  title,
  DisableDelete = false,
  DisableEdit = false,
  onEdit, // Fungsi untuk kustomisasi edit
  onDelete, // Fungsi untuk kustomisasi hapus
  currency = null, // Props untuk menentukan apakah format mata uang diperlukan
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [filterText, setFilterText] = useState("");

  // Filter data berdasarkan filterText
  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      ),
    [data, filterText]
  );

  // Membatasi data yang ditampilkan ke halaman saat ini
  const pagedData = useMemo(
    () => filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    [filteredData, pageIndex, pageSize]
  );

  // Fungsi untuk pindah ke halaman berikutnya
  const nextPage = () => {
    if ((pageIndex + 1) * pageSize < filteredData.length) {
      setPageIndex(pageIndex + 1);
    }
  };

  // Fungsi untuk pindah ke halaman sebelumnya
  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  // Fungsi untuk menangani perubahan input filter
  const handleFilterChange = (value) => {
    setFilterText(value);
  };

  // Fungsi untuk menangani klik edit
  const handleEdit = (id) => {
    if (onEdit) {
      onEdit(id); // Memanggil fungsi edit yang diberikan melalui props
    } else {
      console.log("Edit id:", id);
      // Lakukan tindakan edit default jika onEdit tidak diberikan
    }
  };

  // Fungsi untuk menangani klik hapus
  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id); // Memanggil fungsi hapus yang diberikan melalui props
    } else {
      console.log("Delete id:", id);
      // Lakukan tindakan hapus default jika onDelete tidak diberikan
    }
  };

  return (
    <div className="outline outline-offset-2 outline-2 rounded-lg outline-orange-500 bg-white p-4 flex flex-col h-full">
      <div className="overflow-x-auto h-full">
        {/* Tambah data */}
        <span className="text-2xl xl:text-md font-semibold text-gray-800">
          {children}
        </span>
        <div className="flex justify-between w-full mt-5">
          {ButtonActive && (
            <div className="mb-6">
              <Button
                bgColor="bg-orange-500"
                textColor="text-white"
                buttonheight={"h-10"}
                onClick={onClick}>
                {title}
              </Button>
            </div>
          )}
          {/* Filter data */}
          {FilterActive && (
            <div className="flex items-center w-48 gap-2 mb-4">
              <Input
                name="filter"
                type="text"
                value={filterText}
                onChange={(e) => handleFilterChange(e)}
                placeholder="Filter..."
              />
            </div>
          )}
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="py-3 px-4 text-left text-gray-600 font-semibold">
                  {column.Header}
                </th>
              ))}
              {!DisableEdit && !DisableDelete && (
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Aksi
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {pagedData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.accessor} // Unique key for each cell
                    className="py-3 px-4 text-gray-700">
                    {currency && column.accessor === currency
                      ? formatRupiah(row[column.accessor])
                      : row[column.accessor]}
                  </td>
                ))}
                {!DisableEdit && !DisableDelete && (
                  <td className="flex flex-row gap-2 py-3 px-4">
                    {!DisableEdit && (
                      <Button
                        bgColor="bg-blue-500"
                        textColor="text-white"
                        onClick={() => handleEdit(row.id)}
                        buttonheight={"h-8"}
                        type="button">
                        Edit
                      </Button>
                    )}
                    {!DisableDelete && (
                      // Tombol hapus
                      <DialogCustomAnimation
                        title="Hapus Data"
                        desc="Apakah Anda yakin ingin menghapus data ini?"
                        handlePopup={() => handleDelete(row.id)}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length > pageSize && (
          <div className="mt-4 flex justify-between">
            {/* Tombol Previous */}
            {pageIndex > 0 && (
              <Button
                bgColor="bg-primary"
                textColor="text-white"
                onClick={prevPage}
                buttonheight="h-8"
                type="button">
                Previous
              </Button>
            )}

            {/* Tombol Next */}
            {pageSize * (pageIndex + 1) < filteredData.length && (
              <Button
                bgColor="bg-primary"
                textColor="text-white"
                onClick={nextPage}
                buttonheight="h-8"
                type="button">
                Next
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

TableAction.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired, // Pastikan id ada di data
    })
  ).isRequired,
  pageSize: PropTypes.number.isRequired,
  ButtonActive: PropTypes.bool,
  FilterActive: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  DisableEdit: PropTypes.bool,
  DisableDelete: PropTypes.bool,
  onEdit: PropTypes.func, // PropTypes untuk onEdit
  onDelete: PropTypes.func, // PropTypes untuk onDelete
  currency: PropTypes.string, // PropTypes untuk currency
  children: PropTypes.node.isRequired,
};

export default TableAction;
