import React, { useState, useEffect } from 'react';
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
import PopupUser from './PopupUser';
import { useUser } from '../../hooks/users'
import LoaderSpinner from '../../components/LoaderSpinner';
import { UserProps } from '../../interfaces/User';

const Users = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const { getUsers, users } = useUser();

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await getUsers();
        setLoading(false);
    }

    const openModal = async () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <Content>
                <Header>
                    <HeaderInput>
                        <input placeholder="Buscar" />
                        <FaSearch size={15} />
                    </HeaderInput>
                    <HeaderButton onClick={() => openModal()}>
                        Adicionar usuário
                    </HeaderButton>
                </Header>
                {
                    loading ? (
                        <LoaderSpinner />
                    ) : (
                        <Body>
                            {
                                users.map((item, i) => {
                                    if (item.active) {
                                        return <UserCard user={item} key={i} />
                                    }
                                })
                            }
                        </Body>
                    )
                }
            </Content>
            <PopupUser item={{ modalVisible, setModalVisible }} />
        </Container>
    );
}

export default Users;