

import { DynamicAgency } from "@/components";


const page = () => {
  return(
<>
    <DynamicAgency />
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
