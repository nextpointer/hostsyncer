import { Hostbar } from "../../Components/Hostbar/Hostbar";
import "./hostname.css";

import { IPAddress, isValidIP, Host, IPStore } from "../../lib/types";
import { createSignal } from "solid-js";
import { Button } from "../../Components/Button/Button";

export const [internalStore, setInternalStore] = createSignal<IPStore[]>([]);
setInternalStore([
  // {
  //   id: 1,
  //   ip: "192.168.1.1" as IPAddress,
  //   hostname: ["example.com", "localhost"] as Host[],
  // },
  // {
  //   id: 2,
  //   ip: "8.8.8.8" as IPAddress,
  //   hostname: ["dns.google", "google-public-dns-a.google.com"] as Host[],
  // },
]);

// start the component 
export const Hostnames = () => {
  const handleUpdateInternalStorage = () => {
    const obj: IPStore = {
      id: internalStore().length + 1,
      ip: "0.0.0.0" as IPAddress,
      hostname: ["no-host"] as Host[],
      isNew: true,
    };
    console.log(...internalStore());
    
    // setInternalStore((prev) => [...prev, obj]);
    setInternalStore([...internalStore(),obj])
  };

  return (
    <>
      <h1>Hosts</h1>
      <Button label="Add new" onClick={handleUpdateInternalStorage} height="3rem" width="7rem" id="ip-add-btn"/>
      <div class="hostname-container">
        {internalStore().map((ipstore: IPStore, index) => {
          return (
            <Hostbar
              ip={ipstore.ip}
              hostname={ipstore.hostname}
              isNew={ipstore.isNew}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};
