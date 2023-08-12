import { screen, render } from "@testing-library/react";
import { mockLineItems } from "../../../../mocks/lineItems";
import { LineItemsTable } from "./LineItemsTable";
import userEvent from "@testing-library/user-event";

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
1
    expect(rows).toHaveLength(5);
  });
  it("Should call axios on input type", async () => {});
  it("Should render default table", () => {});
  it("Should filter line items by input search", () => {});
  it("Should checked some line items by default", () => {});
  it("Should checked some line items by click on them", () => {});
});
