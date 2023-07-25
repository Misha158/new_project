import { screen, render } from "@testing-library/react";
import App from "./App";

describe("test", () => {
  it("Should find", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

  it("Should NOT find", () => {
    render(<App />);

    expect(screen.queryByText("Not find thing")).not.toBeInTheDocument();
  });
});
