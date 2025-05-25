

import React from 'react'
import { BackupMenuBtn } from '../buttons/BackupMenuBtn'
import { DatabaseMenuBtn } from '../buttons/DatabaseMenuBtn'
import { TableMenuBtn } from '../buttons/TableMenuBtn'
import { DashboardBtn } from '../buttons/DashboardBtn'
import { LoginMenuBtn } from '../buttons/LogoutMenuBtn'
import MyWebLogo from './MyWebLogo'

export default function SideBar() {
  return (
    <div className='flex flex-col bg-black w-[288px]  gap-9'>
      <div className='mt-2 flex items-center justify-center h-20'>
        <MyWebLogo/>
      </div>
      <DashboardBtn/>
      <BackupMenuBtn/>
      <DatabaseMenuBtn/> 
      <TableMenuBtn/>
      
      <div className='flex-grow' />
     
      <LoginMenuBtn  />
     

    </div>
  )
}
