import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import { Confirm } from "./Confirm";
import userEvent from "@testing-library/user-event";

const props = {
  adNameLineItems: {
    1: {
      title: "t",
      id: 1,
      status: "t",
    },
  },
  closeModal: () => console.log("close modal func"),
};

jest.mock("axios");

describe("<Confirm />", () => {
  it("Should render without crashing", () => {
    render(<Confirm {...props} />);

    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("Should show loading spinner and success alert", async () => {
    const mockAxiosResponse = {
      data: [
        {
          title: 1,
          id: 1,
        },
      ],
    };

    (axios.post as jest.Mock).mockReturnValue(mockAxiosResponse);

    const mockOnCloseModal = jest.fn();

    render(<Confirm {...{ ...props, closeModal: mockOnCloseModal }} />);

    const submitButton = screen.getByRole("button", {
      name: /confirm/i,
    });

    fireEvent.click(submitButton);

    expect(await screen.findByTestId("antd-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("antd-spinner")).not.toBeInTheDocument();
    });

    expect(await screen.findByText("good")).toBeInTheDocument();

    // // should call on close modal
    expect(mockOnCloseModal).toHaveBeenCalledTimes(1);
  });

  it("Should show error", async () => {
    (axios.post as jest.Mock).mockRejectedValue("error");

    const mockOnCloseModal = jest.fn();

    render(<Confirm {...{ ...props, closeModal: mockOnCloseModal }} />);

    const submitButton = screen.getByRole("button", {
      name: /confirm/i,
    });

    await userEvent.click(submitButton);

    expect(await screen.findByText("Some error appear")).toBeInTheDocument();
  });
});
