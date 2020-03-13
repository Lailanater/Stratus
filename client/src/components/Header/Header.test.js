import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./index";

it("should render the title with Stratus", () => {
  const { findByText } = render(<Header />);
  findByText("Stratus");
});
