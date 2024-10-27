"use client";

import { logo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  let pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    setActivePath(pathname)
  },[pathname])
  return (
    <div
      className="padding-inline flex justify-between items-center py-8  w-[100%]"
      style={
        activePath == "/" || activePath == "/contact-us"
          ? { position: "absolute" }
          : { position: "static" }
      }
    >
      <div className="flex items-center gap-10">
        <div>
          <Image src={logo} />
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
                  href={link}
                  onClick={() => {
                    setActivePath(link);
                    setOpen(false);
                  }}
                >
                  <li
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
      <button
        className="hidden text-[--btn-color] py-4 px-8 rounded-lg font-bold sm:block"
        style={
          activePath == "/" || activePath == "/contact-us"
            ? { backgroundColor: "white" }
            : { backgroundColor: "var(--btn-bg)" }
        }
      >
        Call Us
      </button>
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
