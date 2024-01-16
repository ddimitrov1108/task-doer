import authConfig from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";

const Logo = dynamic(() => import("@/components/ui/Logo"));

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  const session = await getServerSession(authConfig);

  if (session) return (await import("next/navigation")).redirect("/todo");

  return (
    <div className="bg-black-main relative grid items-center grid-cols-7">
      <div className="z-10 bg-black-main px-4 py-10 w-full min-h-screen max-w-[520px] mx-auto lg:mx-0 lg:max-w-none col-span-full lg:col-span-3 xl:col-span-2 xl:px-12">
        <Logo className="max-w-fit" />

        <div className="relative flex flex-col min-h-[80vh] justify-center h- py-14">
          {children}
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 bottom-0 hidden lg:block">
        <div className="max-h-screen">
          <Image
            src="/svg/auth-bg.svg"
            width={1920}
            height={1080}
            alt="banner"
            draggable={false}
            className="min-h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
