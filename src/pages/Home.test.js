import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import { fetchMovies } from '../api';
import Home from './Home';

jest.mock('../api');

it('should not show loader by default', async () => {
    const { queryByText } = render(<Home />)

    expect(queryByText('Loading...')).toBeNull();
})

it('should not show any movie by default', async () => {
    const { queryAllByTitle } = render(<Home />)

    expect(queryAllByTitle('movie').length).toBe(0);
})

it('should show error', async () => {
    const { container, getByText } = render(<Home />)

    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();

    fetchMovies.mockReturnValue(Promise.reject({ message: 'test error' }));

    fireEvent.change(searchInput, { target: { value: 'Avengers' } })
    expect(fetchMovies).toHaveBeenCalledWith('Avengers')

    await waitForDomChange();
    expect(getByText('test error')).toBeInTheDocument();
})

it('should show loader while loading movies', async () => {
    const { container, queryByText } = render(<Home />)

    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();

    fetchMovies.mockReturnValue(new Promise(() => { }));

    fireEvent.change(searchInput, { target: { value: 'Avengers' } })
    expect(fetchMovies).toHaveBeenCalledWith('Avengers')

    expect(queryByText('Loading...')).toBeInTheDocument();
})

it('should show movies returned from api', async () => {
    const { container, queryAllByTitle, getByText } = render(<Home />)

    const searchInput = container.querySelector('input');
    expect(searchInput).toBeInTheDocument();

    const movies = [
        { id: 1, title: 'Avengers 1' },
        { id: 2, title: 'Avengers 2' }
    ]
    fetchMovies.mockReturnValue(Promise.resolve(movies));

    fireEvent.change(searchInput, { target: { value: 'Avengers' } })
    expect(fetchMovies).toHaveBeenCalledWith('Avengers')

    await waitForDomChange()
    const movieElems = queryAllByTitle('movie');
    expect(movieElems.length).toBe(2);

    expect(getByText(movies[0].title)).toBeInTheDocument();
    expect(getByText(movies[1].title)).toBeInTheDocument();

})
