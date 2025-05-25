import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import SideBar from "../components/other/SideBar";
import { useSuccess } from "../hooks/context/useSuccess";
import Notification from "../components/other/Notification";


export default function Admin() {
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'success' });
  const { success, message, severity, setNotifData } = useSuccess();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotifData(prev => ({ ...prev, success: false }));
    setNotif({ ...notif, open: false });
  };

  useEffect(() => {
    if (success) {
      setNotif({
        open: true,
        message,
        severity,
      });
    }
  }, [success, message, severity]);

  return (
    <>
      <div className="flex min-h-screen ">
        <SideBar />
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>

      <Notification
        open={notif.open}
        message={notif.message}
        severity={notif.severity}
        onClose={handleClose}
      />
    </>
  );
}
