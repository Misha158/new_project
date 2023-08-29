import { screen, render, waitFor } from "@testing-library/react";
import { Select } from "./Select";
import userEvent from "@testing-library/user-event";

const mockOptions = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "tom",
    label: "Tom",
  },
];

const mockPromise = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOptions);
    }, 1000); // Задержка в 1 секунду
  });

describe("<Select />", () => {
  it("Should show loading when typing and call fetchFn", async () => {
    // I added promise and setTimeOut for see the loading after typing text
    const mockFetcher = jest.fn(mockPromise);
    render(<Select fetchFn={mockFetcher} placeholder="mock placeholder" />);

    expect(await screen.queryByText("Lucy")).not.toBeInTheDocument();
    expect(await screen.queryByText("Jack")).not.toBeInTheDocument();
    expect(await screen.queryByText("Tom")).not.toBeInTheDocument();

    const select = screen.getByRole("combobox");

    await userEvent.click(select);

    expect(await screen.findByText("Lucy")).toBeInTheDocument();
    expect(await screen.findByText("Jack")).toBeInTheDocument();
    expect(await screen.findByText("Tom")).toBeInTheDocument();

    await userEvent.type(select, "test text");

    expect(screen.getByDisplayValue("test text")).toBeInTheDocument();
    expect(await screen.findByTestId("antd-spinner")).toBeInTheDocument();
    expect(mockFetcher).toHaveBeenCalledWith("test text");
  });

  it("Should show selected option", async () => {
    const mockFetcher = jest.fn(mockPromise);
    const mockOnChange = jest.fn();
    render(<Select fetchFn={mockFetcher} placeholder="mock placeholder" onChange={mockOnChange} />);

    expect(await screen.queryByText("Lucy")).not.toBeInTheDocument();
    expect(await screen.queryByText("Jack")).not.toBeInTheDocument();
    expect(await screen.queryByText("Tom")).not.toBeInTheDocument();

    const select = screen.getByRole("combobox");

    await userEvent.click(select);

    expect(await screen.findByText("Lucy")).toBeInTheDocument();
    expect(await screen.findByText("Jack")).toBeInTheDocument();
    expect(await screen.findByText("Tom")).toBeInTheDocument();

    await userEvent.type(select, "Tom");

    expect(screen.getByDisplayValue("Tom")).toBeInTheDocument();

    await userEvent.click(await screen.findByText("Tom"));

    expect(mockOnChange).toHaveBeenCalledWith("tom");
  });
});
