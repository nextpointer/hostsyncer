import { Hostbar } from "../../Components/Hostbar/Hostbar";
import "./hostname.css";
import { IPAddress, Host, IPStore } from "../../lib/types";
import { Button } from "../../Components/Button/Button";
import { internalStore, setInternalStore } from "../../Store/store";
import { showNotification, setShowNotification } from "../../Store/store";
import { NotificationPopup } from "../../Components/Notify/NotificationPopup";
import { NotifyError } from "../../Store/store";

// start the component
export const Hostnames = () => {
  const handleUpdateInternalStorage = () => {
    setShowNotification("Host created");
    const obj: IPStore = {
      id: internalStore.length + 1,
      ip: "127.0.0.1" as IPAddress,
      hostname: ["localhost"] as Host[],
      isNew: true,
    };
    setInternalStore((prev) => [...prev, obj]);
  };

  return (
    <>
      {showNotification() && (
        <NotificationPopup
          message={showNotification()}
          onClose={() => setShowNotification("")}
          error={NotifyError()}
        />
      )}
      <div class="hostname-heading">
        <h1 id="host-h1">Hosts</h1>
      </div>
      <Button
        label="Add new"
        onClick={handleUpdateInternalStorage}
        height="3rem"
        width="7rem"
        id="ip-add-btn"
      />
      <div class="hostname-container">
        {/* Map the Hostbar component */}
        {internalStore.map((ipstore: IPStore, index) => {
          return (
            <Hostbar
              index={index}
              ip={ipstore.ip}
              hostname={ipstore.hostname}
              isNew={ipstore.isNew}
            />
          );
        })}
        
      </div>
    </>
  );
};
