import MainLayouts from "../../Layouts/MainLayouts";
import { useMemo, useCallback, useState, useEffect } from "react";
import CardChart from "../../Elements/CardChart";
import CardChart2 from "../../Elements/CardChart/index2.jsx";
import TableAction from "../../Elements/CardTableAction/table";
import { useLogin } from "../../../hooks/useLogin.jsx";
import { getAllTransaction, getChardInformation, getFieldMostSpentCustomer, getMostSpentCustomer } from "../../../service/transaction.js";
const ReportPage = () => {
  useLogin();
  const [dataIncome, setDataIncome] = useState([]);
  const [chartOption, setChartOption] = useState('month'); // Track the selected option
  const [chartOption2, setChartOption2] = useState('month');
  const [dataFields, setDataFields] = useState([]);
  const [dataCustomer, setDataCustomer] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([]);
  // Fetch data when the component mounts or when chartOption changes
  useEffect(() => {
    getChardInformation(chartOption).then((res) => {
      setDataIncome(res.data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [chartOption]);

  useEffect(() => {
    getFieldMostSpentCustomer(chartOption2).then((res) => {
      setDataFields(res.data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [chartOption2]);

  // Define options for chart type selection
  const options = useMemo(() => [
    { value: "month", label: "Bulan" },
    { value: "day", label: "Hari" },
    { value: "year", label: "Tahun" },
  ], []);

  // Handle chart option change
  const handleChartOptionChange = useCallback((event) => {
    const selectedValue = event;
    setChartOption(selectedValue); // Update the selected option
  }, []);

  const handleChartOptionChange2 = useCallback((event) => {
    const selectedValue = event;
    setChartOption2(selectedValue); // Update the selected option
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Pelanggan",
        accessor: "name",
      },
      {
        Header: "Total Transaksi",
        accessor: "transaction_count",
      },
      {
        Header: "Total Pengeluaran",
        accessor: "total_amount",
      },
    ],
    []
  );

  useEffect(() => {
    getMostSpentCustomer().then((res) => {
      setDataCustomer(res.data);
    })
},[]);

  const columnsTransaction = useMemo(
    () => [
      {
        Header: "No Invoice",
        accessor: "id",
      },
      {
        Header: "Nama Pelanggan",
        accessor: "name",
      },
      {
        Header: "Tanggal",
        accessor: "transaction_date",
      },
      {
        Header: "Metode Pembayaran",
        accessor: "payment",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Total Pembayaran",
        accessor: "total_amount",
      },
    ],
    []
  );

  useEffect(() => {
    getAllTransaction().then((res) => {
      setDataTransaction(res.data);
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
                Laporan
              </h1>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Income */}
            <div className="col-span-12 2xl:col-span-7 h-100">
              <CardChart
                name="Pendapatan"
                dataValues={dataIncome}
                Currency = {true}
                dataOptions={options}
                handleOptionChange={handleChartOptionChange}>
                Pendapatan
              </CardChart>
            </div>

            {/* Costumer with the Most Transactions */}
            <div className="col-span-12 2xl:col-span-5 h-100">
              <TableAction
                columns={columns}
                DisableDelete
                DisableEdit
                data={dataCustomer}
                pageSize={5}
                FilterActive>
                Pelanggan dengan transaksi terbanyak
              </TableAction>
            </div>

            {/* Recent Orders */}
            <div className="col-span-12 2xl:col-span-8 h-100">
              <TableAction
                FilterActive
                DisableDelete
                DisableEdit
                columns={columnsTransaction}
                data={dataTransaction}
                pageSize={5}>
                Riwayat transaksi
              </TableAction>
            </div>

            {/* Chart of product sales */}
            <div className="col-span-12 md:col-span-6 2xl:col-span-4">
              <CardChart2
                title="Lapangan Terlaris"
                dataValues={dataFields}
                options={options}
                handleOptionChange={handleChartOptionChange2}
              />
            </div>
          </div>
        </div>
      </main>
    </MainLayouts>
  );
};

export default ReportPage;
