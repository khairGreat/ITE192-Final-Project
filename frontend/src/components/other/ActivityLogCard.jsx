import React from "react";
import CreateIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import RestoreIcon from "@mui/icons-material/Restore";
import BackupIcon from "@mui/icons-material/Backup";

export const ActivityLogCard = ({ operation, target }) => {
  // Normalize operation to lowercase for easier comparison
  const op = operation?.toLowerCase();

  // Choose icon and color based on operation
  const getIconAndColor = () => {
    switch (op) {
      case "create":
        return { icon: <CreateIcon sx={{ fontSize: 18, color: "green" }} /> };
      case "delete":
        return { icon: <DeleteIcon sx={{ fontSize: 18, color: "red" }} /> };
      case "restore":
        return { icon: <RestoreIcon sx={{ fontSize: 18, color: "blue" }} /> };
      case "backup":
        return { icon: <BackupIcon sx={{ fontSize: 18, color: "#8B5CF6" }} /> };
      default:
        return { icon: <></> };
    }
  };

  const { icon } = getIconAndColor();

  return (
    <div
      className="flex justify-between items-center space-x-4 p-3 rounded shadow-md bg-gray-100 text-black"
      style={{  }}
    >
     <div className="flex gap-2 ">
         <div className="">{icon}</div>
      <div className="font-primary font-semibold text-lg">{operation || "Unknown"}</div>
     </div>
      <div>
        <div className=" font-primary opacity-90">{target || "-"}</div>
      </div>
    </div>
  );
};
