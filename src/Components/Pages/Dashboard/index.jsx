import MainLayouts from "../../Layouts/MainLayouts";
import CardStatus from "../../Elements/CardStatus";
import CardChart from "../../Elements/CardChart";
import formatRupiah from "../../../utils/format";
import CardTable from "../../Elements/CardTable";
import { useMemo, useCallback, useState, useEffect } from "react";
import { getBookings } from "../../../service/booking";
import { useLogin } from "../../../hooks/useLogin";
import { getCardInformation, getChardInformation } from "../../../service/transaction";

const DashbordPage = () => {
  useLogin();
  const [booking, setBooking] = useState([]);
  const [optionTransaction, setOptionTransaction] = useState({});
  const [optionIncome, setOptionIncome] = useState({});
  const [optionMembership, setOptionMembership] = useState({});
  const [incomeValue, setIncomeValue] = useState(0);
  const [membershipValue, setMembershipValue] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [selectedOptionIncome, setSelectedOptionIncome] = useState('month');
  const [selectedOptionTransaction, setSelectedOptionTransaction] = useState('month');
  const [selectedOptionMembership, setSelectedOptionMembership] = useState('month');
  const [dataIncome, setDataIncome] = useState([]);
  useEffect(() => {
    getChardInformation("month").then((res) => {
      setDataIncome(res.data);
    })
},[]);

  const columns = useMemo(
    () => [
      {
        Header: "Pemesan",
        accessor: "name",
      },
      {
        Header: "Waktu Mulai",
        accessor: "start_time",
      },
      {
        Header: "Waktu Selesai",
        accessor: "end_time",
      },
    ],
    []
  );

  useEffect(() => {
    getBookings().then((res) => {
      const today = new Date().toISOString().split('T')[0];
      const filteredBookings = res.filter((booking) => {
        const bookingDate = new Date(booking.booking_date).toISOString().split('T')[0];
        return bookingDate === today;
      });
      setBooking(filteredBookings);
    });
  }, []);

  useEffect(() => {
    getCardInformation("transaction").then((res) => {
      setOptionTransaction(res.data); // Set the entire response
    });
    getCardInformation("income").then((res) => {
      setOptionIncome(res.data); // Set the entire response
    });
    getCardInformation("membership").then((res) => {
      setOptionMembership(res.data); // Set the entire response
    });
  }, []);

  // Handle changes for each card separately
  const handleOptionChangeIncome = useCallback((e) => {
    setSelectedOptionIncome(e);
  }, []);

  const handleOptionChangeTransaction = useCallback((e) => {
    setSelectedOptionTransaction(e);
  }, []);

  const handleOptionChangeMembership = useCallback((e) => {
    setSelectedOptionMembership(e);
  }, []);

  useEffect(() => {
    setTransactionValue(
      selectedOptionTransaction === 'month'
        ? optionTransaction.transactions_this_month
        : optionTransaction.transactions_this_year
    );

    setIncomeValue(
      selectedOptionIncome === 'month'
        ? optionIncome.income_this_month
        : optionIncome.income_this_year
    );

    setMembershipValue(
      selectedOptionMembership === 'month'
        ? optionMembership.membership_this_month
        : optionMembership.membership_this_year
    );
  }, [selectedOptionIncome,selectedOptionMembership,selectedOptionTransaction, optionTransaction, optionIncome, optionMembership]);
  return (
    <MainLayouts>
      <main className="grow bg-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <CardStatus
              handleOptionChange={handleOptionChangeIncome}
              title="Pendapatan"
              inputselect
              name="income">
              {formatRupiah(incomeValue) || 0}
            </CardStatus>

            <CardStatus
              handleOptionChange={handleOptionChangeTransaction}
              title="Transaksi"
              inputselect
              name="transaction">
              {transactionValue || 0}
            </CardStatus>

            <CardStatus
              handleOptionChange={handleOptionChangeMembership}
              title="Membership"
              inputselect
              name="membership">
              {membershipValue || 0}
            </CardStatus>

            <div className="col-span-12 lg:col-span-8">
              <CardChart name="Pendapatan" dataValues={dataIncome} Currency={true}>
                Pendapatan Bulanan
              </CardChart>
            </div>

            <CardTable columns={columns} data={booking} pageSize={5}>
              List Booking Hari Ini
            </CardTable>
          </div>
        </div>
      </main>
    </MainLayouts>
  );
};

export default DashbordPage;