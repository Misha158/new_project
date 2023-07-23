import { screen, render } from "@testing-library/react";
import { Test } from "./Test";

describe("test", () => {
  it("Should find", () => {
    render(<Test />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
