"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { logo } from "@/public";

const Footer = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    async function citDetails() {
      let cities = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cities`,
        { range: "Top200!A:A" }
      );
      cities = cities.data;
      cities = cities.slice(1, 61);
      setCompanies(cities);
    }
    citDetails();
  }, []);
  return (
    <div className="">
      <div className="py-10 padding-inline">
        <h1 className="text-xl mb-6 font-bold sm:text-2xl">
          Browse Locations for Insurance
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
        <div>
          <Image src={logo} alt="/" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">About Insurance99</h2>
          {[
            { page: "Home", link: "/" },
            { page: "About us", link: "/about-us" },
            { page: "Blog", link: "/" },
            { page: "Contact", link: "/contact-us" },
          ].map(({ page, link }) => (
            <Link href={link} key={page}  className="hover:underline">
              <p>{page}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Find us on Social</h2>
          {[
            { social: "Facebook", link: "/" },
            { social: "Twitter", link: "/" },
            { social: "LinkedIn", link: "/" },
            { social: "Instagram", link: "/" },
          ].map(({ social, link }) => (
            <Link href={link} key={social} className="hover:underline">
              <p>{social}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="padding-inline py-4 flex justify-between">
        <p className="text-[12px]">Copyright © 2024 99insuranceagency.com</p>
        <p className="text-[12px]">Powered by 99insuranceagency.com</p>
      </div>
    </div>
  );
};

export default Footer;
