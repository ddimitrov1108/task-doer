import ChangePasswordWithTokenForm from "@/components/forms/ChangePasswordWithTokenForm";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Title from "../title";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface Props {
  searchParams: { token?: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: Props) => {
  if (!searchParams.token)
    return (
      <>
        <Title
          title="Reset Password"
          description="Fill up your account email and we will send you an reset password link."
        />

        <ResetPasswordForm />
      </>
    );

  const user = await (
    await import("@/db/UserController")
  ).default.getByToken(searchParams.token as string);

  if (!user) {
    toast.error("User does not exist");
    return redirect("/sign-in");
  }

  return (
    <>
      <Title
        title="Change Password"
        description="Reset your password to continue."
      />

      <ChangePasswordWithTokenForm
        resetPasswordToken={searchParams.token as string}
      />
    </>
  );
};

export default ResetPasswordPage;
