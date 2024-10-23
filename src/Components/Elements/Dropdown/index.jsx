import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, name, handleChange, disabledValue }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Set initial value if options are provided and not empty
    if (options.length > 0 && !selectedOption) {
      setSelectedOption(options[0].value);
    }
  }, [options, selectedOption]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    handleChange(value);
  };

  return (
    <div>
      <select
        name={name}
        id={name}
        value={selectedOption}
        onChange={handleSelectChange}
        className="bg-primary text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-full p-2.5 cursor-pointer">
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={disabledValue === option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabledValue: PropTypes.string,
};

export default memo(Dropdown);
