import React from 'react';
import {
    NoDataContainer,
    NoDataText
} from './styles'
import { FcDeleteDatabase } from 'react-icons/fc';

interface NoDataProps {
    type: string;
}

const NoData: React.FC<NoDataProps> = ({ type }) => {
    return (
        <NoDataContainer>
            <FcDeleteDatabase size={80} />
            <NoDataText>
                {type} não encontrado(a).
            </NoDataText>
        </NoDataContainer>
    );
}

export default NoData;