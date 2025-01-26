"use client"

import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Banner = ({sheetId}) => {
    const [heading,setHeading]=useState("");
    const [description,setDescription]=useState("");
    useEffect(()=>{
        async function getBannerData() {
            let origin=window.location.origin;
            let aboutHeading=await axios.post(`${origin}/api/configs`,{
                range:"Snapshot - Configs!L:L",
                sheetId
            })
            aboutHeading=aboutHeading.data.splice(1)?.[0]?.[0];
            let aboutDesc=await axios.post(`${origin}/api/configs`,{
                range:"Snapshot - Configs!M:M",
                sheetId
            })
            aboutDesc=aboutDesc.data.splice(1)?.[0]?.[0];
            setHeading(aboutHeading);
            setDescription(aboutDesc);
        }
        getBannerData();
    },[])
  return (
    <div className="bg-[--btn-bg] min-h-[95dvh] flex flex-col justify-center ">
            <div className="padding-inline max-w-[100%] sm:max-w-[60%]">
              <h1 className="mb-8 font-extrabold text-4xl leading-[1.25em] sm:text-5xl">
                {heading}
              </h1>
              <p className="mb-7 leading-[2rem] tracking-wide text-md sm:text-lg">
                {description}
              </p>
              <Link href="/contact-us">
                <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-lg font-bold">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
  )
}

export default Banner