import { render } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("Should render without crashing", () => {
    render(<Counter />);
  });
});
