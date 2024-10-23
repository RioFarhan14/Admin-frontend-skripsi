import Dropdown from "../Dropdown";
import PieChart from "./ChartPie";
import PropType from "prop-types";
const CardChart2 = ({ options, dataValues, title, handleOptionChange }) => {
  return (
    <div className="outline outline-offset-2 outline-2 rounded-lg outline-orange-500 bg-white p-4 flex flex-col h-full">
      <span className="text-2xl xl:text-md font-semibold text-gray-800">
        {title}
      </span>
      <div className="w-1/4 mt-5">
        <Dropdown
          options={options}
          name="option"
          handleChange={handleOptionChange}
        />
      </div>
      <div className="w-full mt-5">
        <PieChart dataValues={dataValues} />
      </div>
    </div>
  );
};

CardChart2.propTypes = {
  options: PropType.arrayOf(
    PropType.shape({
      label: PropType.string.isRequired,
      value: PropType.string.isRequired,
    })
  ).isRequired,
  dataValues: PropType.arrayOf(
    PropType.shape({
      label: PropType.string.isRequired,
      value: PropType.number.isRequired,
    })
  ).isRequired,
  title: PropType.string,
  handleOptionChange: PropType.func.isRequired,
};
export default CardChart2;
