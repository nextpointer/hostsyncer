import { Hostbar } from "../../Components/Hostbar/Hostbar";
import "./hostname.css";

import {IPAddress,isValidIP,Host,IPStore} from "../../lib/types";
import { createSignal } from "solid-js"

export const [internalStore,setInternalStore] = createSignal<IPStore[]>([])
setInternalStore([
    {
      id: 1,
      ip: "192.168.1.1" as IPAddress,
      hostname: ["example.com", "localhost"] as Host[]
    },
    {
      id: 2,
      ip: "8.8.8.8" as IPAddress,
      hostname: ["dns.google", "google-public-dns-a.google.com"] as Host[]
    }
  ]);

export const Hostnames = () => {
  

    const handleUpdateInternalStorage = () =>{

      const obj:IPStore = {
        id:3,
        ip: "0.0.0.0" as IPAddress,
        hostname: ["no-host"] as Host[],
        isNew:true
      }
     
      
    }

    

  return (
    <>
      <h1>Hostnames</h1>
      <button class="ip-add-btn" onclick={handleUpdateInternalStorage}>Add New</button>
      <div class="hostname-container">
        {internalStore().map((ipstore:IPStore,index)=>{
             return <Hostbar ip={ipstore.ip} hostname={ipstore.hostname} isNew={ipstore.isNew} index={index}/>
        })}
        
      </div>
    </>
  );
};
