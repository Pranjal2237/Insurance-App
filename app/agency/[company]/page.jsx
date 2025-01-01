

import { DynamicAgency } from "@/components";


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

export function generateMetadata({params}){
  let title=params.company.replaceAll("-"," ");
  return{
    title:`${title} Reviews,Services,Address,Photos`
  }
}
