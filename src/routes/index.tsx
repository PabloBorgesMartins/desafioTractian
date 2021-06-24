import React, { useState, useEffect } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import {
    Container,
    SafeArea,
    Content,
    Teste
} from './styles'

import NavBar from '../components/NavBar'
import TopBar from '../components/TopBar'
import Home from '../pages/Home'
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
                    <Content>
                        <TopBar />
                        <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/assets" component={Assets} />
                            <Route path="/companies" component={Companies} />
                            <Route path="/units" component={Units} />
                            <Route path="/users" component={Users} />
                        </Switch>
                    </Content>

                    {/* <Teste/> */}
                </SafeArea>

            </Container>
        </BrowserRouter>
    );
}
