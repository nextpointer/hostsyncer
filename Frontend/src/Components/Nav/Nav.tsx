import "./nav.css";
import { A } from "@solidjs/router";

export const Nav = () => {
  return (
    <>
      <div class="nav-bar">
        <A href="/">
          <div class="nav-elements">
            <div class="nav-element-logo"></div>
          </div>
        </A>
        <A href="/setting">
          <div class="nav-elements">
            <div class="nav-element-logo"></div>
          </div>
        </A>
        <A href="/analytics">
          <div class="nav-elements">
            <div class="nav-element-logo"></div>
          </div>
        </A>
      </div>
    </>
  );
};
