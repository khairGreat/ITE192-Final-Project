import { useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useDatabase } from "../../hooks/context/useDatabase";
import BackupBtn from "../buttons/BackupBtn";
import { DropBtn } from "../buttons/DropBtn";
import { useCreateBackupDb } from "../../hooks/useCreateBackup";
import { useDropDb } from "../../hooks/useDrop";
import { useGetBackup } from "../../hooks/context/useGetBackup";
import { ConfirmDrop } from "../Modal/ConfirmDrop";

export default function DatabaseTable() {
  
  const [openConfirmDrop, setOpenConfirmDrop] = useState({
    open: false,
    dbName: "",
  });
  const { databases } = useDatabase();
  const { createBackupDb } = useCreateBackupDb();
  const { dropDb } = useDropDb();
  const { backups } = useGetBackup();

  return (
    <>
      <ConfirmDrop
        open={openConfirmDrop.open}
        onClose={() => setOpenConfirmDrop( { open  : false , dbName : ""})}
        type="Database"
        name={openConfirmDrop.dbName}
        onConfirm={() => { dropDb(openConfirmDrop.dbName); setOpenConfirmDrop({ open: false, dbName: '' }); }}
      />
      <div className="text-center border-b">
        <div className="max-h-[450px] overflow-y-auto border border-gray-300">
          <table className="w-full border-collapse border border-gray-300 z-50">
            <thead className="bg-gray-100 sticky top-0 z-50">
              <tr>
                <th className="border px-4 py-2">Database Name</th>
                <th className="border px-4 py-2">Size (MB)</th>
                <th className="border px-4 py-2">Number of Tables</th>
                <th className="border px-4 py-2">Backup</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...databases].reverse().map((db) => (
                <tr key={db.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-6">{db.db_name}</td>
                  <td className="border px-4 py-6">{db.size_mb}</td>
                  <td className="border px-4 py-6">{db.table_count}</td>
                  <td className="border px-4 py-6">
                    {backups.some((backup) =>
                      backup.file.includes(db.db_name)
                    ) ? (
                      <CheckCircle
                        className="text-green-500"
                        titleAccess="Backed Up"
                      />
                    ) : (
                      <Cancel
                        className="text-red-500"
                        titleAccess="Not Backed Up"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      <BackupBtn
                        backupFunc={() => createBackupDb(db.db_name)}
                      />
                      <DropBtn dropDbFunc={() => setOpenConfirmDrop({ open : true , dbName : db.db_name})} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
