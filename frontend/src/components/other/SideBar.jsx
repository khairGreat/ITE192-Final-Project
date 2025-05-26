import React from "react";
import { BackupMenuBtn } from "../buttons/BackupMenuBtn";
import { DatabaseMenuBtn } from "../buttons/DatabaseMenuBtn";
import { TableMenuBtn } from "../buttons/TableMenuBtn";
import { DashboardBtn } from "../buttons/DashboardBtn";
import { LoginMenuBtn } from "../buttons/LogoutMenuBtn";
import MyWebLogo from "./MyWebLogo";

export default function SideBar() {
  return (
    <div className="flex flex-col bg-black w-[288px]  gap-15">
      <div className="mt-2 flex items-center justify-center h-20">
        <MyWebLogo />
      </div>
      <ul className="pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 flex flex-col gap-12">
        <li className="">
          <DashboardBtn />
        </li>
        <li>
          <BackupMenuBtn />
        </li>
        <li>
          <DatabaseMenuBtn />
        </li>
        <li>
          <TableMenuBtn />
        </li>
      </ul>

      <div className="flex-grow" />

      <LoginMenuBtn />
    </div>
  );
}
