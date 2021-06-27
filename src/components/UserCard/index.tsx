import React, { useState } from 'react';
import {
    Container,
    Image,
    UserData,
    UserName,
    UserSpecification,
    RightContent,
    Button
} from './styles'
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import userImage from '../../assets/user1.png';
import PopupUser from '../../pages/Users/PopupUser';
import { UserProps } from '../../interfaces/User';
import { useUser } from '../../hooks/users'
import { useCompany } from '../../hooks/companies'
import { useUnit } from '../../hooks/units'

interface UserCardProps {
    user: UserProps
}

const UserCard: React.FC<UserCardProps> = ({ user, ...props }) => {
    const { deleteUser } = useUser();
    const { getCompanyNameById } = useCompany();
    const { getUnitNameById } = useUnit();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <Image src={userImage} />
            <UserData>
                <UserName>{user.name}</UserName>
                <UserSpecification>
                    {user.companyId ? getCompanyNameById(user.companyId) : "Sem Empresa"}
                    {" - "}
                    {user.unitId ? getUnitNameById(user.unitId) : "Sem Unidade"}
                </UserSpecification>
            </UserData>
            <RightContent>
                <Button>
                    <FaTrash size={18} onClick={() => deleteUser(user.id)} />
                </Button>
                <Button>
                    <MdEdit size={18} onClick={() => openModal()} />
                </Button>
            </RightContent>
            <PopupUser item={{ modalVisible, setModalVisible, id: user.id }} />
        </Container>
    );
}


export default UserCard;