import { getUserFromServerSession } from "@/lib/auth";

const AccountPage = async () => {
  const user = await getUserFromServerSession();

  return (
    <div>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </div>
  );
};
export default AccountPage;
