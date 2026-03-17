import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App";
import { isEnvBrowser } from "./utils/misc";
import { debugData } from "./utils/debugData";
import { theme } from "./theme";
import { MantineProvider } from "@mantine/core";


debugData([
  {
    action: "openCityHall",
    data: {
      jobs: [
        {
          id: "police",
          name: "Police",
          description: "Protect the city",
          image: ""
        }
      ]
    }
  },
]);

if (isEnvBrowser()) {
  const root = document.getElementById("root");

  root!.style.backgroundColor = "#2e2e2e";
  root!.style.backgroundSize = "cover";
  root!.style.backgroundRepeat = "no-repeat";
  root!.style.backgroundPosition = "center";
}

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <MantineProvider theme={{ ...theme }}>
      <App></App>
    </MantineProvider>
  </React.StrictMode>,
);
