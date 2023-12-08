import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
// import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HomeLayout } from "layouts/home/index old";
import { Theme } from "@radix-ui/themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
    {/* <HomeLayout /> */}
    {/* <Analytics /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
