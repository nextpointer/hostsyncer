import { createSignal, onMount } from "solid-js";
import "./hostbar.css";
import { ComingIpData, Host, IPAddress } from "../../lib/types";
import { internalStore, setInternalStore } from "../../Store/store";
import { setNotifyError } from "../../Store/store";
import { setShowNotification } from "../../Store/store";

export const Hostbar = (props: ComingIpData) => {
  // create a state for ip that is init by prop.ip
  const [ip, setIp] = createSignal<string>(props.ip);
  // create a state for hostname that is init by prop.hostname
  const [hostnameList, setHostnameList] = createSignal<string[]>(
    props.hostname
  );
  // state for hostname input
  const [hostnameInput, setHostnameInput] = createSignal<string>("");
  // state for editing or not
  const [editable, setEditable] = createSignal<boolean>(props.isNew || false);
  // state for which hostname we have to update
  const [editingHostnameIndex, setEditingHostnameIndex] = createSignal<
    number | null
  >(null);
  // state for is it a new host?
  const [isNewEntry, setIsNewEntry] = createSignal<boolean>(
    props.isNew || false
  );
  // reference of the ip section
  let IpRef: HTMLInputElement | undefined;
  // when the screen first time mount this things will execute
  onMount(() => {
    if (IpRef && isNewEntry()) {
      IpRef.focus();
      IpRef.select();
      setIsNewEntry(false);
    }
  });

  

  // this is the function for set the Ip from Input
  const handleIpChange = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setIp(inputValue);
    // the input follow this regex
    const regexPattern =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    // error handling for ip
    if (!regexPattern.test(inputValue)) {
      IpRef?.setCustomValidity("Please enter a valid IP address");
    } else {
      IpRef?.setCustomValidity(""); // Clear the error once valid
    }
  };

  // Commit IP change on Enter and move to hostname input
  const handleIpEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && editable()) {
      const validIp = ip();
      if (!IpRef?.checkValidity()) return; // Don't update if invalid IP

      // Update global store with the new IP
      setInternalStore(props.index, "ip", validIp as IPAddress);
      setEditable(false); // Lock editing
      setShowNotification("IP Updated!"); // Show notification

      setEditingHostnameIndex(0);
      // Focus the next input (hostname)
      IpRef?.parentElement?.nextElementSibling?.querySelector("input")?.focus();
    }
  };

  // Toggle editable state on double-click
  const toggleEditable = () => setEditable(!editable());

  const lengthCheck = (hostnamelist: string[]) => {
    let totalstring: string = hostnamelist.join("") + hostnameInput();
    if (totalstring.length < 30) {
      return true;
    }
    setNotifyError(true);
    setShowNotification("Hostname character length should be less than 90");
    setNotifyError(false);
    return false;
  };

  // Handle hostname input and update store
  const handleHostnameInput = (e: KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      hostnameInput() &&
      hostnameList().length < 3 &&
      lengthCheck(hostnameList())
    ) {
      const newHostnames = [...hostnameList(), hostnameInput()];

      // Update global store and local state
      setInternalStore(props.index, "hostname", newHostnames as Host[]);
      setHostnameList(newHostnames);
      setHostnameInput(""); // Clear input after adding hostname
      setShowNotification("Hostname Added!"); // Show notification
    }
  };

  // Handle real-time hostname input change
  const handleHostnameChange = (e: Event) => {
    setHostnameInput((e.target as HTMLInputElement).value);
  };

  // Delete a specific hostname, but ensure at least one remains
  const handleDeleteHostname = (index: number) => {
    if (hostnameList().length > 1) {
      const updatedHostnames = hostnameList().filter((_, i) => i !== index);
      setHostnameList(updatedHostnames);
      setInternalStore(props.index, "hostname", updatedHostnames as Host[]);
      setShowNotification("Hostname Deleted!"); // Show notification
    } else {
      setShowNotification("Cannot delete the last hostname!"); // Ensure at least one hostname
    }
  };

  // Enable editing for a specific hostname
  const enableEditHostname = (index: number) => {
    setEditingHostnameIndex(index);
    setHostnameInput(hostnameList()[index]);
  };

  // Commit hostname edit on Enter
  const handleHostnameEdit = (e: KeyboardEvent, index: number) => {
    if (e.key === "Enter" && hostnameInput()) {
      const updatedHostnames = hostnameList().map((host, i) =>
        i === index ? hostnameInput() : host
      );

      setHostnameList(updatedHostnames);
      setInternalStore(props.index, "hostname", updatedHostnames as Host[]);
      setEditingHostnameIndex(null);
      setHostnameInput("");
      setShowNotification("Hostname Updated!"); // Show notification
    }
  };

  // Delete the entire Hostbar
  const handleDeleteHostbar = () => {
    const updatedStore = internalStore.filter((_, i) => i !== props.index);
    setInternalStore(updatedStore);
    setShowNotification("Hostname deleted!");
  };

  return (
    <div class="Bar-Container">
      <div class="ip-name">
        <input
          type="text"
          value={ip()}
          ref={(el) => (IpRef = el)}
          onInput={handleIpChange}
          onKeyDown={handleIpEnter} // Use onKeyDown for consistent Enter handling
          ondblclick={toggleEditable}
          readOnly={!editable()}
          onfocus={() => (IpRef!.style.border = "none")} // Remove focus outline
        />
      </div>

      <div class="hostnames">
        <ul class="hostname-list">
          {hostnameList().map((hostname, index) => (
            <li class="hostname-item">
              {editingHostnameIndex() === index ? (
                <input
                  class="temp-hostname-input"
                  type="text"
                  value={hostnameInput()}
                  onInput={handleHostnameChange}
                  onKeyDown={(e) => handleHostnameEdit(e, index)}
                />
              ) : (
                <span onClick={() => enableEditHostname(index)}>
                  {hostname}
                </span>
              )}
              {hostnameList().length > 1 && ( // Show delete button only if more than 1 hostname
                <button
                  class="delete-hostname-btn"
                  onClick={() => handleDeleteHostname(index)}
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>

        {hostnameList().length < 3 && (
          <input
            type="text"
            class="hostname-input"
            value={hostnameInput()}
            onInput={handleHostnameChange}
            onKeyDown={handleHostnameInput}
          />
        )}
      </div>

      <button class="delete-hostbar-btn" onClick={handleDeleteHostbar}>
        Delete Host
      </button>
    </div>
  );
};
