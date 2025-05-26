import React, { useMemo } from 'react';
import { useGetBackup } from '../../hooks/context/useGetBackup';
import { useRestore } from '../../hooks/useRestore';
import { FormatDateTime } from '../../utils/FormatDateTime';
import RestoreBtn from '../buttons/RestoreBtn';

export default function BackupTable({ searchQuery }) {
  const { backups } = useGetBackup();
  const { restore } = useRestore();

  const filteredBackups = useMemo(() => {
    return backups.filter((b) =>
      b.file.split("\\").pop().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [backups, searchQuery]);

  return (
    <div className="max-h-[450px] overflow-y-auto border border-gray-300">
      <table className="w-full border-collapse border border-gray-300 z-50">
        <thead className="bg-gray-100 sticky top-0 z-50">
          <tr>
            <th className="border px-4 py-2">Backup File</th>
            <th className="border px-4 py-2">Size (MB)</th>
            <th className="border px-4 py-2">Created Date</th>
          
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBackups.length > 0 ? (
            filteredBackups.map((sql_file) => (
              <tr key={sql_file.id || sql_file.file} className="hover:bg-gray-50">
                <td className="border px-4 py-6 text-center">{sql_file.file.split("\\").pop()}</td>
                <td className="border px-4 py-6 text-center">{sql_file.size_mb}</td>
                <td className="border px-4 py-6 text-center">{FormatDateTime(sql_file.created)}</td>
               
                <td className="border px-4 py-6 text-center">
                  <RestoreBtn
                    restoreFunc={() => restore(sql_file.db_name, sql_file.file)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-500">
                No backups found for "{searchQuery}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
