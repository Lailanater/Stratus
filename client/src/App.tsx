import React from "react";
import { Home } from "./Home";

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <div className="vh-100" style={{ backgroundColor: "#303030" }}>
      <Home />
    </div>
  );
};
