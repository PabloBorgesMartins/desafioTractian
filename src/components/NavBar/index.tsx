import React, { useState, useEffect, useCallback } from "react";
import {
    Container,
    Logo,
    Menu,
    MenuDropdown,
    MenuDropDownButton,
    MenuDropDownLogo,
    MenuDropdownContainer,
    Button,
    DropDownButton
} from './styles'
import { Link, useHistory } from "react-router-dom";

import { IoMdMenu } from 'react-icons/io';
import { FaUsers, FaTh, FaTools, FaSuitcase, FaHome } from 'react-icons/fa';

import logo from '../../assets/tractian.png'
import logo2 from '../../assets/favicon.png'

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { listen, location } = useHistory();
    const history = useHistory();
    const [selected, setSelected] = useState(['home']);

    useEffect(() => {
        setSelected([location.pathname.substring(1, location.pathname.length)]);

        return listen(route => {
            setSelected([route.pathname.substring(1, route.pathname.length)]);
        });
    }, [location, listen]);

    const getRouteName = useCallback((value) => {
        if (value === selected[0]) {
            return true;
        }
        return false;
    }, [selected]);

    return (
        <Container style={{ position: "sticky" }}>
            <Logo onClick={() => history.push("/")} src={logo2}/>
            <Menu>
                <Link to="/">
                    <Button isSelected={getRouteName("")}>
                        <FaHome size={30} />
                    </Button>
                </Link>
                <Link to="/assets">
                    <Button isSelected={getRouteName("assets")}>
                        <FaTools size={30} />
                    </Button>
                </Link>
                <Link to="/users">
                    <Button isSelected={getRouteName("users")}>
                        <FaUsers size={30} />
                    </Button>
                </Link>
                <Link to="/units">
                    <Button isSelected={getRouteName("units")}>
                        <FaTh size={30} />
                    </Button>
                </Link>
                <Link to="/companies">
                    <Button isSelected={getRouteName("companies")}>
                        <FaSuitcase size={30} />
                    </Button>
                </Link>
            </Menu>
            <MenuDropdown onClick={() => setOpen(!open)} isOpen={open}>
                <MenuDropDownButton>
                    <Link to="/">
                        <MenuDropDownLogo isOpen={open} src={logo} />
                    </Link>
                    <IoMdMenu size={25} />
                </MenuDropDownButton>
                <MenuDropdownContainer isOpen={open}>
                    <DropDownButton>
                        <Link to="/">Início</Link>
                    </DropDownButton>
                    <DropDownButton>
                        <Link to="/assets">Ativos</Link>
                    </DropDownButton>
                    <DropDownButton>
                        <Link to="/users">Usuários</Link>
                    </DropDownButton>
                    <DropDownButton>
                        <Link to="/units">Unidades</Link>
                    </DropDownButton>
                    <DropDownButton>
                        <Link to="/companies">Empresas</Link>
                    </DropDownButton>
                </MenuDropdownContainer>
            </MenuDropdown>
        </Container>
    );
}

export default NavBar;