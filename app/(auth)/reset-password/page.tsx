import ChangePasswordWithTokenForm from "@/components/forms/ChangePasswordWithTokenForm";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import userController from "@/db/UserController";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (!searchParams.token)
    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl xl:text-4xl font-semibold text-white">
            Reset Password
          </h1>
          <p className="mt-1 text-main">
            Fill up your email and we will send you an reset password link.
          </p>
        </div>

        <div className="w-full">
          <ResetPasswordForm />
        </div>
      </>
    );

  const user = await userController.getByToken(searchParams.token as string);

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl xl:text-4xl font-semibold text-white">
          Change Password
        </h1>
        <p className="mt-1 text-main">Reset your password to continue.</p>
      </div>

      <div className="w-full">
        <ChangePasswordWithTokenForm
          reset_password_token={searchParams.token as string}
        />
      </div>
    </>
  );
};

export default ResetPasswordPage;
