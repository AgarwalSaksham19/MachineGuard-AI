import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    async function checkStatus() {
      try {
        await API.get("/health");
        setBackendStatus("online");
      } catch (err) {
        setBackendStatus("offline");
      }
    }
    checkStatus();
    // Check backend status every 20 seconds
    const interval = setInterval(checkStatus, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3.5">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="MACHINEGUARD AI Logo"
            className="w-10 h-10 object-contain hover:rotate-12 transition-transform duration-300"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                MachinePulse
              </h1>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase">
                v1.0
              </span>
            </div>
            <p className="text-slate-500 text-xs hidden sm:block">
              Industrial Predictive Maintenance Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs font-semibold">
            {backendStatus === "online" ? (
              <span className="text-green-400 flex items-center gap-1">
                🟢 Backend Online
              </span>
            ) : backendStatus === "offline" ? (
              <span className="text-red-400 flex items-center gap-1">
                🔴 Backend Offline
              </span>
            ) : (
              <span className="text-yellow-500 flex items-center gap-1 animate-pulse">
                🟡 Checking API...
              </span>
            )}
          </div>

          <a 
            href="#predict"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300"
          >
            Diagnostics
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
