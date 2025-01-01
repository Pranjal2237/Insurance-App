
import { DynamicPage } from "@/components";

const page = async({ searchParams }) => {
  let values=await searchParams;
  let sheetId=values["sheetId"];
  return (
    <>
      <DynamicPage sheetId={sheetId} />
    </>
  );
};

export default page;


export function generateMetadata({params}){
  let title=params.id.replaceAll("-"," ");
  return{
    title:`Best ${title} in 2024`
  }
}