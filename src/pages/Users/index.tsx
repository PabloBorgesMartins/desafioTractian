import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    HeaderInput,
    Body,
} from './styles'
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

import UserCard from '../../components/UserCard'
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

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setUserData(users);
    }, [users]);

    const loadData = useCallback(async () => {
        await getUsers();
        setLoading(false);
    }, []);

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
                    <HeaderInput>
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar"
                        />
                        {
                            search && <div>
                                <MdCancel onClick={() => searchUser("")} size={15} />
                            </div>
                        }
                        <FaSearch onClick={() => searchUser(search)} size={15} />
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
                                userData.length ? (
                                    userData.map((item, i) => {
                                        if (item.active || item.active === undefined) {
                                            return <UserCard user={item} key={i} />
                                        }
                                    })
                                ) : (
                                    <NoData type="Usuários" />
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