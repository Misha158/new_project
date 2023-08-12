import { screen, render, waitFor } from "@testing-library/react";
import { mockLineItems } from "../../../../mocks/lineItems";
import { LineItemsTable } from "./LineItemsTable";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");

describe("LineItemsTable", () => {
  it("Should render without crashing", () => {
    const mockProps = { lineItems: mockLineItems, rowLineItemSelection: jest.fn(), onLineItemRow: jest.fn() };
    render(<LineItemsTable {...mockProps} />);
  });

  it("Should show column headers", async () => {
    const mockProps = { lineItems: mockLineItems, rowLineItemSelection: jest.fn(), onLineItemRow: jest.fn() };
    render(<LineItemsTable {...mockProps} />);

    const titleHeader = screen.getByRole("columnheader", {
      name: /title/i,
    });

    const statusHeader = screen.getByRole("columnheader", {
      name: /status/i,
    });

    expect(titleHeader).toBeInTheDocument();
    expect(statusHeader).toBeInTheDocument();
  });

  it("Should show line items in table", async () => {
    const mockProps = { lineItems: mockLineItems, rowLineItemSelection: jest.fn(), onLineItemRow: jest.fn() };
    const { container } = render(<LineItemsTable {...mockProps} />);

    const rows = container.querySelectorAll(".ant-table-tbody  tr");

    expect(rows).toHaveLength(5);
  });

  it("Should call axios on input type", async () => {
    const mockAxiosResponse = {
      data: [mockLineItems[0]],
    };

    (axios.get as jest.Mock).mockReturnValue(mockAxiosResponse);

    const mockProps = { lineItems: mockLineItems, rowLineItemSelection: jest.fn(), onLineItemRow: jest.fn() };
    render(<LineItemsTable {...mockProps} />);

    const inputSearch = screen.getByPlaceholderText("Search for Line items");
    await userEvent.type(inputSearch, "cat");

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/advertisement/lineItems?search=cat");
    });
  });
  it("Should render default table", () => {});
  it("Should filter line items by input search", () => {});
  it("Should checked some line items by default", () => {});
  it("Should checked some line items by click on them", () => {});
});
