import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const TableData = ({ columns, data, pageSize }) => {
  const [pageIndex, setPageIndex] = useState(0);

  // Membatasi data yang ditampilkan ke halaman saat ini
  const pagedData = data.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  // Fungsi untuk pindah ke halaman berikutnya
  const nextPage = () => {
    if ((pageIndex + 1) * pageSize < data.length) {
      setPageIndex(pageIndex + 1);
    }
  };

  // Fungsi untuk pindah ke halaman sebelumnya
  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
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
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.accessor} className="py-3 px-4 text-gray-700">
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > pageSize && (
        <div className="mt-4 flex justify-between">
          {pageIndex !== 0 && (
            <Button
              bgColor="bg-primary"
              textColor="text-white"
              onClick={prevPage}
              disabled={pageIndex === 0}
              buttonheight={"h-8"}
              type="button">
              Previous
            </Button>
          )}
          {pageIndex !== Math.ceil(data.length / pageSize) - 1 && (
            <Button
              bgColor="bg-primary"
              textColor="text-white"
              buttonheight={"h-8"}
              onClick={nextPage}
              disabled={(pageIndex + 1) * pageSize >= data.length}
              type="button">
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

TableData.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default TableData;
