import React, { useState } from 'react';
import {
    Container,
    Logo,
    Menu,
    MenuDropdown,
    MenuButton,
    MenuDropdownContainer,
    Button
} from './styles'
import { Link } from "react-router-dom";
import { IoMdMenu } from 'react-icons/io';

import logo from '../../assets/tractian.png'


const Input = () => {
    const [open, setOpen] = useState(false);

    return (
        <Container>
            <Logo src={logo} />
            <Menu>
                <Button>
                    <Link to="/">Ativos</Link>
                </Button>
                <Button>
                    <Link to="/users">Usuários</Link>
                </Button>
                <Button>
                    <Link to="/companies">Empresas</Link>
                </Button>
                <Button>
                    <Link to="/units">Unidades</Link>
                </Button>
            </Menu>
            <MenuDropdown onClick={() => setOpen(!open)} isOpen={open}>
                <MenuButton>
                    <IoMdMenu size={25} color={'#ccc'} />
                </MenuButton>
                <MenuDropdownContainer isOpen={open}>
                    <Button>
                        <Link to="/">Ativos</Link>
                    </Button>
                    <Button>
                        <Link to="/users">Usuários</Link>
                    </Button>
                    <Button>
                        <Link to="/companies">Empresas</Link>
                    </Button>
                    <Button>
                        <Link to="/units">Unidades</Link>
                    </Button>
                </MenuDropdownContainer>
            </MenuDropdown>
        </Container>
    );
}

export default Input;