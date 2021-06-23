import styled from 'styled-components';

export const Container = styled.div`
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
    /* background-color: var(--cobaltBlue); */
    background: linear-gradient(135deg, var(--tractianBlue) 5%, var(--tractianDarkBlue) 60%);
`;

export const SafeArea = styled.div`
    flex-direction: row;
    width: 100%;
    /* max-width: 1200px; */
    min-height: 100%;
    background: linear-gradient(180deg, var(--tractianDarkBlue) 20%, var(--tractianBlue) 80%);
    box-Shadow: 1px 1px 10px 3px var(--black);

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

export const Content = styled.div`
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    min-height: 100%;
    border-radius: 20px 0 0 10px;
    background-color: var(--background);

    @media (max-width: 1000px) {
        border-radius: 0;
    }
`;


export const Teste = styled.div`
    width: 100%;
    min-height: 160vh;
    background-color: var(--red);
`;