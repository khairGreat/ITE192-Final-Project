import { useState } from 'react'
import AddDatabaseBtn from '../components/buttons/AddDatabaseBtn'
import DatabaseTable from '../components/other/DatabaseTable'
import CustomHeaderPage from '../components/other/CustomHeaderPage'
import { useHasData } from '../hooks/useHasData'
import NoData from '../components/other/NoData'
import FormAddDb from '../components/forms/FormAddDb'

export default function DatabasePage() {
  const { hasData } = useHasData()
  
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
    <div>
      <CustomHeaderPage pageTitle="Databases" />

      {!hasData && <NoData />}

      {hasData && (
        <div className="p-10 mx-2 flex flex-col gap-10">
          <div className="w-full">
            {/* Pass open state and handlers to your button */}
            <AddDatabaseBtn onClick={handleOpen} />
          </div>

          <DatabaseTable />

          {/* Modal form for adding DB */}
          <FormAddDb open={open} onClose={handleClose} onSave={handleSave} />
        </div>
      )}
    </div>
  )
}
