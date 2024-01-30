import authConfig from "@/lib/auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";

const Logo = dynamic(() => import("@/components/ui/Logo"));

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  const session = await (
    await import("next-auth")
  ).getServerSession(authConfig);

  if (session) return redirect("/todo");

  return (
    <div className="bg-black-main grid items-center grid-cols-7">
      <div className="z-10 bg-inherit px-6 xl:px-12 py-10 w-full min-h-screen max-w-[520px] mx-auto lg:mx-0 lg:max-w-none col-span-full lg:col-span-3 xl:col-span-2">
        <Logo />

        <div className="min-h-[80vh] py-14 flex flex-col justify-center gap-8">
          {children}
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 bottom-0 hidden lg:block">
        <Image
          src="/auth-bg.svg"
          width={0}
          height={0}
          alt="banner"
          draggable={false}
          className="min-h-screen object-cover"
          style={{ width: "100vw", height: "auto" }}
        />
      </div>
    </div>
  );
};
export default AuthLayout;
