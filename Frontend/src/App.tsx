import "./App.css";
import { Nav } from "./Components/Nav/Nav";

const App = (props: any) => {
  return (
    <>
        <div class="nav-conatainer">
          <Nav />
        </div>
        <div class="childrens-container">{props.children}</div>
    </>
  );
};

export default App;
