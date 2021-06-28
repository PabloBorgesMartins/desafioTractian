import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Title,
    Blue
} from './styles'
import {
    useHistory
} from "react-router-dom";
import { FaUsers, FaTh, FaTools, FaSuitcase, FaHome } from 'react-icons/fa';

const TopBar: React.FC = () => {
    const { listen, location } = useHistory();
    const [selected, setSelected] = useState(['home']);

    useEffect(() => {
        setSelected([location.pathname.substring(1, location.pathname.length)]);

        return listen(route => {
            setSelected([route.pathname.substring(1, route.pathname.length)]);
        });
    }, [location, listen]);

    const getRouteName = useCallback(() => {
        switch (selected[0]) {
            case "assets":
                return "Ativos"
            case "users":
                return "Usuários"
            case "companies":
                return "Empresas"
            case "units":
                return "Unidades"
            default:
                return "Início"
        }
    }, [selected]);

    const getRouteIcon = useCallback(() => {
        switch (selected[0]) {
            case "assets":
                return <FaTools size={25} />
            case "users":
                return <FaUsers size={25} />
            case "companies":
                return <FaSuitcase size={25} />
            case "units":
                return <FaTh size={25} />
            default:
                return <FaHome size={25} />
        }
    }, [selected]);

    return (
        <Blue>
            <Container>
                {getRouteIcon()}
                <Title>{getRouteName()}</Title>
            </Container>
        </Blue>
    );
}

export default TopBar;