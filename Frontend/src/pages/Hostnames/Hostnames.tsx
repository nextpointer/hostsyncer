import { Hostbar } from "../../Components/Hostbar/Hostbar";
import "./hostname.css";

import { IPAddress,Host, IPStore } from "../../lib/types";
import { createStore } from "solid-js/store";
import { Button } from "../../Components/Button/Button";

// create a global store for Ip address and hostname
export const [internalStore, setInternalStore] = createStore<IPStore[]>([]);
setInternalStore([
  {
    id: 1,
    ip: "192.168.1.1" as IPAddress,
    hostname: ["example.com", "localhost"] as Host[],
  },
  {
    id: 2,
    ip: "8.8.8.8" as IPAddress,
    hostname: ["dns.google", "google-public-dns-a.google.com"] as Host[],
  },
]);

// start the component
export const Hostnames = () => {
  const handleUpdateInternalStorage = () => {
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
      <h1>Hosts</h1>
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
