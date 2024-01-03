import { Button } from "@/components/ui"
import Image from "next/image"
import Link from "next/link"

interface Props {}
const PageNotFound = (props: Props) => {
  return (
    <div className="h-[80vh] grid justify-center items-center">
    <div className="grid gap-4">
      <div>
        <Image
          src="/page-notfound.svg"
          width={128}
          height={128}
          alt="page-notfound.svg"
          className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4"
        />

        <p className="text-center text-main">
          Oh snap! This page is not reachable!
          <br />
          Please try again after a while.
        </p>
      </div>
      <Link href="/todo" replace={true} className="mx-auto">
        <Button variant="secondary">
          Home Page
        </Button>
      </Link>
    </div>
  </div>
  )
}
export default PageNotFound