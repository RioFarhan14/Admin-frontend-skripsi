import Input from "./input";
import Label from "./Label";
import PropTypes from "prop-types";

const InputForm = ({
  label,
  name,
  type = "text", // Default value for type
  placeholder = "",
  required = false,
  textColor = "text-dark", // Default text color
  inputColor = "text-dark", // Default input color
  inputValue = "", // Default input value
  handleInputChange,
  className = "", // Optional additional classes for parent div
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label name={name} color={textColor}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        color={inputColor}
        required={required}
        value={inputValue} // Controlled value
        onChange={handleInputChange} // Update state on change
      />
    </div>
  );
};

InputForm.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  textColor: PropTypes.string,
  inputColor: PropTypes.string,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  className: PropTypes.string, // Allow passing additional classes
  required: PropTypes.bool,
};

export default InputForm;
