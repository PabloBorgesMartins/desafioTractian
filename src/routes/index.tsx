import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Container,
    SafeArea,
    Teste
} from './styles'

import NavBar from '../components/NavBar'
import Assets from '../pages/Assets'
import Companies from '../pages/Companies'
import Units from '../pages/Units'
import Users from '../pages/Users'

export default function App() {
    return (
        <BrowserRouter>
            <Container>
                <SafeArea>
                    <NavBar />
                    <Switch>
                        <Route path="/" component={Assets} exact />
                        <Route path="/companies" component={Companies} />
                        <Route path="/units" component={Units} />
                        <Route path="/users" component={Users} />
                    </Switch>
                    {/* <Teste/> */}
                </SafeArea>

            </Container>
        </BrowserRouter>
    );
}
