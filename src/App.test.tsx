import { screen, render } from "@testing-library/react";
import App from "./App";

describe("test", () => {
  it("test", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
