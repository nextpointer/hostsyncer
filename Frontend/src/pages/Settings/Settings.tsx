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
  const handleAccessKey = () => {
    setKeyButtonClicked(true);
  };

  return (
    <>
      <div class="setting-header">
        <h1 class="setting-h1">Settings</h1>
      </div>
      {/* start the container */}
      <div class="setting-container">
        <h2>Basic Configuration</h2>
        {/* general config setting */}
        <div class="theme-config basic-config">
          <span>Theme</span>
          <select value={theme()} onChange={handleThemeChange}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </div>
        {/* port config */}
        <div class="port-config basic-config">
          <span>master-port</span>
          <input type="text" class="config-input port-input" value={"5432"} />
        </div>
        {/* ip config */}
        <div class="ip-config basic-config">
          <span>master-ip</span>
          <input type="text" class="config-input" value={"255.255.255.255"} />
        </div>
        {/* access key token config */}
        <div class="basic-config">
          <span>Master node API access key</span>
          <input
            class="setting-access-key-input config-input"
            value={"dffd-dnd54d-dd454d-dmjnn-22mddd"}
            type="text"
          />
        </div>
        {/* master node config */}
        <h2>Advance Configuration</h2>
        <div class="master-node-confirmation basic-config">
          <span>Use master node's config</span>
          <ToggleButton
            isToggle={IsMasterNodeConfig}
            handleToggle={handleToggle}
          />
        </div>
        {/* if master node is true show this containers */}
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
        </div>
      </div>
    </>
  );
};
