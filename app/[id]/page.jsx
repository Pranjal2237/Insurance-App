"use client";
import { categoryImage } from "@/public";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  let pathname = usePathname();
  const [companies, setCompanies] = useState([]);
  pathname = pathname.slice(1);
  const title = pathname.replaceAll("-", " ");
  useEffect(() => {
    async function citDetails() {
      let city = await axios.get(
        `http://localhost:3000/api/cities/${pathname}`
      );
      city = city.data;
      setCompanies(city);
    }
    citDetails();
  }, [pathname]);
  return (
    <div className="padding-inline">
      <h1 className="mb-10 font-bold text-3xl leading-[1.25em]">
        Best {title}
      </h1>
      <div className="grid grid-cols-1 gap-[2.5rem] sm:grid-cols-2 lg:grid-cols-3">
        {companies &&
          companies.map(([name, review, rating, address, , category,,,,,image]) => {
            let link = name?.replaceAll(" ", "-");
            return (
              <div className="overflow-hidden rounded-lg border-[#d3d3d3] border-solid border-[1px]">
                <div className="w-[100%] overflow-hidden">
                  <Image
                    src={image}
                    alt="/"
                    className="w-[100%] transiton-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="py-5 px-4 flex flex-col justify-between items-start">
                  <h1 className="font-bold">{name}</h1>
                  <h2 className="font-[600] bg-[--btn-bg] text-[12px] text-[#6950f3] rounded-[20px] my-2 p-2">
                    {category}
                  </h2>
                  <div className="flex gap-3">
                    <h2 className="font-[400]">Rating- {rating}</h2>
                    <h2 className="font-[400]">Reviews- {review}</h2>
                  </div>
                  <p className="text-[#757676] text-sm">{address}</p>
                  <Link
                    href={`/${pathname}/${link}`}
                    className="mt-4 text-[#6950f3] font-bold"
                  >
                    See More....
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
