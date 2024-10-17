import { createSignal, onMount } from "solid-js";
import { DragLogo } from "../DragLogo/DragLogo";
import "./hostbar.css";
// import all the predifined types
import { ComingIpData, Host, IPAddress, IPStore } from "../../lib/types";
// now import the internalStore State from HostName
import {
  internalStore,
  setInternalStore,
} from "../../pages/Hostnames/Hostnames";
import { Button } from "../Button/Button";

export const Hostbar = (props: ComingIpData) => {
  const [ip, setIp] = createSignal<string>(""); //for to set the ipaddress
  const [Hostname, setHostname] = createSignal<string[]>(props.hostname);
  const [editable, setEditable] = createSignal<boolean>(true);

  let IpRef: HTMLInputElement | undefined;
  let HostnameRef: HTMLInputElement[] | undefined = [];

  // if (props.isNew) {
  //   onMount(() => {
  //     if (IpRef) {
  //       console.log("render");
        
  //       IpRef.focus();
  //       IpRef.select();
  //     }
  //   });
  // }

  // this is the function for set the Ip from Input
  const handleIpChange = (e: Event) => {
    setIp((e.target as HTMLInputElement).value);
  };

  const handleIpBlur = () => {
    if (ip()) {
      addHostName();
    }
  };

  const handleIpEnter = (e: KeyboardEvent) => {
    IpRef?.setCustomValidity("");
    const inputValue = IpRef?.value!;
    const regexPattern =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (e.key === "Enter" && editable()) {
      if (regexPattern.test(inputValue)) {
        (
          IpRef?.parentElement?.nextElementSibling
            ?.children[0] as HTMLInputElement
        ).focus();
        (
          IpRef?.parentElement?.nextElementSibling
            ?.children[0] as HTMLInputElement
        ).select();
        setEditable(!editable);
      } else {
        IpRef?.setCustomValidity("Please enter a valid IP address");
        console.log("No match pattern");
      }
    }
  };

  const doubleClick = (e: MouseEvent) => {
    console.log(editable());
    if (e.detail === 2) {
      console.log("double");
      setEditable(!editable());
    }
  };
  const NoOutline = () => {
    if (IpRef) {
      IpRef.style.border = "none";
    }
  };

  const InputFocusOut = () => {
    setEditable(!editable);
  };

  const sendHostbarData = (Event: KeyboardEvent, index: number) => {
    if (Event.key === "Enter" && Hostname().length < 3) {
      const currentIpStore = internalStore()[index]; // Access the current IP store based on the index

      if (!currentIpStore) return;

      const updatedHostname = [
        ...Hostname(),
        `${
          (
            IpRef?.parentElement?.nextElementSibling
              ?.children[0] as HTMLInputElement
          )?.value as Host
        }`,
      ] as Host[];

      // Update the specific entry instead of adding a new one
      const updatedStore = internalStore().map((item, i) =>
        i === index ? { ...item, hostname: updatedHostname } : item
      );

      // No need to cast, just set the array of IPStore objects
      setInternalStore(updatedStore);
    }
  };

  const handleInputChange = (e: Event, index: number) => {
    const newHostname = [...Hostname()];
    newHostname[index] = (e.target as HTMLInputElement).value;
    setHostname(newHostname);
  };

  


  const addHostName = () => {
    if (Hostname().length < 3) {
      const updatedHostname = [...Hostname(), ""];
      setHostname(updatedHostname);
      updateParentHostnames(updatedHostname);
    }
  };

  const updateParentHostnames = (updatedHostname: string[]) => {
    const updatedStore = internalStore().map((item, i) =>
      i === props.index
        ? { ...item, hostname: updatedHostname as Host[] }
        : item
    );
    setInternalStore(updatedStore);
  };
  const hostnameBlurHandle = (index: number) => {
    if (Hostname()[index]) {
    }
  };

  const handleAddHostnameClick = () => {
    addHostName();
  };
  return (
    <>
      <div class="Bar-Container" draggable="true">
        {/* <div class="drag-logo">
          <DragLogo />
        </div> */}
        <div class="ip-name">
          <input
            type="text"
            name="ip"
            onInput={handleIpChange}
            onkeypress={(e: KeyboardEvent) => {
              handleIpEnter(e);
            }}
            value={props.ip}
            ref={IpRef}
            onclick={(e: MouseEvent) => doubleClick(e)}
            // onblur={InputFocusOut}
            readOnly={!editable()}
            onfocus={NoOutline}
          />
        </div>
        <div class="hostnames">
          {props.hostname.map((hostname, index) => (
            <input
              id="hostname-input"
              type="text"
              value={hostname}
              onInput={(e) => handleInputChange(e, index)}
              onBlur={() => hostnameBlurHandle(index)}
              onkeypress={(e) => sendHostbarData(e, index)}
              ref={(ref) => HostnameRef && (HostnameRef[index] = ref)}
            />
          ))}
        </div>
        {Hostname().length < 3 && (
          <button class="add-hostname" onClick={handleAddHostnameClick}>
            +
          </button>
        )}
      </div>
    </>
  );
};
