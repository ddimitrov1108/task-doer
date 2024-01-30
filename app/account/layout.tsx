interface Props {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: Props) => {
  return (
    <div>
      AccountLayout
      {children}
    </div>
  );
};
export default AccountLayout;
