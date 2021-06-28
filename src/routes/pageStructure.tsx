import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import {
    Container,
    SafeArea,
    Content,
} from './styles'

import NavBar from '../components/NavBar'
import TopBar from '../components/TopBar'
import Home from '../pages/Home'
import Assets from '../pages/Assets'
import Asset from '../pages/Asset'
import Companies from '../pages/Companies'
import Units from '../pages/Units'
import Users from '../pages/Users'

const App: React.FC = () => {
    return (
        <Container>
            <SafeArea>
                <NavBar />
                <Content>
                    <TopBar />
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/assets" exact component={Assets} />
                        <Route path="/companies" component={Companies} />
                        <Route path="/units" component={Units} />
                        <Route path="/users" component={Users} />
                        <Route path="/assets/:id" component={Asset} />
                    </Switch>
                </Content>
            </SafeArea>
        </Container>
    );
}

export default App;