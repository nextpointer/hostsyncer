import "./nav.css";
import { A,useLocation } from "@solidjs/router";

export const Nav = () => {
  const location = useLocation();
  return (
    <>
      <div class="nav-bar">
        <A href="/" class={location.pathname === "/" ? "nav-elements-a active" : "nav-elements-a"}>
          <div class="nav-elements">
            <div class="nav-element-logo">Δ</div>
          </div>
        </A>
        <A href="/setting" class={location.pathname === "/setting" ? "nav-elements-a active" : "nav-elements-a"}>
          <div class="nav-elements">
            <div class="nav-element-logo">⩙</div>
          </div>
        </A>
        <A href="/analytics" class={location.pathname === "/analytics" ? "nav-elements-a active" : "nav-elements-a"}>
          <div class="nav-elements">
            <div class="nav-element-logo">∷</div>
          </div>
        </A>
      </div>
    </>
  );
};
