"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  let pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [logo,setLogo]=useState("");
  const [open, setOpen] = useState(false);
  const [docsUrl,setDocsUrl]=useState("/");
  useEffect(()=>{
    setActivePath(pathname);
  },[pathname])
  useEffect(()=>{
    async function citDetails() {
      let origin=window.location.origin;
      let domainUrl=origin.split("//");
      domainUrl=domainUrl[1];
      const response = await axios.post(`${origin}/api/getSheetId`, {
        domain: domainUrl,
      });
      let {sheetId}=response.data
      let aboutLogo=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!B:B",
        sheetId
      })
      aboutLogo=aboutLogo.data.splice(1)?.[0]?.[0];
      let aboutdocs=await axios.post(`${origin}/api/configs`,{
        range:"Snapshot - Configs!P:P",
        sheetId
      })
      aboutdocs=aboutdocs.data.splice(1)?.[0]?.[0];
      setDocsUrl(aboutdocs);
      setLogo(aboutLogo);
      
    }
    citDetails();
  },[])
  return (
    <div
      className="padding-inline flex justify-between items-center py-8 sticky z-20 top-0 w-[100%]"
      style={
        activePath == "/" || activePath == "/contact-us"
          ? { backgroundColor:"var(--btn-bg)" }
          : { backgroundColor:"white" }
      }
    >
      <div className="flex items-center gap-10">
        <div>
          <Link href='/' >
          <Image src={logo} alt="/" width={150} height={150} />
          </Link>
        </div>
        {open && (
          <ul className="gap-8 absolute w-[100%] bg-[white] top-[6rem] left-0 sm:hidden">
            {[
              { list: "Home", link: "/" },
              { list: "Blog", link: "/blog" },
              { list: "About us", link: "/about-us" },
              { list: "Contact", link: "/contact-us" },
            ].map(({ list, link }) => {
              return (
                <Link
                key={list}
                  href={link}
                  onClick={() => {
                    setActivePath(link);
                    setOpen(false);
                  }}
                >
                  <li
                  key={list}
                    style={
                      link == activePath
                        ? { color: "black" }
                        : { color: "#76778b" }
                    }
                    className="p-[1rem] border-[#d3d3d3] border-solid border-[1px]"
                  >
                    {list}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
        <ul className="hidden sm:gap-8 sm:flex sm:w-[100%]">
          {[
            { list: "Home", link: "/" },
            { list: "Blog", link: "/blog" },
            { list: "About us", link: "/about-us" },
            { list: "Contact", link: "/contact-us" },
          ].map(({ list, link }) => {
            return (
              <Link
              key={list}
                href={link}
                onClick={() => {
                  setActivePath(link);
                }}
              >
                <li
                  style={
                    link == activePath
                      ? { color: "black" }
                      : { color: "#76778b" }
                  }
                >
                  {list}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <Link href={docsUrl}>
      <button
        className="hidden text-[--btn-color] py-4 px-8 rounded-lg font-bold sm:block"
        style={
          activePath == "/" || activePath == "/contact-us"
            ? { backgroundColor: "white" }
            : { backgroundColor: "var(--btn-bg)" }
        }
      >
         List Your Business
      </button>
      </Link>
      <div
        className={`${open ? "nav_toggle active" : "nav_toggle"} sm:hidden`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="toggle"></div>
        <div className="toggle"></div>
        <div className="toggle"></div>
      </div>
    </div>
  );
};

export default Navigation;
