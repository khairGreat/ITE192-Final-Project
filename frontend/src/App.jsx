import {} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DashboardPage,
  BackupPage,
  TablePage,
  DatabasePage,
  Admin,
  LoginPage,
} from "./pages/pageRegistry";
import { DatabaseProvider } from "./hooks/context/useDatabase";
import { TablesProvider } from "./hooks/context/useTables";
import { BackupProvider } from "./hooks/context/useGetBackup";
import { SuccessProvider } from "./hooks/context/useSuccess";
import { ServerStatusProvider } from "./hooks/context/useServerStatus";
function App() {
  return (
    <div className="">
      <DatabaseProvider>
        <TablesProvider>
          <BackupProvider>
            <SuccessProvider>
              <ServerStatusProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/admin" element={<Admin />}>
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="backup" element={<BackupPage />} />
                      <Route path="table" element={<TablePage />} />
                      <Route path="database" element={<DatabasePage />} />
                    </Route>
                  </Routes>
                </Router>
              </ServerStatusProvider>
            </SuccessProvider>
          </BackupProvider>
        </TablesProvider>
      </DatabaseProvider>
    </div>
  );
}

export default App;
