import App from "./App";
import { render } from "@testing-library/react";
import React from "react";

it("should render without crashing", () => {
  render(<App />);
});
