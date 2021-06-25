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
import PopupUnit from '../../pages/Units/PopupUnit';
import { UnitProps } from '../../interfaces/Unit';
import { useUser } from '../../hooks/users'
import { useCompany } from '../../hooks/companies'
import { useUnit } from '../../hooks/units'

interface UnitCardProps {
    unit: UnitProps
}

const UserCard: React.FC<UnitCardProps> = ({ unit, ...props }) => {
    const { deleteUser } = useUser();
    const { getCompanyById } = useCompany();
    const { getUnitNameById, deleteUnit } = useUnit();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <Image src={userImage} />
            <UserData>
                <UserName>{unit.name}</UserName>
                <UserSpecification>
                    {unit.companyId ? getCompanyById(unit.companyId) : "Sem Empresa"}
                </UserSpecification>
            </UserData>
            <RightContent>
                <FaTrash size={18} onClick={() => deleteUnit(unit.id)} />
                <MdEdit size={18} onClick={() => openModal()} />
            </RightContent>
            <PopupUnit item={{ modalVisible, setModalVisible, id: unit.id }} />
        </Container>
    );
}


export default UserCard;