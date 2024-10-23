import TableData from "./table";
import PropTypes from "prop-types";
const CardTable = (props) => {
  const { columns, data, pageSize, children } = props;
  return (
    <div className="col-span-12  lg:col-span-8  xl:col-span-4  outline outline-offset-2 outline-2 rounded-lg outline-orange-500 bg-white p-4 flex flex-col">
      <span className="text-2xl xl:text-md font-semibold text-gray-800">
        {children}
      </span>
      <div className="w-full mt-5">
        <TableData columns={columns} data={data} pageSize={pageSize} />
      </div>
    </div>
  );
};

CardTable.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default CardTable;
