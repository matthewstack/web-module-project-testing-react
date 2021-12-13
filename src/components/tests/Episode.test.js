import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";

const testEpisode = {
  id: 1,
  name: "Test 1",
  image:
    "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
  season: 1,
  number: 1,
  summary: "Summary 1",
  runtime: 1,
};

const testEpisodeWithoutImage = {
  id: 2,
  name: "Test 2",
  image: "",
  season: 1,
  number: 1,
  summary: "Summary 2",
  runtime: 1,
};

test("renders without error", () => {
  render(<Episode episode={testEpisode} />);
});

test("renders the summury test passed as prop", () => {
  render(<Episode episode={testEpisode} />);
  const summary = screen.queryByText(/summary 1/i);
  expect(summary).toBeTruthy();
  expect(summary).toBeInTheDocument();
  expect(summary).toHaveTextContent(/summary 1/i);
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={testEpisodeWithoutImage} />);

  const altImage = screen.getByAltText(
    "https://i.ibb.co/2FsfXqM/stranger-things.png"
  );

  expect(altImage).toBeInTheDocument();
});
