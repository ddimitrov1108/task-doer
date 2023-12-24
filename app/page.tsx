import { Button, Logo } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen grid items-center justify-center gap-4">
      <div className="grid gap-10">
        <div className="grid gap-2 text-center">
          <Logo className="w-fit mx-auto" />
          <p className="w-80">
            Application that will help you to manage your day to day and future
            activities.
          </p>
        </div>

        <div className="justify-center flex flex-col sm:flex-row gap-4">
          <Link href="/sign-in" className="w-full">
            <Button variant="primary" fullWidth>Sign In</Button>
          </Link>

          <Link href="/sign-up" className="w-full">
            <Button variant="text" fullWidth>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
