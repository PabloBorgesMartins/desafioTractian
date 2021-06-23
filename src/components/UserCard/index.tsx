import React from 'react';
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

import userImage from '../../assets/user1.png'

const Unit = () => {
    return (
        <Container>
            <Image src={userImage} />
            <UserData>
                <UserName>Testador Um</UserName>
                <UserSpecification>Empresa teste - Unidade Jaguar</UserSpecification>
            </UserData>
            <RightContent>
                <FaTrash size={18} />
                <MdEdit size={18} />
            </RightContent>
        </Container>
    );
}

export default Unit;