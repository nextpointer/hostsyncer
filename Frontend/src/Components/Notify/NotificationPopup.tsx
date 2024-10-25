import { createSignal, onCleanup } from "solid-js";
import "./notificationPopup.css";

export const NotificationPopup = (props: { message: string, onClose: () => void }) => {
  const [visible, setVisible] = createSignal(true);

  // Automatically hide notification after 3 seconds
  const timer = setTimeout(() => {
    setVisible(false);
    props.onClose();
  }, 3000);

  onCleanup(() => clearTimeout(timer));

  return (
    <>
      {visible() && (
        <div class="notification-popup">
          <p>{props.message}</p>
          <button onClick={props.onClose}>✕</button>
        </div>
      )}
    </>
  );
};
