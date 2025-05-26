import { useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useTables } from "../../hooks/context/useTables";
import BackupBtn from "../buttons/BackupBtn";
import { DropBtn } from "../buttons/DropBtn";
import { useCreateBackupTable } from "../../hooks/useCreateBackup";
import { useDropTable } from "../../hooks/useDrop";
import { useGetBackup } from "../../hooks/context/useGetBackup";
import { ConfirmDrop } from "../Modal/ConfirmDrop";

export default function TablesTable() {
  const { tables } = useTables();
  const { createBackupTable } = useCreateBackupTable();
  const { droptable } = useDropTable();
  const { backups } = useGetBackup();

  const [openConfirmDrop, setOpenConfirmDrop] = useState({
    open: false,
    dbName: "",
    tableName: "",
  });

  return (
    <>
      <ConfirmDrop
        open={openConfirmDrop.open}
        onClose={() =>
          setOpenConfirmDrop({ open: false, dbName: "", tableName: "" })
        }
        type="table"
        name={openConfirmDrop.tableName}
        onConfirm={() => {
          droptable(openConfirmDrop.dbName, openConfirmDrop.tableName);
          setOpenConfirmDrop({ open: false, dbName: "", tableName: "" });
        }}
      />
      <div className="text-center border-b">
        <div className="max-h-[450px] overflow-y-auto border border-gray-300">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0 z-50">
              <tr>
                <th className="border px-4 py-2">Database</th>
                <th className="border px-4 py-2">Table Name</th>
                <th className="border px-4 py-2">Size (MB)</th>
                <th className="border px-4 py-2">Rows</th>
                <th className="border px-4 py-2">Backup</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-6">{table.database_name}</td>
                  <td className="border px-4 py-6">{table.table_name}</td>
                  <td className="border px-4 py-6">{table.size_mb}</td>
                  <td className="border px-4 py-6">{table.table_rows}</td>
                  <td className="border px-4 py-6 text-center">
                    {backups.some((backup) =>
                      backup.file.includes(table.table_name)
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
                        backupFunc={() =>
                          createBackupTable(
                            table.database_name,
                            table.table_name
                          )
                        }
                      />
                      <DropBtn
                        dropDbFunc={() =>
                          setOpenConfirmDrop({
                            open: true,
                            dbName: table.database_name,
                            tableName: table.table_name,
                          })
                        }
                      />
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
