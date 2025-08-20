"use client";

import Image from "next/image";

export default function Upvote({ voting }: { voting: number }) {
  const handleClick = () => {
    console.log("Click!");
  };
  return (
    <>
      <div className="mb-6 flex">
        <Image
          className="border border-black bg-red-700"
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{voting}</p>
      </div>
      <button onClick={handleClick}>Up vote!</button>
    </>
  );
}
