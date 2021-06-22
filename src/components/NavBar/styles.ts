import styled, { css } from 'styled-components';

interface MenuProps{
    isOpen: boolean;
}

export const Container = styled.div`
    position: sticky;
    height: 100vh;
    top: 0;
    flex-direction: column;
    background-color: var(--black);
    padding: 20px 0;
    width: 200px;
    min-width: 200px;

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
    width: 100%;
    align-self: center;
    padding: 0 20px 50px;
    border-bottom: 1px solid var(--gray);

    @media (max-width: 1000px) {
        height: auto;
        width: 150px;
        padding: 0;
        border: 0;
    }
`;

export const Menu = styled.div`
    @media (max-width: 1000px) {
        display: none;
    }
`;

export const Button = styled.button`
    display: flex;
    width: 100%;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid var(--gray);
    
    a{
        text-decoration: none;
        color: var(--background);
        font-weight: bold;
        font-size: 1.4rem;
        width: 100%;
        padding: 10px 20px;
        text-align: left;
    }
`;

export const MenuDropdown = styled.div<MenuProps>`
    display: none;

    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0;
        border: 1px solid #ccc;
        background-color: var(--black);

        ${props => props.isOpen && css`
            position: absolute;
            top: 10px;
            right: 20px;
        `}
    }
`;

export const MenuButton = styled.button`
    padding: 10px;
    border: 0;
    background-color: transparent;
`;

export const MenuDropdownContainer = styled.div<MenuProps>`
    width: 100%;

    ${props => !props.isOpen && css`
        display: none;
    `}
`;

