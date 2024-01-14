import Spinner from "@/components/ui/Spinner";
import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("@/components/forms/SignUpForm"), {
  loading: () => (
    <Spinner className="min-h-[320px] flex items-center justify-center" />
  ),
});

const SignUpPage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl xl:text-4xl font-semibold text-white">
          Sign Up
        </h1>
        <p className="mt-1 text-main">Fill up the details to get started.</p>
      </div>

      <div className="w-full">
        <SignUpForm />
      </div>
    </>
  );
};
export default SignUpPage;
