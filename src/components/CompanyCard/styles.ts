import styled from 'styled-components';

export const Container = styled.div`
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding: 20px;
    border-radius: 10px;
    background-color: var(--backgroundLight);
    width: 45%;
    min-width: 300px;
    min-height: 120px;
    margin-bottom: 40px;
    box-Shadow: 1px 1px 3px 0px var(--black);

    @media (max-width: 800px) {
        min-width: 0;
        flex-direction: column;
        width: 100%;
    }
`;

export const Image = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 100%;
    align-self: center;
    border: 3px solid var(--tractianDarkBlue);
`;

export const CompanyData = styled.div`
    align-items: flex-start;
    justify-content: space-evenly;
    /* background-color: red; */
    width: 100%;
    padding: 0 20px;

    @media (max-width: 800px) {
        align-items: center;
        padding: 30px 0 50px;
    }
`;

export const Name = styled.h1`
    font-size: 1.3rem;
    text-align: left;

    @media (max-width: 800px) {
        text-align: center;
    }
`;

export const RightContent = styled.div`
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0;
    /* background-color: red; */

    @media (max-width: 800px) {
        flex-direction: row-reverse;
        justify-content: space-evenly;
    }
`;

export const Button = styled.button`
    border: 0;
    box-Shadow: 1px 1px 3px 0px var(--black);
    margin: 0;
    padding: 7px 7px 3px;
    border-radius: 5px;
    background-color: var(--tractianBlue);
    color: var(--white);

    &:hover{
        filter: brightness(1.4);
        transition: 600ms;
    }
`;