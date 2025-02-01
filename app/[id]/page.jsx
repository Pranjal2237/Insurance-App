
import { DynamicPage } from "@/components";
import axios from "axios";

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


export async function generateMetadata({params,searchParams}) {
  let paramsData = await searchParams;
  let sheetId=paramsData["sheetId"];
  let url=paramsData["url"];
  let title = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - Configs!O:O",
      sheetId
     }
  );
  title = title?.data?.slice(1)?.[0]?.[0];
  // let keyword = await axios.post(
  //   `http://${url}/api/configs`,
  //   { range: "Snapshot - Configs!K:K",
  //     sheetId
  //    }
  // );
  // keyword = keyword?.data?.slice(1)?.[1]?.[0];
  let city=params.id.replaceAll("-"," ");
  // keyword=keyword + " " + city;
  let date=new Date();
  const year=date.getFullYear();
  title=title.replaceAll("[keyword]",city)
  title=title.replaceAll("[current year]",year);
  let logo = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - Configs!C:C",
      sheetId
     }
  );
  logo = logo?.data?.slice(1)?.[0]?.[0];
  return {
    title: `${title}`,
    icons:{
      icon:logo
    }
  };
}
