import React from 'react'
import CustomHeaderPage from '../components/other/CustomHeaderPage'
import BackupTable from '../components/other/BackupTable'
import BackupSearchBtn from '../components/buttons/BackupSearchBtn'
import { useHasData } from '../hooks/useHasData';
import NoData from '../components/other/NoData';

export default function BackupPage() {

  const { hasData} = useHasData()

  return (
    <div className=''>        
         <CustomHeaderPage pageTitle="backups" />
          {!hasData && (
            <NoData/>
             )}
        {hasData && ( 
         <div className=" p-10 mx-2 flex flex-col gap-10">
          
          <div className="w-full">
         <BackupSearchBtn/>
          </div>
           <BackupTable/>
          </div>
        ) } 
        
        
    </div>
  )
}
