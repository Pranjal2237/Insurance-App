"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DynamicPage = ({sheetId}) => {
    let pathname = usePathname();
    const [companies, setCompanies] = useState([]);
    const [about,setAbout]=useState("");
    pathname = pathname.slice(1);
    const [title,setTitle]=useState(pathname.replaceAll("-", " "));
    useEffect(() => {
      async function citDetails() {
        let origin=window.location.origin;
        let city = await axios.post(
          `${origin}/api/cities/${pathname}`,{
            sheetId:sheetId
          }
        );
        city = city.data;
        let aboutCity=await axios.post( `${origin}/api/cities/${pathname}/about`,{
          sheetId:sheetId
        })
        aboutCity=aboutCity.data;
        setAbout(aboutCity);
        setCompanies(city);
      }
      citDetails();
    }, [pathname]);
    return (
        <div className="padding-inline">
          <h1 className="mb-10 font-bold text-3xl leading-[1.25em]">
            Best {title}
          </h1>
          <p className="mb-10">{about}</p>
          <div className="grid grid-cols-1 gap-[2.5rem] sm:grid-cols-2 lg:grid-cols-3">
            {companies &&
              companies.map(
                ([name, review, rating, address, , category, , , , , image],index) => {
                  let link = name?.replaceAll(" ", "-");
                  return (
                    <div key={name+index} className="overflow-hidden rounded-lg border-[#d3d3d3] border-solid border-[1px]">
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
                          href={`/listing/${link}`}
                          className="mt-4 text-[#6950f3] font-bold"
                        >
                          See More....
                        </Link>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
    );
  };
  
  export default DynamicPage;