"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Email, facebookBlue, pinterestBlue, twitterBlue, youtubeBlue } from "@/public";


const Footer = () => {
  const [companies, setCompanies] = useState([]);
  const [logo,setLogo]=useState("");
  const [email,setEmail]=useState("");
  const [keyword,setKeyWord]=useState("");
  const [url,setUrl]=useState("");
  const [socialUrl,setSocialUrl]=useState({fbUrl:"/",ytUrl:"/",xUrl:"/",pUrl:"/"});
  const dateValue=new Date();
  const year=dateValue.getFullYear();
  useEffect(() => {
    async function citDetails() {
      let origin=window.location.origin;
      let domainUrl=origin.split("//");
      domainUrl=domainUrl[1];
      const response = await axios.post(`${origin}/api/getSheetId`, {
        domain: domainUrl,
      });
      let {sheetId}=response.data
      let cities = await axios.post(
        `${origin}/api/cities`,
        { range: "Snapshot - Pages!A:A",
          sheetId:sheetId,
          filter:{
            start:1,
            end:61
          }
         }
      );
      cities = cities.data;
      let aboutLogo=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!B:B",
        sheetId
      })
      aboutLogo=aboutLogo.data.splice(1)?.[0]?.[0];
      let aboutEmail=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!J:J",
        sheetId
      })
      aboutEmail=aboutEmail.data.splice(1)?.[0]?.[0];
      let aboutKeyWord=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!K:K",
        sheetId
      })
      aboutKeyWord=aboutKeyWord.data.splice(1)?.[0]?.[0];
      let fbUrl=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!S:S",
        sheetId
      })
      fbUrl=fbUrl.data.splice(1)?.[0]?.[0];
      let ytUrl=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!W:W",
        sheetId
      })
      ytUrl=ytUrl.data.splice(1)?.[0]?.[0];
      let xUrl=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!V:V",
        sheetId
      })
      xUrl=xUrl.data.splice(1)?.[0]?.[0];
      let pUrl=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!U:U",
        sheetId
      })
      pUrl=pUrl.data.splice(1)?.[0]?.[0];
      setSocialUrl({fbUrl,ytUrl,xUrl,pUrl});
      setKeyWord(aboutKeyWord);
      setCompanies(cities);
      setLogo(aboutLogo);
      setEmail(aboutEmail);
      setUrl(domainUrl);
    }
    citDetails();
  }, []);
  return (
    <div className="">
      <div className="py-10 padding-inline">
        <h1 className="text-xl mb-6 font-bold sm:text-2xl">
          Browse Locations for {keyword}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
          {companies &&
            companies.map(([city]) => {
              const link = city.replaceAll(" ", "-");
              return (
                <Link key={city} href={link}>
                  <p className="text-sm mb-2 font-normal hover:underline">
                    {city}
                  </p>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="py-10 padding-inline bg-[--btn-bg] flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-[2rem]">
        <div>
          <Image src={logo} alt="/" width={150} height={150} />
        </div>
        <div className="flex gap-[1rem]">
            <Image src={Email} alt="/" width={15} height={15} />
            <Link href={`mailto:${email}`}>
          <p className="text-[1.1rem] hover:text-[--btn-color]">{email}</p>
          </Link>
          </div>
          <div className="flex gap-[2rem]">
            <Link href={`https://${socialUrl.fbUrl}`}>
            <Image alt="/" src={facebookBlue} width={15} height={15} />
            </Link>
            <Link href={`https://${socialUrl.ytUrl}`}>
            <Image alt="/" src={youtubeBlue} width={15} height={15} />
            </Link>
            <Link href={`https://${socialUrl.xUrl}`}>
            <Image alt="/" src={twitterBlue} width={15} height={15} />
            </Link>
            <Link href={`https://${socialUrl.pUrl}`}>
            <Image alt="/" src={pinterestBlue} width={15} height={15} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Quick Links</h2>
          {[
            { page: "Home", link: "/" },
            { page: "About us", link: "/about-us" },
            { page: "Contact", link: "/contact-us" },
            {page:"Privacy Policy",link:"/privacy-policy"},
            {page:"Disclaimer",link:"/disclaimer"}
          ].map(({ page, link }) => (
            <Link href={link} key={page}  className="hover:underline">
              <p>{page}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="font-bold mb-[0.5rem] text-4xl leading-[1.25em] sm:text-[24px]">
            Subscribe to Newsletter
          </h3>
          <p className="text-[1.1rem]">
            Join our subscribers list to get the latest news and special offers
          </p>
          <div className="bg-white p-[1rem] my-[1rem]">
            <input
              type="text"
              placeholder="Your email address"
              className="w-[100%] outline-none text-black"
            />
          </div>
          <button className="bg-[--btn-color] text-[white] py-4 px-8 rounded-md font-bold">
            Subscribe Now
          </button>
        </div>
      </div>
      <div className="padding-inline py-4 flex justify-between">
        <p className="text-[12px]">Copyright © {year} <Link href={`https://${url}`}>{url}</Link></p>
        <p className="text-[12px]">Powered by {url}</p>
      </div>
    </div>
  );
};

export default Footer;
