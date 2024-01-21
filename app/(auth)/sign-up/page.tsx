import SignUpForm from "@/components/forms/SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <div className="grid gap-1 mb-8">
        <h1 className="text-3xl xl:text-4xl font-semibold text-white">
          Sign Up
        </h1>
        <p>Fill up the details to get started.</p>
      </div>

      <div className="w-full">
        <SignUpForm />
      </div>
    </>
  );
};
export default SignUpPage;
