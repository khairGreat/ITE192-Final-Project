import { useState } from "react";
import AddDatabaseBtn from "../components/buttons/AddDatabaseBtn";
import DatabaseTable from "../components/other/DatabaseTable";
import CustomHeaderPage from "../components/other/CustomHeaderPage";
import { useHasData } from "../hooks/useHasData";
import NoData from "../components/other/NoData";
import FormAddDb from "../components/forms/FormAddDb";
import { useCreateDb } from "../hooks/useCreateDb";
import { useDatabase } from "../hooks/context/useDatabase";

export default function DatabasePage() {
  const { hasData } = useHasData();
  const { addDb } = useCreateDb();
  const { databases } = useDatabase(); // Get databases from context

  // Correct state syntax here
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to handle saving the new DB name from the form
  const handleSave = async ({ dbname, saveBackup }) => {
    await addDb(dbname, saveBackup); // call your hook function to create the DB

    setOpen(false);
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
          {databases.length > 0 ? (
            <DatabaseTable />
          ) : (
            <div className="mt-20 text-center text-gray-500">
              No Databases available. Please add a database.
            </div>
          )}

          {/* Modal form for adding DB */}
          <FormAddDb open={open} onClose={handleClose} onSave={handleSave} />
        </div>
      )}
    </div>
  );
}
