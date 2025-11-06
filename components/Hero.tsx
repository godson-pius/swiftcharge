import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <main className='w-full h-[50rem] pt-60 px-5 lg:px-24 bg-[url("/hero.webp")] bg-cover bg-center bg-no-repeat'>
      <section className="flex">
        <div className="text">
          <div className="flex flex-col gap-0">
            <h1 className="text-5xl lg:text-[5.7rem] font-extrabold text-white tracking-tighter">
              Inclusive global
            </h1>
            <h1 className="text-5xl lg:text-[5.7rem] font-extrabold text-white tracking-tighter">
              soft app designed
            </h1>
            <h1 className="text-5xl lg:text-[5.7rem] font-extrabold text-white tracking-tighter">
              just for you.
            </h1>
          </div>
          <p className="w-80 lg:w-auto mt-2 text-white lg:text-lg mb-10">
            Buy/Resell Cheap Data & Airtime, Electricity Bills Payment, <br />{" "}
            Cable TV Subscription, Convert Airtime to Cash
          </p>

          <Link
            href={"/get-started"}
            className="bg-blue-600 p-3 rounded-md text-blue-100 font-bold text-sm"
          >
            Get started - It&apos;s free
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Hero;
