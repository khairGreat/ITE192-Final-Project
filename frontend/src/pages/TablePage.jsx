import React, { useState } from 'react';
import CustomHeaderPage from '../components/other/CustomHeaderPage';
import AddTableBtn from '../components/buttons/AddTableBtn';
import TablesTable from '../components/other/TablesTable';

import { useHasData } from '../hooks/useHasData';
import NoData from '../components/other/NoData';
import FormAddTable  from '../components/forms/FormAddTable';

export default function TablePage() {
  
  const { hasData} = useHasData()// Change to true if there's data
    // Correct state syntax here
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to handle saving the new DB name from the form
  const handleSave = (dbname) => {
    console.log('Save new DB:', dbname);
    // TODO: call API or update state with the new DB here

    setOpen(false); // close modal after saving
  };

  return (
    <>
    <div>
      <CustomHeaderPage pageTitle="Tables" />

        {!hasData && (
                  <NoData/>
                   )}

      {hasData && (
        <div className="p-10 mx-2 flex flex-col gap-10">
          <div className="w-full">
          
            <AddTableBtn onClick={handleOpen} />
          </div>
          <TablesTable />
        </div>
      )}
       <FormAddTable 
      open={open}
      onClose={handleClose}
      onSave={handleSave}
    />
    </div>
    </>
  );
}
