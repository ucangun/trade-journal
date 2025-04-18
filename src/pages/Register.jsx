import RegisterForm from "../components/Register/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-[#e6edf5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#161616]">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Join our trading community and start tracking your performance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
