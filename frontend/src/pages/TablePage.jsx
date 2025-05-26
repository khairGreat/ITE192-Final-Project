import React, { useState } from "react";
import CustomHeaderPage from "../components/other/CustomHeaderPage";
import AddTableBtn from "../components/buttons/AddTableBtn";
import TablesTable from "../components/other/TablesTable";
import { useHasData } from "../hooks/useHasData";
import NoData from "../components/other/NoData";
import FormAddTable from "../components/forms/FormAddTable";
import { useCreateTable} from "../hooks/useCreateTable"
import { useTables } from "../hooks/context/useTables";

export default function TablePage() {
  const { tables } = useTables(); // Get tables from context
  const {  addTable }  = useCreateTable();

  const { hasData } = useHasData(); // Change to true if there's data
  // Correct state syntax here
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to handle saving the new DB name from the form
  const handleSave = ( { tableName, selectedDb, saveBackup}) => {
    console.log("Save new DB:", selectedDb);
    addTable(selectedDb.db_name, tableName, saveBackup)
    setOpen(false); 
  };

  return (
    <>
      <div>
        <CustomHeaderPage pageTitle="Tables" />

        {!hasData && <NoData />}

        {hasData && (
          <div className="p-10 mx-2 flex flex-col gap-10">
            <div className="w-full">
              <AddTableBtn onClick={handleOpen} />
            </div>
            { tables.length > 0 ? (
              <TablesTable />
            ) : (
              <div className="mt-20 text-center text-gray-500">
                No tables available. Please add a table.
              </div>
            )

            }
          </div>
        )}
        <FormAddTable open={open} onClose={handleClose} onSave={handleSave} />
      </div>
    </>
  );
}
