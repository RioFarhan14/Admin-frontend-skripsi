import AuthLayouts from "../Layouts/AuthLayouts";
import FormLogin from "../Fragments/FormLogin";
const LoginPage = () => {
  return (
    <>
      <div className="flex bg-primary h-screen items-center justify-center">
        <AuthLayouts>
          <FormLogin />
        </AuthLayouts>
      </div>
    </>
  );
};

export default LoginPage;
