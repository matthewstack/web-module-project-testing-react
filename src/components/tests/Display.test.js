import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchShow from "../../api/fetchShow";
import Display from "./../Display";

jest.mock("../../api/fetchShow");

const tvSeries = {
  name: "Stranger Things",
  summary: "This is a test summary",
  seasons: [
    {
      id: "1",
      name: "Season 1",
      episodes: [],
    },
    {
      id: "2",
      name: "Season 2",
      episodes: [],
    },
    {
      id: "3",
      name: "Season 3",
      episodes: [],
    },
    {
      id: "4",
      name: "Season 4",
      episodes: [],
    },
    {
      id: "5",
      name: "Season 5",
      episodes: [],
    },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  fetchShow.mockResolvedValueOnce(tvSeries);

  render(<Display />);

  const showDisplayButton = screen.getByRole("button");
  userEvent.click(showDisplayButton);

  const showContainer = await screen.findByTestId("show-container");

  expect(showContainer).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  fetchShow.mockResolvedValueOnce(tvSeries);

  render(<Display />);

  const showDisplayButton = screen.getByRole("button");
  userEvent.click(showDisplayButton);
  const seasonOption = await screen.findAllByTestId("season-option");

  expect(seasonOption).toHaveLength(5);
});

test("renders show season options matching your data when the button is clicked", async () => {
  const displayFunc = jest.fn();
  fetchShow.mockResolvedValueOnce(tvSeries);

  render(<Display displayFunc={displayFunc} />);

  const showDisplayButton = screen.getByRole("button");
  userEvent.click(showDisplayButton);

  await waitFor(() => expect(displayFunc).toHaveBeenCalled());
});
