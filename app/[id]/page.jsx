
import { DynamicPage } from "@/components";

const page = () => {
  return (
    <>
      <DynamicPage />
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