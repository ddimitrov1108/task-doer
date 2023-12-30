"use client";

import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button onClick={() => signOut()}>Sign out</button>
  )
}
export default SignOutBtn