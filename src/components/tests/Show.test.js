import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

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

test("renders testShow and no selected Season without errors", () => {
  render(<Show show={tvSeries} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={""} selectedSeason={"none"} />);

  const loadingContainer = screen.getByTestId("loading-container");

  expect(loadingContainer).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={tvSeries} selectedSeason={"none"} />);

  const seasonOption = screen.queryAllByTestId("season-option");

  expect(seasonOption).toHaveLength(5);
});

test("handleSelect is called when an season is selected", () => {
  const selectSeasonMock = jest.fn();

  render(
    <Show
      show={tvSeries}
      selectedSeason={"none"}
      handleSelect={selectSeasonMock}
    />
  );

  const selectSeason = screen.getByLabelText(/select a season/i);
  userEvent.selectOptions(selectSeason, "1");

  expect(selectSeasonMock).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(<Show show={tvSeries} selectedSeason={"none"} />);

  let episodesContainer = screen.queryByTestId(/episodes-container/i);
  expect(episodesContainer).not.toBeInTheDocument();

  rerender(<Show show={tvSeries} selectedSeason={"1"} />);

  episodesContainer = screen.queryByTestId(/episodes-container/i);
  expect(episodesContainer).toBeInTheDocument();
});
