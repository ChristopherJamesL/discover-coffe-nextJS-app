import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="pb-[30px]">Coffee Store Page</h1>
      <button>
        <Link href="/">Back to Home</Link>
      </button>
    </div>
  );
}
