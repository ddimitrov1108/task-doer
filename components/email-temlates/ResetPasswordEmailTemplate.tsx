interface Props {
  email: string;
  resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate = ({
  email,
  resetPasswordToken,
}: Props) => (
  <div>
    <h3>
      Reset password for <b>{email}</b>
    </h3>
    <p>
      To reset your password, click on this link and follow the instructions:
    </p>
    <a
      href={`http://localhost:3000/reset-password?token=${resetPasswordToken}`}
    >
      Click here to reset password
    </a>
  </div>
);
