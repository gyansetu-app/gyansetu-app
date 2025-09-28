import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // function to re-check connectivity
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // initial check (in case component mounts after load)
    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="relative top-0 left-0 w-full bg-(--chart-3) text-black text-center p-2 z-50">
      Internet not detected: Running in offline mode
    </div>
  );
}
