import React, { useState } from 'react';
import {
    Container,
    Image,
    UserData,
    UserName,
    UserSpecification,
    RightContent
} from './styles'
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import userImage from '../../assets/user1.png';
import PopupUser from '../../pages/Users/PopupUser';
import { UserProps } from '../../interfaces/User';
import { useUser } from '../../hooks/users'

interface UserCardProps {
    user: UserProps
}

const UserCard: React.FC<UserCardProps> = ({ user, ...props }) => {
    const { deleteUser } = useUser();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <Image src={userImage} />
            <UserData>
                <UserName>{user.name}</UserName>
                <UserSpecification>{user.companyId ? "Sem Empresa" : "Sem Empresa"} - {user.unitId ? "Sem Unidade" : "Sem Unidade"}</UserSpecification>
            </UserData>
            <RightContent>
                <FaTrash size={18} onClick={() => deleteUser(user.id)} />
                <MdEdit size={18} onClick={() => openModal()} />
            </RightContent>
            <PopupUser item={{ modalVisible, setModalVisible, id: user.id }} />
        </Container>
    );
}

export default UserCard;