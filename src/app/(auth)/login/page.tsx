import FormLogin from "./login-form";

const Login = () => {
  return (
    <div className=" w-screen h-screen bg-[url(/auth/bg-auth.jpg)] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] bg-white/95 p-6 rounded-2xl shadow-xl bg-opacity-50">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className=" text-2xl font-bold">Welcome back!</h1>
          <p className="text-sm/7 text-gray-700 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>
        </div>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
