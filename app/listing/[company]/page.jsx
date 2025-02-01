

import { DynamicAgency } from "@/components";
import axios from "axios";


const page = async({searchParams}) => {
  let values=await searchParams;
  let sheetId=values["sheetId"];
  return(
<>
    <DynamicAgency sheetId={sheetId} />
    </>
  );
};

export default page;

export async function generateMetadata({params,searchParams}){
  let paramsData = await searchParams;
  let sheetId=paramsData["sheetId"];
  let url=paramsData["url"];
  let title=params.company.replaceAll("-"," ");
  let date=new Date();
  const year=date.getFullYear();
  let logo = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - Configs!C:C",
      sheetId
     }
  );
  logo = logo?.data?.slice(1)?.[0]?.[0];
  return{
    title:`${title} Reviews,Services,Prices ${year}`,
    icons:{
      icon:logo
    }
  }
}
