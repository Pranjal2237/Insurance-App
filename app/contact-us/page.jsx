import { Form } from "@/components";
import {
  contactBackground,
  facebookBlue,
  message,
  phone,
  pinterestBlue,
  twitterBlue,
  youtubeBlue,
} from "@/public";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <div className="padding-inline pt-[12rem] pb-[5rem] bg-[--btn-bg] grid grid-cols-1 overflow-hidden  sm:grid-cols-2">
      <div className="flex flex-col gap-10 justify-between max-w-[100%] lg:max-w-[75%]">
        <div>
          <h2 className="text-l font-bold text-[--btn-color] mb-4">
            GET IN TOUCH
          </h2>
          <h1 className="text-4xl font-bold mb-8 sm:text-5xl">Contact</h1>
          <p className="mb-5 leading-8">
            Have questions? We’re here to help. Reach out today for personalized
            assistance and expert insurance advice.
          </p>
        </div>
        <div className="flex gap-8 flex-col items-center sm:flex-row">
          <div className="bg-white w-[50px] h-[50px] rounded-[50%] flex justify-center items-center">
            <Image src={message} />
          </div>
          <div>
            <h1 className="mb-2 uppercase text-center font-extrabold text-[14px] tracking-[2px] lg:text-base">
              Say Hi!
            </h1>
            <h1 className="mb-2  text-[14px] font-extrabold lg:text-[2rem]">
              contact@99insuranceage ncy.com
            </h1>
          </div>
        </div>
        <div className="flex gap-8 flex-col items-center sm:flex-row">
          <div className="bg-white w-[50px] h-[50px] rounded-[50%] flex justify-center items-center">
            <Image src={phone} />
          </div>
          <div>
            <h1 className="mb-2 uppercase text-center font-extrabold text-[14px] tracking-[2px] lg:text-base">
              Let’s Talk
            </h1>
            <h1 className="mb-2  text-[14px] font-extrabold lg:text-[2rem]">
              123 456 78 90
            </h1>
          </div>
        </div>
        <div className="flex gap-4 pb-20 flex-col  items-center sm:flex-row">
          <h2 className="mb-2 uppercase text-center font-extrabold text-[14px] tracking-[2px] sm:max-w-min text-base">
            stay connected
          </h2>
          <div className="flex gap-3">
            {[
              { blue: facebookBlue, white: facebookBlue },
              { blue: twitterBlue, white: twitterBlue },
              { blue: pinterestBlue, white: pinterestBlue },
              { blue: youtubeBlue, white: youtubeBlue },
            ].map(({ blue, white }) => {
              return (
                <div className="bg-white w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer">
                  <Image src={blue} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Form />
      {/* <Image src={contactBackground} alt='/' className='absolute right-10 top-0' /> */}
    </div>
  );
};

export default Contact;

export function generateMetadata({params}){
  return{
    title:"contact us"
  }
}
