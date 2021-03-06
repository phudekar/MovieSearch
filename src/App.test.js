import {MemoryRouter} from "react-router-dom";
import React from "react";
import Home, {SearchResult} from "./pages/Home";
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, {PageNotFound} from "./App";
import MovieOverview from "./Overview";

configure({adapter: new Adapter()});
it('should show Home component for / Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialentries={['/']}>
            <App/>
        </MemoryRouter>
    );
    expect(component.find(Home)).toHaveLength(1);
})

it('should show MovieOverview component for /movies/id Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialEntries={['/movie/234']}>
            <App/>
        </MemoryRouter>
    );
    expect(component.find(MovieOverview)).toHaveLength(1);
})

it('should show PageNotFound component for /unknown Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialEntries={['/unknown']}>
            <App/>
        </MemoryRouter>
    );
    expect(component.find(PageNotFound)).toHaveLength(1);
})

it('should show SearchResult component for /search/query Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialEntries={['/search/Hello']}>
            <App/>
        </MemoryRouter>
    );
    expect(component.find(SearchResult)).toHaveLength(1);
})