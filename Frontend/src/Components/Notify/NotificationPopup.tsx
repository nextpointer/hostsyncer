import { createSignal, onCleanup } from "solid-js";
import "./notificationPopup.css";

export const NotificationPopup = (props: {
  message: string;
  onClose: () => void;
  error: boolean;
}) => {
  const [visible, setVisible] = createSignal(true);

  // Automatically hide notification after 3 seconds
  const timer = setTimeout(() => {
    setVisible(false);
    props.onClose();
  }, 3000);

  onCleanup(() => clearTimeout(timer));

  const style = {
    "background-color": props.error ? "red" : "#2c974e",
  };
  console.log(style);

  return (
    <>
      {visible() && (
        <div class="notification-popup" style={style}>
          <p>{props.message}</p>
          <button onClick={props.onClose}>✕</button>
        </div>
      )}
    </>
  );
};
