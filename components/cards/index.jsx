"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { categoryImage } from "@/public";

const Cards = ({companies}) => {
  return (
    <div className="grid grid-cols-1 gap-[2.5rem] sm:grid-cols-2 lg:grid-cols-3">
        {
          companies.map(([name, review, rating, address, , category]) => {
            let link = name?.replaceAll(" ", "_");
            return (
              <div className="overflow-hidden rounded-lg border-[#d3d3d3] border-solid border-[1px]">
                <div className="w-[100%] overflow-hidden">
                  <Image
                    src={categoryImage}
                    alt="/"
                    className="w-[100%] transiton-transform duration-300 ease-in-out hover:scale-125 cursor-pointer"
                  />
                </div>
                <div className="py-5 px-4 flex flex-col justify-between items-start">
                  <h1 className="font-bold">{name}</h1>
                  <h2 className="font-[600] bg-[--btn-bg] text-[12px] text-[#6950f3] rounded-[20px] my-2 p-2">
                    {category}
                  </h2>
                  <div className="flex gap-3">
                    <h2 className="font-[400]">{rating}</h2>
                    <h2 className="font-[400]">{review}</h2>
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
  )
}

export default Cards