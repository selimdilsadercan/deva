"use client";

import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
  const router = useRouter();

  function handleClick() {
    router.push(`/`);
  }
  return (
    <div className="flex justify-between align-center pt-2 pl-10 pr-14 mb-4 ">
      <h1
        className="p-4 font-bold cursor-pointer"
        onClick={handleClick}
      >
        🐨 Sub Manager
      </h1>
      <UserButton
        appearance={{ elements: { avatarBox: "m-4" } }}
      />
    </div>
  );
}

export default Navbar;
