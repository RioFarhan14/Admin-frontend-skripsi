import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Input = ({
  name,
  type = "text",
  placeholder = "",
  color = "text-dark",
  value = "", // Default value to an empty string
  onChange,
  required = false, // Default value for required
}) => {
  // Use internal state only if no value prop is provided
  const [internalValue, setInternalValue] = useState(value);

  // Update internal value if the value prop changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (value === undefined) {
      setInternalValue(newValue); // Update internal state if value prop is not provided
    }
    onChange(newValue); // Notify parent of the change
  };

  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value !== undefined ? value : internalValue} // Use value from props if provided, else internal state
      required={required} // Apply required attribute based on prop
      placeholder={placeholder}
      onChange={handleChange}
      className={`block w-full ${color} rounded-md border-0 py-1.5 px-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  required: PropTypes.bool, // Add required prop type
};

export default Input;
