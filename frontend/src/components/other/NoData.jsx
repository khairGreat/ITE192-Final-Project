

import React from 'react'
import nodata from "../../assets/nodata.svg";

export default function NoData() {
  return (
    <div>
         <div className="flex justify-center items-center flex-col mt-10">
              <img src={nodata} alt="No data" className="w-100 h-100 opacity-70" />         
        </div>
    </div>
  )
}
