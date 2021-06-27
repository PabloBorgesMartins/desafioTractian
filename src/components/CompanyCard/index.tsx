import React, { useState, useCallback } from 'react';
import {
    Container,
    Image,
    CompanyData,
    Name,
    RightContent,
    Button
} from './styles'
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import companyImage from '../../assets/company.png';
import PopupCompany from '../../pages/Companies/PopupCompany';
import { CompanyProps } from '../../interfaces/Company';
import { useCompany } from '../../hooks/companies'

interface CompanyCardProps {
    company: CompanyProps;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const { deleteCompany } = useCompany();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    return (
        <Container>
            <Image src={companyImage} />
            <CompanyData>
                <Name>{company.name}</Name>
            </CompanyData>
            <RightContent>
                <Button>
                    <FaTrash size={18} onClick={() => deleteCompany(company.id)} />
                </Button>
                <Button>
                    <MdEdit size={18} onClick={() => openModal()} />
                </Button>
            </RightContent>
            <PopupCompany item={{ modalVisible, setModalVisible, id: company.id }} />
        </Container>
    );
}


export default CompanyCard;