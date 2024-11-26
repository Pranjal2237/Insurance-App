"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Head from "next/head";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", position: "absolute", right: "2%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", position: "absolute", left: "2%" }}
      onClick={onClick}
    />
  );
}

const DynamicAgency= () => {
  let { company} = useParams();
  const title = company.replaceAll("-", " ");
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    review: "",
    rating: null,
    address: "",
    category: "",
    website: null,
    contact: "",
    about: "",
    image: "",
    services: "",
    openHours: "",
    serviceOptions: "",
    amenities: "",
    cityname:""
  });
  const [companies, setCompanies] = useState([]);
  let openTimes=[];
  let timings=companyDetails?.openHours.split("\n");
  timings=timings.slice(0,timings.length-1);
  for (let timing of timings) {
    timing=timing.split(" ");
    openTimes=[...openTimes,{day:timing[0],time:timing[timing.length-1]}]
  }
  useEffect(() => {
    async function citDetails() {
      let city = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cities/insurance/${company}`
      );
      city = city.data;
      const [details] = city;
      setCompanyDetails({
        name: details[0],
        review: details[1],
        rating: details[2],
        address: details[3],
        cityname:details[4],
        category: details[5],
        website: details[6],
        contact: details[7],
        about: details[9],
        image: details[10],
        services: details[11],
        openHours: details[12],
        serviceOptions: details[13],
        amenities: details[14],
      });
    }
    citDetails();
  }, [company]);
  useEffect(()=>{
    async function citDetails(){
      if(companyDetails?.cityname.length>0)
      {
      let similerInsurances = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cities/${companyDetails?.cityname}`
      );
      similerInsurances = similerInsurances.data;
      setCompanies(similerInsurances);
    }
    }
    citDetails()
  },[companyDetails.cityname])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return(
<>
    <Head key="company">
      <title>123</title>
      <meta name="description" content="hello" />
    </Head>
    <div className="padding-inline">
      {companyDetails?.name?.length > 0 && (
        <div>
          <h1 className="text-[1.5rem] font-bold sm:text-[3rem]">
            {companyDetails.name}
          </h1>
          <div className="flex justify-between flex-col gap-4 sm:flex-row">
            <div className="flex gap-4">
              <h2 className="text-[1rem] font-[600]">
                Rating- {companyDetails.rating}
              </h2>
              <h2 className="text-[1rem] font-[600] text-[#6950f3]">
                Reviews- ({companyDetails.review})
              </h2>
            </div>
            <p className="text-[#757676] text-[14px] sm:text-base">
              {companyDetails.address}
            </p>
          </div>
          <div className="w-[100%] mt-10">
            <Image
              src={companyDetails?.image}
              width={500}
              height={500}
              alt="/"
              className="w-[100%] rounded-lg"
            />
          </div>
          <h2 className="mt-[6rem] mb-[2rem] font-bold text-[2rem]">About</h2>
          <p className="leading-[1.5rem]">{companyDetails.about}</p>
          <h2 className="mt-[6rem] mb-[2rem] font-bold text-[2rem]">
            Services
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            {[
              { key: "Agency Name", value: companyDetails.name },
              { key: "Rating", value: companyDetails.rating },
              { key: "Review", value: companyDetails.review },
              { key: "Website", value: companyDetails.website },
              { key: "Phone Number", value: companyDetails.contact },
              { key: "Address", value: companyDetails.address },
            ].map(({ key, value }) => {
              return (
                <div key={key} className="flex justify-between p-[1rem] rounded-lg border-[#d3d3d3] border-solid border-[1px] hover:bg-[#d3d3d399]">
                  <h2>{key}</h2>
                  <h2>{value}</h2>
                </div>
              );
            })}
          </div>
          <h2 className="mt-[6rem] mb-[2rem] font-bold text-[2rem]">Services</h2>
          <div className="flex flex-col gap-4">
            {
              companyDetails?.services.split("\n").map((service)=>{
                return(
                  <div key={service} className="flex gap-4 items-center">
                    <div className="w-[10px] h-[10px] bg-[#78d240] rounded-[50%]"></div>
                    <p>{service}</p>
                  </div>
                )
              })
            }
          </div>
          <h2 className="mt-[6rem] mb-[2rem] font-bold text-[2rem]">
            Open Timings
          </h2>
          <div className="lg:w-[45%] flex flex-col gap-4">
            {openTimes.length>0 && openTimes.map(({day,time}) => {
              return (
                <div key={day} className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-[10px] h-[10px] bg-[#78d240] rounded-[50%]"></div>
                    <p>{day}</p>
                  </div>
                  <p>{time}</p>
                </div>
              );
            })}
          </div>
          <h2 className="mt-[6rem] mb-[2rem] font-bold text-[2rem]">Additional Information</h2>
          <h3 className="mb-[1rem] font-[600] text-[1.5rem]">Service Options</h3>
          <div className="flex flex-col gap-4">
            {
              companyDetails?.serviceOptions.split("\n").map((service)=>{
                return(
                  <div key={service} className="flex gap-4 items-center">
                    <div className="w-[10px] h-[10px] bg-[#78d240] rounded-[50%]"></div>
                    <p>{service}</p>
                  </div>
                )
              })
            }
          </div>
          <h3 className="mt-[2rem] mb-[1rem] font-[600] text-[1.5rem]">Amenities</h3>
          <div className="flex flex-col gap-4">
            {
              companyDetails?.amenities.split("\n").map((service)=>{
                return(
                  <div key={service} className="flex gap-4 items-center">
                    <div className="w-[10px] h-[10px] bg-[#78d240] rounded-[50%]"></div>
                    <p>{service}</p>
                  </div>
                )
              })
            }
          </div>
          {companies && (
            <>
              <h2 className="mt-[6rem] mb-[2rem] font-bold text-[2rem]">
                NearBy {companyDetails?.cityname}
              </h2>
              <div className="">
                <Slider {...settings}>
                  {companies.map(
                    ([name, review, rating, address, , category,,,,,image]) => {
                      let link = name?.replaceAll(" ", "_");
                      return (
                        <div key={name} className="overflow-hidden rounded-lg border-[#d3d3d3] border-solid border-[1px] max-w-[410px]">
                          <div className="w-[100%] overflow-hidden">
                            <Image
                              src={image}
                              width={500}
                              height={500}
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
                              <h2 className="font-[400]">Rating- {rating}</h2>
                              <h2 className="font-[400]">Reviews- {review}</h2>
                            </div>
                            <p className="text-[#757676] text-sm">{address}</p>
                            <Link
                              href={`/agency/${link}`}
                              className="mt-4 text-[#6950f3] font-bold"
                            >
                              See More....
                            </Link>
                          </div>
                        </div>
                      );
                    }
                  )}
                </Slider>
              </div>
            </>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default DynamicAgency;
