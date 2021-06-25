import styled from 'styled-components';

export const Container = styled.div`
    justify-content: flex-start;
    align-items: center;
    padding: 40px 20px;
    margin: 0;
    width: 100%;
    height: 100%;
`;

export const Content = styled.div`
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--white);
    margin: 0;
    padding: 10px 0 0;
    width: 100%;
    max-width: 1200px;
    border-radius: 10px;
    box-Shadow: 1px 1px 4px 1px var(--gray);

    /* height: 6000px; */
`;

export const Header = styled.div`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--white);
    margin: 0;
    padding: 10px 20px 20px;
    width: 100%;
    border-bottom: 3px solid var(--tractianBlue);

    @media (max-width: 600px) {
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
    }
`;

export const HeaderButton = styled.button`
    border: 0;
    border-radius: 5px;
    background-color: var(--tractianBlue);
    padding: 0 20px;
    height: 40px;

    color: var(--white);
    font-size: 1rem;

    @media (max-width: 600px) {
        width: 100%;
        margin-bottom: 20px;
    }

    &:hover{
        filter: brightness(1.3);
        transition: 600ms;
    }
`;

export const HeaderInput = styled.div`
    background-color: var(--tractianBlue);
    padding: 5px 20px;
    border-radius: 5px;
    height: 40px;
    width: 30%;
    min-width: 200px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--white);

    div{
        padding: 0 10px;
    }

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

export const Body = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
    /* background-color: red; */
    padding: 20px 20px 0;
    width: 100%;
    justify-content: space-between;
`;
