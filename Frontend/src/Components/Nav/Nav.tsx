import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import "./nav.css";
import { A, useLocation } from "@solidjs/router";

const navItems = [
  {
    href: "/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M2.364 12.958c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093z" />
          <path
            stroke-linecap="round"
            d="M6 11.683c3.314-3.577 8.686-3.577 12 0M8 13.84c2.21-2.384 5.79-2.384 8 0M10 16c1.105-1.192 2.896-1.192 4 0"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "/setting",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353 1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008 1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z" />
        </g>
      </svg>
    ),
  },
  {
    href: "/analytics",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M2 10c0-3.771 0-5.657 1.172-6.828S6.229 2 10 2h4c3.771 0 5.657 0 6.828 1.172S22 6.229 22 10v1c0 2.828 0 4.243-.879 5.121C20.243 17 18.828 17 16 17H8c-2.828 0-4.243 0-5.121-.879C2 15.243 2 13.828 2 11z" />
          <path stroke-linecap="round" d="M16 22H8m4-5v5m10-9H2" />
        </g>
      </svg>
    ),
  },
];

export const Nav = () => {
  let navElementRefs: HTMLDivElement[] = [];
  const location = useLocation();

  const [topValue, setTopValue] = createSignal<number>(350);
  const [leftValue, setLeftValue] = createSignal<number>(0);

  // Function to update the position based on the currently active nav item.
  const updateNavPosition = () => {
    const index = navItems.findIndex(item => item.href === location.pathname);
    if (navElementRefs[index]) {
      const rect = navElementRefs[index].getBoundingClientRect();
      setTopValue(rect.top);
      setLeftValue(rect.left);
    }
  };

  // Update positions on mount and when the location changes.
  onMount(() => {
    updateNavPosition();
    // Listen for window resize events to update the position.
    window.addEventListener("resize", updateNavPosition);
  });

  // Clean up the resize event listener when the component is unmounted.
  onCleanup(() => {
    window.removeEventListener("resize", updateNavPosition);
  });

  // Also update whenever the location changes.
  createEffect(() => {
    updateNavPosition();
  });

  return (
    <div class="nav-bar">
      {navItems.map((item, index) => (
        <A
          href={item.href}
          class="nav-elements-a"
          // Use the signals by calling them.
          style={`--top:${topValue()}px; --left:${leftValue()}px`}
        >
          <div class="nav-elements">
            <div
              // Save the reference for later.
              ref={(el) => (navElementRefs[index] = el)}
              class={
                location.pathname === item.href
                  ? "nav-element-logo active2"
                  : "nav-element-logo"
              }
            >
              {item.svg}
            </div>
          </div>
        </A>
      ))}
    </div>
  );
};
