import SignInForm from "@/components/forms/SignInForm";

const SignInPage = () => {
  return (
    <>
      <div className="grid mb-8">
        <h1 className="text-3xl xl:text-4xl font-semibold text-white">
          Sign In
        </h1>
        <p className="mt-1 text-main">
          Welcome back! Enter your login details.
        </p>
      </div>

      <div className="w-full">
        <SignInForm />
      </div>
    </>
  );
};
export default SignInPage;
