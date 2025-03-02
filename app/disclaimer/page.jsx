import AboutData from '@/components/about'
import axios from 'axios'
import React from 'react'

const page = async({searchParams}) => {
    let values=await searchParams;
  let sheetId=values["sheetId"];
  return (
    <div className="bg-[--btn-bg] padding-inline flex gap-8 py-20 flex-col lg:flex-row">
     <AboutData sheetId={sheetId}  heading="Disclaimer" range="Snapshot - Configs!I:I" />
    </div>
  )
}

export default page

export async function generateMetadata({searchParams}){
    let params = await searchParams;
    let sheetId=params["sheetId"];
    let url=params["url"];
    let logo = await axios.post(
      `http://${url}/api/configs`,
      { range: "Snapshot - Configs!C:C",
        sheetId
       }
    );
    logo = logo?.data?.slice(1)?.[0]?.[0];
    return{
      title:"disclaimer",
      icons:{
        icon:logo
      }
    }
  }