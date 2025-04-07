import { Hostbar } from "../../Components/Hostbar/Hostbar";
import "./hostname.css";
import { IPAddress, Host, IPStore } from "../../lib/types";
import { Button } from "../../Components/Button/Button";
import {
  checkedItem,
  deleteButtonVisibile,
  internalStore,
  selectAll,
  setCheckedItem,
  setDeleteButtonVisible,
  setInternalStore,
  setSelectAll,
} from "../../Store/store";
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
      checked: false,
    };
    setInternalStore((prev) => [...prev, obj]);
  };
  // function for select all host
  const handleSelectAll = () => {
    setSelectAll(!selectAll());

    if (selectAll()) {
      setCheckedItem((prev) => {
        const newState = new Map(prev);
        newState.forEach((_, index) => {
          newState.set(index, true);
        });
        return newState;
      });
      setDeleteButtonVisible(true);
    } else {
      setCheckedItem((prev) => {
        const newState = new Map(prev);
        newState.forEach((_, index) => {
          newState.set(index, false);
        });
        return newState;
      });
      setDeleteButtonVisible(false);
    }
  };

  // function for deleting the host
  const handleDeleteHosts = () => {
    const indicesToDelete = Array.from(checkedItem().entries())
      .filter(([_, checked]) => checked)
      .map(([index]) => index);
    const updatedStore = internalStore.filter(
      (_, i) => !indicesToDelete.includes(i)
    );
    setInternalStore(updatedStore);
    setShowNotification("Selected Hostname Deleted");

    // set button is not visible
    setDeleteButtonVisible(false);
    // set SelectAll false
    setSelectAll(false);
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
      ></Button>
      {deleteButtonVisibile() && (
        <>
          <button onClick={handleDeleteHosts} id="ip-delete-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144M7 6v13z"
              />
            </svg>
          </button>
        </>
      )}
      <label class="delete-checkbox-container universal">
        <input
          type="checkbox"
          name=""
          class="delete-input-checkbox"
          checked={selectAll()}
          onchange={handleSelectAll}
        />
        <span class="checkmark"></span>
      </label>
      <div class="hostname-container">
        {/* Map the Hostbar component */}
        {internalStore.map((ipstore: IPStore, index) => {
          return (
            <Hostbar
              index={index}
              ip={ipstore.ip}
              hostname={ipstore.hostname}
              isNew={ipstore.isNew}
              checked={ipstore.checked}
            />
          );
        })}
      </div>
    </>
  );
};
