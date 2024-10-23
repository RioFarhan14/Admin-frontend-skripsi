import PropTypes from "prop-types";

const Label = (props) => {
  const { name, children, color = "text-white", fontSize = "text-sm" } = props;
  return (
    <label htmlFor={name} className={`block ${fontSize} leading-6 ${color}`}>
      {children}
    </label>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};

export default Label;
