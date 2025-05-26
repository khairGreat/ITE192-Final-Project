import React from "react";

export const DbTotalCard = ( { Icon , name , length}) => {
  return (
    <>
      <div className="flex flex-col gap-6  p-5">
        <div className="flex items-center justify-center gap-2">
          <Icon/>
          <h1>{name}</h1>
        </div>
        <div className="font-bold text-7xl text-center text-black drop-shadow-[4px_4px_0px_rgba(160,160,160,0.7)]">
          {length}
        </div>
      </div>
    </>
  );
};
