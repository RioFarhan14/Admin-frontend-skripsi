import PropTypes from "prop-types"; // Corrected the import statement
import Dropdown from "../Dropdown";
const CardStatus = (props) => {
  const {
    children,
    title,
    inputselect = false,
    name,
    handleOptionChange = () => {},
  } = props;
  const options = [
    { value: "month", label: "Bulan ini" },
    { value: "year", label: "Tahun ini" },
  ];
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-6 2xl:col-span-4 outline outline-offset-2 outline-2 rounded-lg outline-orange-500 bg-white p-4 flex flex-col items-center">
      <div className="w-full grid grid-cols-12">
        <div className="lg:text-lg col-span-5 xl:text-md font-semibold text-gray-800">
          {title}
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-4 mx-2">
          {inputselect && ( // Changed from `select === true ??` to `select &&`
            <Dropdown
              options={options}
              name={name}
              handleChange={handleOptionChange}
            />
          )}
        </div>
      </div>
      <div className="mt-5 text-2xl w-full ">{children}</div>
    </div>
  );
};

CardStatus.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  inputselect: PropTypes.bool,
  name: PropTypes.string,
  handleOptionChange: PropTypes.func,
};

export default CardStatus;
