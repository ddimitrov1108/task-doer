import SignInForm from "@/components/forms/SignInForm";
import Title from "../title";

const SignInPage = () => {
  return (
    <>
      <Title
        title="Sign In"
        description="Welcome back! Enter your login details."
      />

      <SignInForm />
    </>
  );
};
export default SignInPage;
