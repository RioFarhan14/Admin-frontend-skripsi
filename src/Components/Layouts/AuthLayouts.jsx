import PropTypes from "prop-types";
const AuthLayouts = (props) => {
  return (
    <div className="w-full max-w-md space-y-8 h-4/5 p-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Futsal AM"
          src="../assets/logo.png"
          className="mx-auto h-44 w-auto"
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Administrator
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {props.children}
      </div>
    </div>
  );
};

AuthLayouts.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthLayouts;
