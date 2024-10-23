import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { format } from "date-fns";

const DatePickerComponent = ({ name, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    // Format tanggal menjadi yyyy-MM-dd
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
    } else {
      onChange(null);
    }
  };

  const today = new Date();

  // Menambahkan 10 hari ke tanggal saat ini
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 10);

  return (
    <div className="relative w-full">
      <DatePicker
        name={name}
        id={name}
        selected={selectedDate}
        onChange={handleChange}
        minDate={today}
        maxDate={maxDate}
        required
        dateFormat="yyyy-MM-dd" // Format tampilan
        className="border border-gray-300 rounded-lg w-full p-2.5"
        placeholderText="Pilih tanggal"
      />
      <div className="absolute right-3 top-3">
        <CalendarIcon className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
};

DatePickerComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerComponent;
