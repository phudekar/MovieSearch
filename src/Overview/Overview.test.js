import {render, waitForDomChange} from "@testing-library/react";
import React from "react";
import MovieOverview from "./index";
import {fetchDetails} from "../api";

jest.mock('../api');

it('should loading initially', async () => {
    fetchDetails.mockReturnValue(new Promise(() => {
    }))
    const movieId = 123
    const {queryByText} = render(<MovieOverview {...{movieId}}/>)
    expect(queryByText("Loading...")).toBeInTheDocument()
})

it('should show details', async () => {
    const movieDetails = {
        title: 'Hello',
        overview: 'My Overview',
        tagline: 'Part of the journey is the end',
        genres: []
    };
    fetchDetails.mockReturnValue(Promise.resolve(movieDetails))
    const movieId = 123
    const {queryByText} = render(<MovieOverview {...{movieId}}/>)
    await waitForDomChange()
    expect(queryByText(movieDetails.title)).toBeInTheDocument()
    expect(queryByText(movieDetails.tagline)).toBeInTheDocument()
    expect(queryByText(movieDetails.overview)).toBeInTheDocument()
})

it('should show genres', async () => {

    const movieDetails = {
        title: 'Hello',
        overview: 'My Overview',
        tagline: 'Part of the journey is the end',
        genres: ["Action", "Comedy"]
    };
    fetchDetails.mockReturnValue(Promise.resolve(movieDetails))
    const movieId = 123
    const {getByText,queryByText} = render(<MovieOverview {...{movieId}}/>)
    await waitForDomChange()
    movieDetails.genres.forEach(value =>
        expect(queryByText(value)).toBeInTheDocument()
    )
})
