// pages/BackupPage.jsx
import React, { useState, useMemo } from "react";
import CustomHeaderPage from "../components/other/CustomHeaderPage";
import BackupTable from "../components/other/BackupTable";
import BackupSearchBar from "../components/buttons/search/BackupSearchBtn";
import NoData from "../components/other/NoData";
import { useHasData } from "../hooks/useHasData";
import { useGetBackup } from "../hooks/context/useGetBackup";

export default function BackupPage() {
  const { backups } = useGetBackup();
  const { hasData } = useHasData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBackups = useMemo(() => {
    return backups.filter((b) =>
      b.file.split("\\").pop().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [backups, searchQuery]);

  const noMatch = searchQuery.length > 0 && filteredBackups.length === 0;

  return (
    <div>
      <CustomHeaderPage pageTitle="backups" />
      {!hasData && <NoData />}
      {hasData && (
        <div className="p-10 mx-2 flex flex-col gap-10">
          <div className="w-full">
            <BackupSearchBar
              query={searchQuery}
              setQuery={setSearchQuery}
              noMatch={noMatch}
            />
          </div>
          {backups.length > 0 ? (
            <BackupTable searchQuery={searchQuery} />
          ) : (
            <div className="mt-20 text-center text-gray-500">
              No backups available. Please create a backup.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
