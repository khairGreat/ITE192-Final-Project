import { } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, BackupPage, TablePage, DatabasePage, Admin } from './pages/pageRegistry';
import { DatabaseProvider } from './hooks/context/useDatabase'; // ✅ import the provider
import { TablesProvider } from './hooks/context/useTables';
import { BackupProvider } from './hooks/context/useGetBackup';
import { SuccessProvider } from './hooks/context/useSuccess';


function App() {
  return (
    <div className="">
      <DatabaseProvider> 
        <TablesProvider>
        <BackupProvider>  
        <SuccessProvider>

          <Router>
            <Routes>
              <Route path='/admin' element={<Admin />}>
                <Route path='dashboard' element={<DashboardPage />} />
                <Route path='backup' element={<BackupPage />} />
                <Route path='table' element={<TablePage />} />
                <Route path='database' element={<DatabasePage />} />
              </Route>
            </Routes>
          </Router>
        </SuccessProvider>
          
        </BackupProvider>
        </TablesProvider>
      </DatabaseProvider>
    </div>
  );
}

export default App;
