import { createSignal, onMount } from "solid-js";
import { DragLogo } from "../DragLogo/DragLogo";
import "./hostbar.css";
import { ComingIpData, Host, IPAddress, IPStore } from "../../lib/types";
import { internalStore,setInternalStore } from "../../pages/Hostnames/Hostnames";

export const Hostbar = (props: ComingIpData) => {
  const [editable, Seteditable] = createSignal(true);
  const [ip, setIp] = createSignal<string>("");
  const [Hostname, setHostname] = createSignal<string[]>([]);

  let IpRef: HTMLInputElement | undefined;
  if (props.isNew) {
    onMount(() => {
      if (IpRef) {
        IpRef.focus();
        IpRef.select();
      }
    });
  }

  const handleIpChange = (e: Event) => {
    setIp((e.target as HTMLInputElement).value);

  };

  const handleIpBlur = () => {
    if (ip()) {
      Seteditable(false);
      addHostName();
    }
  };

  
  const handleIpEnter = (e: KeyboardEvent) => {
    IpRef?.setCustomValidity("")
    const inputValue = IpRef?.value!
    const regexPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (e.key === "Enter") {

      if(regexPattern.test(inputValue)){
        console.log("Match");
      (
        
        IpRef?.parentElement?.nextElementSibling
          ?.children[0] as HTMLInputElement
      ).focus();
      (
        IpRef?.parentElement?.nextElementSibling
          ?.children[0] as HTMLInputElement
      ).select();
    }
      else{
        IpRef?.setCustomValidity("Please enter a valid IP address")
        console.log("No match pattern");
        
      }
    }
  };



  const sendHostbarData=(Event:KeyboardEvent,index:number)=>{
    if (Event.key === "Enter") {
      setInternalStore([...internalStore(),{ 
        id:index,
        ip:IpRef?.value as IPAddress, 
        hostname:[`${(IpRef?.parentElement?.nextElementSibling
          ?.children[0]as HTMLInputElement)?.value as Host}`]
      
    }as IPStore])
      
    }
  }

  const handleInputChange = (e: Event, index: number) => {
    const newHostname = [...Hostname()];
    newHostname[index] = (e.target as HTMLInputElement).value;
    setHostname(newHostname);
  };

  const addHostName = () => {
    if (Hostname().length < 3) {
      setHostname([...Hostname(), ""]);
      Seteditable(true);
    }
  };
  const hostnameBlurHandle = (index: number) => {
    if (Hostname()[index]) {
      Seteditable(false);
    }
  };

  const handleAddHostnameClick = () => {
    addHostName();
  };
  return (
    <>
      <div class="Bar-Container" draggable="true">
        <div class="drag-logo">
          <DragLogo />
        </div>
        <div class="ip-name">
          <input
            type="text"
            name="ip"
            onInput={handleIpChange}
            onkeypress={handleIpEnter}
            value={props.ip}
            ref={IpRef}
          />
        </div>
        <div class="hostnames">
          {props.hostname.map((hostname, index) => (
            <input
              type="text"
              value={hostname}
              onInput={(e) => handleInputChange(e, index)}
              onBlur={() => hostnameBlurHandle(index)}
              disabled={!editable}
              onkeypress={(e)=>sendHostbarData(e,props.index)}
            />
          ))}
        </div>
        {Hostname().length < 3 && (
          <button class="add-hostname" onClick={handleAddHostnameClick}>
            Add hostname
          </button>
        )}
      </div>
    </>
  );
};
