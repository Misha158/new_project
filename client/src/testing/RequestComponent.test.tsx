import { screen, render } from "@testing-library/react";
import axios from "axios";
import { RequestComponent } from "./RequestComponent";

const mockAxiosResponse = {
  data: [
    {
      title: "test post",
      id: 1,
    },
  ],
};

jest.mock("axios");

(axios.get as jest.Mock).mockReturnValue(mockAxiosResponse);

describe("RequestComponent", () => {
  it("", async () => {
    render(<RequestComponent />);

    expect(await screen.findByText("test post")).toBeInTheDocument();
  });

  it("", async () => {
    const mockAxiosResponse = {
      data: [
        {
          title: "test post - 2",
          id: 1,
        },
      ],
    };

    (axios.get as jest.Mock).mockReturnValue(mockAxiosResponse);

    render(<RequestComponent />);

    expect(await screen.findByText("test post - 2")).toBeInTheDocument();
  });
});
