import styled from 'styled-components';

export const HeaderInput = styled.div`
    background-color: var(--tractianBlue);
    padding: 5px 0 5px 20px;
    border-radius: 5px;
    height: 40px;
    width: 30%;
    min-width: 200px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--white);

    input{
        border: 0;
        background-color: transparent;
        outline: none;
        color: var(--white);
        font-size: 1rem;
        width: 100%;
        min-width: 0;

        &::placeholder {
            color: var(--white);
        }

        ::selection{
            background-color: black;
        }
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;


export const Button = styled.button`
    padding: 4px 10px 0;
    border: 0;
    background-color: transparent;
    color: var(--white);

    &:hover{
        filter: brightness(1.4);
        transition: 600ms;
    }
`;

export const SearchButton = styled.button`
    padding: 4px 10px 0;
    border: 0;
    background-color: transparent;
    color: var(--white);
    border-left: 1px solid var(--white);

    &:hover{
        filter: brightness(1.5);
        transition: 600ms;
    }
`;