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
    max-width: 1200px;
    min-height: 100vh;
    background-color: var(--background);
    box-Shadow: 1px 1px 10px 3px var(--black);

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;


export const Teste = styled.div`
    width: 100%;
    min-height: 160vh;
    background-color: var(--red);
`;