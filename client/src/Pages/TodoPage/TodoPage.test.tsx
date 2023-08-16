import { screen, render } from "@testing-library/react";
import { TodoPage } from "./TodoPage";

describe("TodoPage", () => {
  it("Should test test", () => {
    render(<TodoPage />);
  });

  it("Should show cat text", () => {
    render(<TodoPage />);

    expect(screen.getByText("cat")).toBeInTheDocument();
  });
});
