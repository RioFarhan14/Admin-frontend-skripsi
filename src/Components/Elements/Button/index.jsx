import PropTypes from "prop-types";

const Button = (props) => {
  const {
    bgColor = "bg-green-500",
    children,
    buttonwidth,
    buttonheight,
    textColor = "text-white",
    onClick = () => {},
    type = "button", // Default to "button", but you can pass "submit" or "reset" if needed
    disabled = false,
  } = props;

  return (
    <button
      className={`${buttonheight} px-6 font-semibold rounded-md ${bgColor} ${textColor} ${buttonwidth} cursor-pointer`}
      onClick={onClick} // Ensure onClick is used correctly
      type={type}
      disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  buttonwidth: PropTypes.string,
  textColor: PropTypes.string,
  buttonheight: PropTypes.string,
  onClick: PropTypes.func, // Make sure onClick is a function
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Optional: define acceptable button types
};

export default Button;
