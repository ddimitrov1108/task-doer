import Spinner from "@/components/ui/Spinner";
import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/forms/SignInForm"), {
  loading: () => <Spinner className="h-[280px] flex items-center justify-center" />,
});

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
