import React from 'react'

export default function CustomHeaderPage( { pageTitle } ) {
  return (
   <header className='flex flex-col gap-5  pt-5 bg-[#ebebeb]  '>
          <h1 className='text-4xl pl-5  uppercase font-bold '> {pageTitle} </h1>
          <div className='border-b'></div>
    </header>
  )
}
