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

    @media (max-width: 800px) {
        width: 100%;
        min-width: 0;
    }
`;

export const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    align-self: center;
    border: 1px solid var(--tractianDarkBlue);
`;

export const UserData = styled.div`
    align-items: flex-start;
    justify-content: space-between;
    /* background-color: red; */
    width: 100%;
    padding: 0 20px;
`;

export const UserName = styled.h1`
    font-size: 1.1rem;
    text-align: left;
`;

export const UserSpecification = styled.p`
    font-size: 0.9rem;
    text-align: left;
`;

export const RightContent = styled.div`
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0;
    /* background-color: red; */
`;