
import Banner from "@/components/banner";
import Loader from "@/components/loader";
import axios from "axios";
import React from "react";

const Home = async({searchParams}) => {
  let params=await searchParams
  let sheetId=params["sheetId"];
  return (
    <div>
    <Banner sheetId={sheetId} />
      <div className="padding-inline my-[6rem]">
        <Loader sheetId={sheetId} />
      </div>
    </div>
  );
};

export default Home;

export async function generateMetadata({searchParams}) {
  let params = await searchParams;
  let sheetId=params["sheetId"];
  let url=params["url"];
  let title = await axios.post(
    `http://${url}/api/configs`,
    { range: "Snapshot - Configs!Q:Q",
      sheetId
     }
  );
  title = title?.data?.slice(1)?.[0]?.[0];
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
