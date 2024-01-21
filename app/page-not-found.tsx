import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="h-[80vh] py-16 grid justify-center items-center">
      <div className="grid gap-4">
        <Image
          src="/page-notfound.svg"
          width={128}
          height={128}
          alt="page-notfound.svg"
          className="w-24 h-24 lg:w-32 lg:h-32 mx-auto"
        />

        <p className="text-center">
          Oh snap! This page is not reachable!
          <br />
          Please try again after a while.
        </p>
        <Link href="/todo" replace={true} className="mx-auto">
          <Button size="sm" variant="secondary">Home Page</Button>
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
