import SignUpForm from "@/components/forms/SignUpForm";
import Title from "../title";

const SignUpPage = () => {
  return (
    <>
      <Title
        title="Sign Up"
        description="Fill up the details to get started."
      />

      <SignUpForm />
    </>
  );
};
export default SignUpPage;
