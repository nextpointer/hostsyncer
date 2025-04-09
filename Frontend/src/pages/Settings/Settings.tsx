import { ToggleButton } from "../../Components/ToggleButton/ToggleButton";
import {
  isKeyButtonClicked,
  IsMasterNodeConfig,
  setKeyButtonClicked,
  setMasterNodeConfig,
  setTheme,
  theme,
} from "../../Store/store";
import "./Settings.css";

export const Settings = () => {
  // handler for toggle button
  const handleToggle = () => {
    setMasterNodeConfig(!IsMasterNodeConfig());
  };
  // handler for theme change
  const handleThemeChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setTheme(target.value);
  };
  // handle and edit access key
  const handleAccessKey = ()=>{
    setKeyButtonClicked(true);
  }

  return (
    <>
      <div class="setting-header">
        <h1 class="setting-h1">Settings</h1>
      </div>
      <div class="setting-container">
        <div class="theme-config basic-config">
          <span>Theme</span>
          <select value={theme()} onChange={handleThemeChange}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </div>
        <div class="master-node-confirmation basic-config">
          <span>Use master node's config</span>
          <ToggleButton
            isToggle={IsMasterNodeConfig}
            handleToggle={handleToggle}
          />
        </div>
        <div
          class={`if-master-true ${
            !IsMasterNodeConfig() ? "opacity-down" : ""
          }`}
        >
          <div class="basic-config">
            <span>Hostmapping refresh interval</span>
            <div class="setting-interval-container basic-config-container">
              <input
                type="text"
                class="setting-interval-input config-input"
                disabled={!IsMasterNodeConfig()}
                value={"5000"}
              />
              <span>ms</span>
            </div>
          </div>
          <div class="basic-config">
            <span>Master node API access key</span>
            <div class={`setting-access-key-container basic-config-container ${isKeyButtonClicked()?"key-transition":""}`} onfocusout={()=>setKeyButtonClicked(false)}>
              <textarea
                class="setting-access-key-input config-input"
                value={"xxxx"}
                disabled={!IsMasterNodeConfig()}
              />
              <button disabled={!IsMasterNodeConfig()} onclick={handleAccessKey}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="black" stroke-width="1.5">
                    <path d="m15.287 3.152l-.927.927l-8.521 8.52c-.577.578-.866.867-1.114 1.185a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.094 3.281l-.268.802a1.06 1.06 0 0 0 1.342 1.342l.802-.268l3.281-1.094c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114l8.521-8.521l.927-.927a3.932 3.932 0 0 0-5.561-5.561Z" />
                    <path
                      d="M14.36 4.078s.116 1.97 1.854 3.708s3.707 1.853 3.707 1.853M4.198 21.678l-1.876-1.876"
                      opacity="0.5"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
