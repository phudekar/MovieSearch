import {BrowserRouter as Routes, MemoryRouter} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import {shallow, mount, configure} from 'enzyme';
import {MovieItem} from "./components/Movies";
import Adapter from 'enzyme-adapter-react-16';
import App, {PageNotFound} from "./App";
import MovieOverview from "./Overview";

configure({adapter: new Adapter()});
it('should show Home component for / Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialentries="{['/']}">
            <App/>
        </MemoryRouter>
    );
    expect(component.find(Home)).toHaveLength(1);
})

it('should show MovieOverview component for /movies/id Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialentries={['/movie/234']}>
            <App/>
        </MemoryRouter>
    );
    console.log(component)
    expect(component.find(MovieOverview)).toHaveLength(1);
})

it('should show PageNotFound component for /unknown Router (using memory Router)', () => {
    const component = mount(<MemoryRouter initialentries="{['/unknown']}">
            <App/>
        </MemoryRouter>
    );
    expect(component.find(PageNotFound)).toHaveLength(1);
})