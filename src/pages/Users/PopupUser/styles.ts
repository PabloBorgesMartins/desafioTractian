import styled, { css } from 'styled-components';

interface IModalProps {
    isVisi: boolean;
}


export const ModalOutside = styled.div<IModalProps>`
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--zindexPopup);
    background-color: rgba(0,0,0,0.5); 
    display: none;
    justify-content: center;
    align-items: center;

    ${props => props.isVisi && css`    
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 100%;
        width: 100%;
        flex:1;
    `}
`;

export const Modal = styled.div<IModalProps>`
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    width: 50%;
    max-width: 500px;
    z-index: calc(var(--zindexPopup) + 10);

    @media (max-width: 1000px){
        width: 90%;
    }
`;


export const Title = styled.h1`
    display: block;
    text-align: left;
    width: 100%;
    color: var(--black);
    font-size: 1.5rem;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 15px 0 30px;
`;

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border-radius: 10px;
    /* background-color: var(--backgroundLight); */
    padding: 10px 0;
    margin: 10px 0;

    h1{
        display: block;
        color: var(--gray);
        font-size: 1.1rem;
        margin-bottom: 10px;
    }

    input {
        padding: 5px;
        width: 100%;
        min-width: 0;
        background-color: transparent;
        border: 1px solid var(--gray);
        border-radius: 5px;
        font-size: 1rem;
    }

    select{
        padding: 5px ;
        width: 100%;
        background-color: transparent;
        border: 1px solid var(--gray);
        border-radius: 5px;
        font-size: 1rem;
    }
`;


export const Footer = styled.div`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

export const ButtonCancel = styled.button`
    padding: 10px 20px;
    background-color: var(--background);
    border: 0;
    border-radius: 5px;

    color: var(--black);
    font-size: 1rem;
    font-weight: bold;
`;

export const ButtonAccess = styled.button`
    padding: 10px 20px;
    background-color: var(--tractianDarkBlue);
    border: 0;
    border-radius: 5px;
    margin-left: 20px;

    color: var(--white);
    font-size: 1rem;
    font-weight: bold;
`;


