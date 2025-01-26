"use client"

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Loader = ({sheetId}) => {
    const [companies, setCompanies] = useState([]);
    const [keyword,setKeyWord]=useState("");
    const [filter,setFilter]=useState({
      start:1,
      end:31
    })
    useEffect(() => {
        async function citDetails() {
          let origin=window.location.origin;
          let cities = await axios.post(`${origin}/api/cities`, {
            range: "Snapshot - Pages!A:C",
            sheetId:sheetId,
            filter
          });
          cities = cities.data;
          console.log(cities);
          setCompanies([...companies,...cities]);
        }
        citDetails();
      }, [filter]);
      useEffect(() => {
        async function citDetails() {
          let origin=window.location.origin;
          let aboutKeyWord=await axios.post(`${origin}/api/configs`,{
            range:"Snapshot - Configs!K:K",
            sheetId
          })
          aboutKeyWord=aboutKeyWord.data.splice(1)?.[0]?.[0];
          setKeyWord(aboutKeyWord);
        }
        citDetails();
      }, []);
  return (
    <>
      <h1 className="mb-10 font-bold text-xl leading-[1.25em] sm:text-3xl">
              Recently Added {keyword}
            </h1>
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {companies &&
            companies.map(([city, prompt,image]) => {
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
        <button className='text-[--btn-color] py-4 px-8 rounded-lg font-bold bg-[--btn-bg] mt-[2rem]' onClick={()=>{setFilter({start:filter.start+30,end:filter.end+30})}} >Load More...</button>
    </>
  )
}

export default Loader