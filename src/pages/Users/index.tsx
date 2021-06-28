import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    Body,
} from './styles'

import UserCard from '../../components/UserCard'
import InputBlue from '../../components/InputBlue'
import PopupUser from './PopupUser';
import { useUser } from '../../hooks/users'
import LoaderSpinner from '../../components/LoaderSpinner';
import { UserProps } from '../../interfaces/User';
import NoData from '../../components/NoData'

const Users = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState<UserProps[]>([]);

    const { getUsers, users } = useUser();

    const loadData = useCallback(async () => {
        await getUsers();
        setLoading(false);
    }, [getUsers]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        setUserData(users);
    }, [users]);

    const openModal = useCallback(async () => {
        setModalVisible(true);
    }, []);

    const searchUser = useCallback((value: string) => {
        if (value) {
            setUserData(() => {
                return users.filter(el => {
                    return (
                        el.name.toLowerCase().includes(value.toLowerCase()) ||
                        el.email.toLowerCase().includes(value.toLowerCase())
                    );
                });
            });
        } else {
            setUserData(users);
            setSearch(value);
        }
    }, [users]);

    return (
        <Container>
            <Content>
                <Header>
                    <InputBlue
                        search={search}
                        setSearch={setSearch}
                        searchUnit={searchUser}
                    />
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
                                userData.length ? (
                                    userData.map((item, i) => {
                                        if (item.active || item.active === undefined) {
                                            return <UserCard user={item} key={i} />
                                        }
                                        return null;
                                    })
                                ) : (
                                    <NoData type="Usuário" />
                                )
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