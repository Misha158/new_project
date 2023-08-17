import { screen, render } from "@testing-library/react";
import { Counter } from "./Counter";
import userEvent from "@testing-library/user-event";

describe("Counter", () => {
  it("Should render without crashing", () => {
    render(<Counter />);
    expect(screen.getByText("Decrement")).toBeInTheDocument();
  });

  it("Should render without crashing", async () => {
    render(<Counter />);
    const incrementBtn = screen.getByText("Increment");

    await userEvent.click(incrementBtn);
    screen.logTestingPlaygroundURL();

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});
