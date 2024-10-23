import Dropdown from "../Dropdown";
import BarChart from "./ChartBar";
import PropTypes from "prop-types";
const CardChart = (props) => {
  const {
    children,
    name,
    dataValues,
    dataOptions,
    select,
    handleOptionChange,
    Currency = false,
  } = props;
  return (
    <div className="min-w-full outline outline-offset-2 outline-2 rounded-lg outline-orange-500 bg-white p-4  grid grid-cols-12">
      <div className="col-span-12 grid grid-cols-12">
        <span className="text-2xl xl:text-md font-semibold text-gray-800 col-span-5">
          {children}
        </span>
        <span className="col-span-3  sm:col-span-4 md:col-span-5"></span>
        <span className="col-span-2 float-end mx-2">
          {select && (
            <Dropdown
              options={dataOptions}
              name="option"
              handleChange={handleOptionChange}
            />
          )}
        </span>
      </div>
      <div className="w-full mt-5 col-span-12">
        <BarChart dataValues={dataValues} title={name} Currency={Currency} />
      </div>
    </div>
  );
};

CardChart.propTypes = {
  name: PropTypes.string.isRequired,
  dataValues: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
  dataOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  select: PropTypes.bool,
  handleOptionChange: PropTypes.func,
  Currency: PropTypes.bool,
};
export default CardChart;
