import { useEffect, useState } from "react";
import CityHall from "./components/cityhall";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { fetchNui } from "./utils/fetchNui";

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useNuiEvent("openCityHall", () => {
    setVisible(true);
  });

  useNuiEvent("closeCityHall", () => {
    setVisible(false);
  });

  useEffect(() => {
    if (!visible) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        fetchNui("closeCityHall");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [visible]);

  return <CityHall visible={visible} setVisible={setVisible} />;
};

export default App;