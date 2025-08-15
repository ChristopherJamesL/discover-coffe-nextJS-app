"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

const Banner = ({
  positionLocator,
  buttonText,
}: {
  positionLocator: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
}) => {
  return (
    <div className="mb-12 grid lg:mb-24 lg:grid-cols-2">
      <div className="z-20 flex flex-col px-2 md:pt-12">
        <h1 className="my-2 flex-wrap">
          <span className="pr-2 text-white">Coffee</span>
          <span className="text-gray-900">Connoisseur</span>
        </h1>
        <p className="font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-2xl">
          Discover your local coffee shops!
        </p>
        <div className="mt-12">
          <button onClick={positionLocator}>{buttonText}</button>
        </div>
      </div>
      <div className="hidden lg:flex mt-8 justify-center lg:justify-end lg:pr-30">
        <Image
          src="/static/coffee.png"
          width={250}
          height={300}
          className="w-32 md:w-48 lg:w-[250px]"
          alt="coffee"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Banner;
