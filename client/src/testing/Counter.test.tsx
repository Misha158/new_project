import { screen, render } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("Should render without crashing", () => {
    render(<Counter />);
    expect(screen.getByText("Decrement")).toBeInTheDocument();
  });

  it("Should render without crashing", async () => {
    render(<Counter />);
    const incrementBtn = screen.getByText("Increment");

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});
