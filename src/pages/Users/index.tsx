import React from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    HeaderInput,
    Body
} from './styles'
import { FaSearch } from 'react-icons/fa';

import UserCard from '../../components/UserCard'

const Users = () => {
    return (
        <Container>
            <Content>
                <Header>
                    <HeaderInput>
                        <input placeholder="Buscar" />
                        <FaSearch size={15} />
                    </HeaderInput>
                    <HeaderButton>
                        Adicionar usuário
                    </HeaderButton>
                </Header>
                <Body>  
                    <UserCard />
                    {/* <UserCard />
                    <UserCard /> */}
                </Body>
            </Content>
        </Container>
    );
}

export default Users;