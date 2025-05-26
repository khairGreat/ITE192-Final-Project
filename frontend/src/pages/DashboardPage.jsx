import React, { useState } from "react";
import { useHasData } from "../hooks/useHasData";
import NoData from "../components/other/NoData";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import IconButton from "@mui/material/IconButton";
import welcomeGirl from "../assets/footerImgGirl.svg";
import { SummaryBtn } from "../components/buttons/SummaryBtn";
import { useDatabase } from "../hooks/context/useDatabase";
import { useTables } from "../hooks/context/useTables";
import { useGetBackup } from "../hooks/context/useGetBackup";
import { LogTableModal } from "../components/Modal/LogTableModal";

import DnsIcon from "@mui/icons-material/Dns";
import TableChartIcon from "@mui/icons-material/TableChart";
import BackupIcon from "@mui/icons-material/Backup";
import { DbTotalCard } from "../components/other/DbTotalCard";
import StoragePieChart from "../components/other/StoragePieChart";
import { useGetLogs } from "../hooks/useGetLogs";
import { ActivityLogCard } from "../components/other/ActivityLogCard";

export default function DashboardPage() {
  const { hasData } = useHasData();
  const { databases } = useDatabase();
  const { tables } = useTables();
  const { backups } = useGetBackup();
  const { logs } = useGetLogs();
  const [open, setOpen] = useState(false);

  return (
    <>
      <LogTableModal open={open} onClose={() => setOpen(false)} logs={logs} />

      <div className="font-primary">
        {!hasData && <NoData />}
        {hasData && (
          <div className="flex flex-col lg:flex-row ">
            {/* Left content */}
            <div className="min-h-screen flex-1.5 p-5 flex flex-col gap-10">
              {/* Welcome Section */}
              <div className="flex flex-col lg:flex-row justify-between items-center rounded-[10px] bg-[#ebebeb] w-full p-6 min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh]">
                <div className="h-full flex flex-col justify-evenly lg:items-start text-center lg:text-left mb-6 lg:mb-0">
                  <SummaryBtn />
                  <div className="flex-1 pt-30">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                      Hello Admin!
                    </h1>
                    <h4 className="text-xl md:text-2xl">
                      It's good to see you again.
                    </h4>
                  </div>
                </div>
                <img
                  src={welcomeGirl}
                  className="w-48 md:w-64 lg:w-80 xl:w-100 max-h-[60vh] object-contain"
                  alt="Welcome"
                />
              </div>

              {/* Overview Section */}
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Databases */}
                <div
                  className="flex justify-center border border-gray-300 rounded-[10px] flex-1 p-4"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <DbTotalCard
                    Icon={DnsIcon}
                    name="databases"
                    length={databases.length}
                  />
                </div>

                {/* Tables */}
                <div
                  className="border border-gray-300 rounded-[10px] flex-1 p-4"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <DbTotalCard
                    Icon={TableChartIcon}
                    name="tables"
                    length={tables.length}
                  />
                </div>

                {/* Backups */}
                <div
                  className="border border-gray-300 rounded-[10px] flex-1 p-4"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <DbTotalCard
                    Icon={BackupIcon}
                    name="backups"
                    length={backups.length}
                  />
                </div>
              </div>
            </div>

            {/* right content */}
            <div className="min-h-screen py-5 pl-2 pr-5 flex flex-col justify-center gap-10 flex-1 ">
              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
                className=" flex-1 items-center rounded-[10px] bg-black "
              >
                <StoragePieChart />
              </div>

              <div
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
                className=" border-gray-300  flex-1 rounded-[10px]"
              >
                <div className=" flex justify-between p-2 bg-gray-200 ">
                  <div className="pt-2">
                    <AppsOutlinedIcon />{" "}
                    <span className=" font-bold text-[0.9rem] ">
                      Activity log
                    </span>
                  </div>
                  <div>
                    <IconButton
                      aria-label="Close activity log"
                      onClick={() => setOpen(true)} // Replace with your own function
                    >
                      <CloseFullscreenIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="flex flex-col  gap-2 py-3 px-5 space-y-2 max-h-[300px] overflow-y-auto">
                  {logs && logs.length > 0 ? (
                    logs
                      .slice(-4) // get last 4 logs (assuming logs are chronological, oldest to newest)
                      .reverse() // reverse to show newest first
                      .map((log, index) => (
                        <ActivityLogCard
                          key={index}
                          operation={log.module}
                          target={log.target}
                        />
                      ))
                  ) : (
                    <p className="text-center text-gray-500 p-4">
                      No activity logs found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
