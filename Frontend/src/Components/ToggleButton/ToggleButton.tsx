import { Accessor } from "solid-js";
import "./ToggleButton.css";

// types of toggle button props
interface ToggleProps {
  isToggle: Accessor<boolean>;
  handleToggle: () => void;
}

export const ToggleButton = (props: ToggleProps) => {
  return (
    <button
      class={`toggle-btn ${props.isToggle() ? "active" : ""}`}
      onclick={props.handleToggle}
    >
      <div class="circle"></div>
    </button>
  );
};
