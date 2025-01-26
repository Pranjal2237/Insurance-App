import { Form } from "@/components";
import Description from "@/components/form/Description";
import axios from "axios";
import React from "react";

const Contact = async({searchParams}) => {
  let params=await searchParams
  let sheetId=params["sheetId"];
  return (
    <div className="padding-inline pt-[12rem] pb-[5rem] bg-[--btn-bg] grid grid-cols-1 overflow-hidden  sm:grid-cols-2">
      <Description sheetId={sheetId} />
      <Form />
    </div>
  );
};

export default Contact;

export async function generateMetadata({searchParams}){
  let params = await searchParams;
  let sheetId=params["sheetId"];
  let url=params["url"];
  let logo = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - Configs!B:B",
      sheetId
     }
  );
  logo = logo?.data?.slice(1)?.[0]?.[0];
  return{
    title:"contact us",
    icons:{
      icon:logo
    }
  }
}
