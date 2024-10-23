import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <section className="bg-primary h-screen w-full flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">
            {error.status ?? "404"}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-400 md:text-4xl"></p>
          <p className="mb-4 text-lg font-light text-gray-500">
            {error.statusText || error.message}
          </p>
          <Link
            to={"/"}
            className="inline-flex text-white bg-orange-600 hover:bg-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
