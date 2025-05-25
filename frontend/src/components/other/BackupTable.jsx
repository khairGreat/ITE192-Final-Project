import React from 'react'
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useGetBackup } from '../../hooks/context/useGetBackup';
import RestoreBtn from '../buttons/RestoreBtn';
import { useRestore } from '../../hooks/useRestore';

export default function BackupTable() {


 const { backups } = useGetBackup();
 const {  restore} = useRestore();

  return (
    
    <div>
         <div className="max-h-[450px] overflow-y-auto border border-gray-300 ">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100 sticky top-0 z-50">
                    <tr className=''>
                      <th className="border px-4 py-2 ">Backup Name</th>
                      <th className="border px-4 py-2">Size (MB)</th>
                      <th className="border px-4 py-2">Created Date</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map((sql_file) => (
                      <tr key={sql_file.id} className="hover:bg-gray-50">
                        <td className="border  px-4 py-6  text-center"> {sql_file.file.split("\\").pop()} </td>
                        <td className="border  px-4 py-6  text-center">{sql_file.size_mb}</td>
                        <td className="border  px-4 py-6  text-center">{sql_file.created}</td>
                        <td className="border  px-4 py-2  space-x-2 text-center">
                          <RestoreBtn restoreFunc={ ()=> restore(sql_file.db_name, sql_file.file)}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
      
    </div>
  )
}
