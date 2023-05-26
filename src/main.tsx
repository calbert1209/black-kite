import { render } from "preact";
import { App } from "./components/app.tsx";
import "./index.css";

render(<App />, document.getElementById("app") as HTMLElement);
