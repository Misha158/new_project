import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("Should render without crashing", () => {
    render(<Counter />);
    expect(screen.getByText("Decrement")).toBeInTheDocument();
  });

  it("Should FIND count", async () => {
    render(<Counter />);
    const incrementBtn = screen.getByText("Increment");

    await userEvent.click(incrementBtn);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});
