"use client"

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const AboutData = ({sheetId,range,isImage=false,heading}) => {
    const[contents,setContents]=useState([]);
    const[image,setImage]=useState("");
    useEffect(()=>{
        async function getStaticData() {
            let origin=window.location.origin;
            let aboutData = await axios.post(
                `${origin}/api/configs`,
                { range,
                  sheetId
                 }
              );
              aboutData = aboutData?.data?.slice(1);
              setContents(aboutData);
            if(isImage)
            {
                let imageUrl = await axios.post(
                    `${origin}/api/configs`,
                    { range: "Snapshot - Configs!G:G",
                      sheetId
                     }
                  );
                  imageUrl = imageUrl?.data?.slice(1)?.[0]?.[0];
                  setImage(imageUrl)
            }
        }
        getStaticData();
    },[])
    console.log(contents)
  return (
    <div className="bg-white p-6 sm:p-24">
    {
        isImage && <div className='flex items-center mb-10'><Image src={image} alt='/image' width={1000} height={500} /></div>
    }
    <h1 className="text-3xl font-bold mb-10">{heading}</h1>
    {
        contents.map((content,index)=>(
            <p key={index} className="text-base mb-6 leading-8">{content}</p>
        ))
    }
  </div>
  )
}

export default AboutData