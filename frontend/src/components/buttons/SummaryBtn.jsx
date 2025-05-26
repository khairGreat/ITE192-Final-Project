// SummaryBtn.jsx
import React from "react";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SummaryReport } from "../other/SummaryReport";

import { useDatabase } from "../../hooks/context/useDatabase";
import { useGetBackup } from "../../hooks/context/useGetBackup";
import { useTables } from "../../hooks/context/useTables";
import { useServerStatus } from "../../hooks/context/useServerStatus";

export const SummaryBtn = () => {
  const { databases } = useDatabase();
  const { tables } = useTables();
  const { backups } = useGetBackup();
  const { serverStatus } = useServerStatus();

  return (
    <PDFDownloadLink
      document={
        <SummaryReport
          databases={databases}
          tables={tables}
          backups={backups}
          serverStatus={serverStatus}
        />
      }
      fileName="db-summary-report.pdf"
      style={{ textDecoration: "none" }}
    >
      {() => (
        <Button
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: "12px",
            padding: "12px 24px",
            fontWeight: 600,
            textTransform: "uppercase",
            fontFamily: "var(--font-primary), sans-serif",
            boxShadow: "0px 8px 0px rgba(0, 0, 0, 0.7)",
            transform: "translateY(-2px)",
            transition: "all 120ms ease",
            "&:hover": {
              bgcolor: "#1a1a1a",
              boxShadow: "0px 4px 0px rgba(0, 0, 0, 0.5)",
              transform: "translateY(0)",
            },
            "&:active": {
              bgcolor: "#111",
              boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.3)",
              transform: "translateY(1px)",
            },
          }}
          variant="contained"
          startIcon={<DescriptionIcon />}
        >
          { "Summary Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
