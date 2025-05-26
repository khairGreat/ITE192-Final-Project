import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormatDateTime } from "../../utils/FormatDateTime";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
  },
  mainHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  summaryLine: {
    fontSize: 11,
    color: "#444",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    borderBottomStyle: "solid",
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    borderBottomStyle: "solid",
    paddingVertical: 2,
  },
  tableCell: {
    flex: 1,
    paddingRight: 6,
  },
  smallCell: {
    flex: 0.6,
  },
  label: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    color: "gray",
    textAlign: "center",
  },
});

export const SummaryReport = ({ databases, tables, backups, serverStatus }) => {
  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hrs}h ${mins}m`;
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Report Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.mainHeader}>Database Server Summary Report</Text>
          <Text style={styles.summaryLine}>
            {`Databases: ${databases.length} | Tables: ${tables.length} | Backups: ${backups.length}`}
          </Text>
        </View>

        {/* Server Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Server Status</Text>
          <Text>DBMS: {serverStatus.dbms}</Text>
          <Text>Host: {serverStatus.host}</Text>
          <Text>Environment: {serverStatus.environment}</Text>
          <Text>Operating System: {serverStatus.os}</Text>
          <Text>Machine: {serverStatus.machine}</Text>
          <Text>IP Address: {serverStatus.ip_address}</Text>
          <Text>Uptime: {formatUptime(serverStatus.uptime_seconds)}</Text>
          <Text>
            Total Database Size: {serverStatus.total_database_size_mb} MB
          </Text>
          <Text>
            Storage — Total: {serverStatus.storage.total_gb} GB | Used:{" "}
            {serverStatus.storage.used_gb} GB | Free:{" "}
            {serverStatus.storage.free_gb} GB
          </Text>
        </View>

        {/* Databases Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Databases ({databases.length})
          </Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Database Name</Text>
            <Text style={styles.smallCell}>Tables</Text>
            <Text style={styles.smallCell}>Size (MB)</Text>
            <Text style={styles.tableCell}>creation_date</Text>
          </View>
          {databases.map((db, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{db.db_name}</Text>
              <Text style={styles.smallCell}>{db.table_count}</Text>
              <Text style={styles.smallCell}>{db.size_mb}</Text>
              <Text style={styles.tableCell}>
                {FormatDateTime(db.creation_date)}
              </Text>
            </View>
          ))}
        </View>

        {/* Tables Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tables ({tables.length})</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Database</Text>
            <Text style={styles.tableCell}>Table Name</Text>
            <Text style={styles.smallCell}>Size (MB)</Text>
            <Text style={styles.smallCell}>Rows</Text>
          </View>
          {tables.map((table, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{table.database_name}</Text>
              <Text style={styles.tableCell}>{table.table_name}</Text>
              <Text style={styles.smallCell}>{table.size_mb}</Text>
              <Text style={styles.smallCell}>{table.table_rows}</Text>
            </View>
          ))}
        </View>

        {/* Backups Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backups ({backups.length})</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Database</Text>
            <Text style={styles.tableCell}>Backup File Path</Text>
            <Text style={styles.smallCell}>Size (MB)</Text>
            <Text style={styles.tableCell}>Created</Text>
          </View>
          {backups.map((backup, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{backup.db_name}</Text>
              <Text style={styles.tableCell} wrap>
                {backup.file}
              </Text>
              <Text style={styles.smallCell}>{backup.size_mb}</Text>
              <Text style={styles.tableCell}>
                {FormatDateTime(backup.created)}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by Database Admin Dashboard – {new Date().toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
};
