import React, { useState, useCallback } from 'react';
import {
    Container,
    Image,
    UnitData,
    Name,
    Specification,
    RightContent,
    Button
} from './styles'
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import unitImage from '../../assets/unit.png';
import PopupUnit from '../../pages/Units/PopupUnit';
import { UnitProps } from '../../interfaces/Unit';
import { useCompany } from '../../hooks/companies';
import { useUnit } from '../../hooks/units';

interface UnitCardProps {
    unit: UnitProps
}

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
    const { getCompanyNameById } = useCompany();
    const { deleteUnit } = useUnit();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    return (
        <Container>
            <Image src={unitImage} />
            <UnitData>
                <Name>{unit.name}</Name>
                <Specification>
                    {unit.companyId ? getCompanyNameById(unit.companyId) : "Sem Empresa"}
                </Specification>
            </UnitData>
            <RightContent>
                <Button>
                    <FaTrash size={18} onClick={() => deleteUnit(unit.id)} />
                </Button>
                <Button>
                    <MdEdit size={18} onClick={() => openModal()} />
                </Button>
            </RightContent>
            <PopupUnit item={{ modalVisible, setModalVisible, id: unit.id }} />
        </Container>
    );
}


export default UnitCard;