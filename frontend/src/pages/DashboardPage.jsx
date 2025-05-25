import React from "react";
import { useHasData } from "../hooks/useHasData";
import NoData from "../components/other/NoData";
import welcomeGirl from "../assets/footerImgGirl.svg";

export default function DashboardPage() {
  const { hasData } = useHasData();
  return (
    <div className="font-primary ">
      {!hasData && <NoData />}
      {hasData && (
        <div className="flex">
          {/* content 1  */}
          <div className="h-screen flex-1.5  p-7 flex flex-col gap-10">
            {/* welcoming */}
            <div className="flex justify-center  rounded-[10px]  h-100 mt-7 ">
              <div className="p-5 flex flex-col justify-center items-center">
                <h1 className="text-6xl font-bold ">Hello Admin!</h1>

                <h4 className="text-2xl">It's good to see you again.</h4>
              </div>

              <img src={welcomeGirl} className="h-100 relative " alt="" />
            </div>

            {/* metdata db */}
            <div
              className="flex flex-col gap-3 flex-1  
              "
            >
              {/* <h1 className='pl-2 text-2xl font-bold'
                  
                >Status</h1> */}
              <div
                className="border bg-[#ebebeb]  border-gray-300 flex-1 rounded-[10px]"
                style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
              ></div>
            </div>
          </div>

          {/* content 2 */}
          <div className="h-full flex-1 border m-8 ">sdadas</div>
        </div>
      )}
    </div>
  );
}
