import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Title,
    Blue,
    Button
} from './styles'
import {
    useHistory,
} from "react-router-dom";
import { FaUsers, FaTh, FaTools, FaSuitcase, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useAssets } from '../../hooks/assets'

const TopBar: React.FC = () => {
    const { listen, location } = useHistory();
    const history = useHistory();
    const [selected, setSelected] = useState(['home']);

    const { getAssetById } = useAssets();

    useEffect(() => {
        setSelected([location.pathname.substring(1, location.pathname.length)]);

        return listen(route => {
            setSelected([route.pathname.substring(1, route.pathname.length)]);
        });
    }, [location, listen]);

    const getRouteName = useCallback(() => {
        if (selected[0].split("/").length > 1) {
            return `${getAssetById(parseInt(selected[0].split("/")[1])).name}`
        }
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
    }, [selected, getAssetById]);

    const getRouteIcon = useCallback(() => {
        if (selected[0].split("/").length > 1) {
            return (
                <Button onClick={() => history.goBack()} >
                    <FaArrowLeft size={20} />
                </Button>
            )
        }
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
    }, [selected, history]);

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