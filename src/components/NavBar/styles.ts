import styled, { css } from 'styled-components';

interface MenuDropDownProps {
    isOpen: boolean;
}

interface MenuProps {
    isSelected: boolean;
}

export const Container = styled.div`
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    left: 0;
    height: 100vh;
    flex-direction: column;
    padding: 20px 0;
    width: 80px;

    @media (max-width: 1000px) {
        flex-direction: row;
        height: 70px;
        width: 100%;
        padding: 10px 20px;
        justify-content: space-between;
    }
`;

export const Logo = styled.img`
    height: auto;
    width: 70%;
    align-self: center;
    padding: 0 0 50px;

    @media (max-width: 1000px) {
        width: 50px;
        padding: 0;
    }
`;

export const Menu = styled.div`
    @media (max-width: 1000px) {
        display: none;
    }
`;

export const Button = styled.button<MenuProps>`
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    margin: 10px 0;
    background-color: transparent;
    border: 0;
    color: var(--white);


    ${props => props.isSelected && css`
        background-color: var(--white);
        border-radius: 0 20px 20px 0;
        color: var(--tractianBlue);
    `}
`;

export const MenuDropdown = styled.div<MenuDropDownProps>`
    display: none;

    @media (max-width: 1000px) {
        /* position: sticky;  
        top: 0;
        left: 0; */
        z-index: 100000;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 5px;
        background-color: var(--white);

        ${props => props.isOpen && css`
            position: absolute;
            top: 10px;
            right: 5%;
            width: 90%;
            box-Shadow: 3px 0px 6px 0px var(--black);
        `}
    }
`;

export const MenuDropDownLogo = styled.img<MenuDropDownProps>`
    display: none;

    @media (max-width: 1000px) {
        ${props => props.isOpen && css`
            display: flex;
            width: 40%;
            max-width: 200px;
            min-width: 150px;
            margin: 20px 0 0 20px;
            height: auto;
        `}
    }
`;

export const MenuDropDownButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border: 0;
    width: 100%;
    background-color: transparent;
`;

export const MenuDropdownContainer = styled.div<MenuDropDownProps>`
    width: 100%;
    padding: 10px;

    ${props => !props.isOpen && css`
        display: none;
    `}
`;

export const DropDownButton = styled.button`
    display: flex;
    width: 100%;
    background-color: transparent;
    border-radius: 5px;
    margin: 10px 0;
    border: 1px solid var(--black);
    border: 0;
    
    a{
        text-decoration: none;
        color: var(--black);
        font-weight: bold;
        font-size: 1.4rem;
        width: 100%;
        padding: 20px;
        text-align: left;
    }
`;
