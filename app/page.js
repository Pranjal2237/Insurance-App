
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = async () => {
  let cities = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cities`, {
    range: "Sheet1!A:C",
  });
  cities = cities.data;
  return (
    <div>
      <div className="bg-[--btn-bg] min-h-[95dvh] flex flex-col justify-center ">
        <div className="padding-inline max-w-[100%] sm:max-w-[60%]">
          <h2 className="text-[--btn-color] font-bold text-base uppercase">
            Welcome to 99insuranceagency.com
          </h2>
          <h1 className="mb-8 font-extrabold text-4xl leading-[1.25em] sm:text-5xl">
            Your Trusted Insurance Agency Directory
          </h1>
          <p className="mb-7 leading-[2rem] tracking-wide text-md sm:text-lg">
            Finding the right insurance agency doesn’t have to be a daunting
            task. We simplify the process by connecting you with top-rated
            insurance agencies across the United States.
          </p>
          <Link href="/contact-us">
            <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-lg font-bold">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="padding-inline my-[6rem]">
        <h1 className="mb-10 font-bold text-xl leading-[1.25em] sm:text-3xl">
          Featured Agencies For Insurance
        </h1>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {cities &&
            cities.map(([city, prompt,image]) => {
              const link = city.replaceAll(" ", "-");
              return (
                <div className="border-[#d3d3d3] border-solid border-[1px] rounded-lg overflow-hidden">
                  <div className="w-full overflow-hidden">
                    <Image
                      src={image}
                      className="w-full transiton-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
                       width={500}
                       height={500}
                    />
                  </div>
                  <div className="py-5 px-4 flex flex-col justify-between">
                    <h2 className="font-bold">{city}</h2>
                    <p className="text-[#757676] text-sm">{prompt}</p>
                    <Link href={link} className="mt-4 text-[#6950f3]">
                      Read More....
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
