import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockLineItems } from "../../../../mocks/lineItems";
import { LineItemsTable } from "./LineItemsTable";
import { axios } from "../../../../services/config";

jest.mock("../../../../services/config");

const mockProps = {
  lineItems: mockLineItems,
  rowLineItemSelection: {
    onChange: () => {},
    selectedRowKeys: [],
  },
  onLineItemRow: jest.fn(),
};

describe("LineItemsTable", () => {
  it("Should render without crashing", () => {
    render(<LineItemsTable {...mockProps} />);
  });

  it("Should show column headers", async () => {
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
    const { container } = render(<LineItemsTable {...mockProps} />);

    const rows = container.querySelectorAll(".ant-table-tbody  tr");

    expect(rows).toHaveLength(5);
  });

  it("Should call axios on input type and filter line items", async () => {
    const mockAxiosResponse = {
      data: [mockLineItems[0]],
    };

    (axios.get as jest.Mock).mockReturnValue(mockAxiosResponse);

    const { container } = render(<LineItemsTable {...mockProps} />);

    const inputSearch = screen.getByPlaceholderText("Search for Line items");
    await userEvent.type(inputSearch, "cat");

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/advertisement/lineItems?search=cat");
    });

    const rows = container.querySelectorAll(".ant-table-tbody  tr");

    expect(rows).toHaveLength(1);
  });

  it("Should checked some line items by click on them", async () => {
    const mockOnRowClick = jest.fn();

    const mockOnLineItemRow = () => ({
      onClick: mockOnRowClick,
    });

    const rowSelection = {
      onChange: () => {
        console.log("Test2");
      },
      selectedRowKeys: [],
    };

    const mockProps = { lineItems: mockLineItems, rowLineItemSelection: rowSelection, onLineItemRow: mockOnLineItemRow };
    const { container } = render(<LineItemsTable {...mockProps} />);

    const rows = container.querySelectorAll(".ant-table-tbody  tr");

    await userEvent.click(rows[0]);

    expect(mockOnRowClick).toHaveBeenCalledTimes(1);
  });
});
