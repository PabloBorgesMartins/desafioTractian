import styled from 'styled-components';

export const Container = styled.div`
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    margin: 0;
    width: 100%;
    height: 100%;
`;

export const Content = styled.div`
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 1200px;
`;

export const Header = styled.div`
    width: 100%;
    flex-direction: row;
    padding: 10px 20px;
    max-width: 1050px;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    color: var(--black);
    margin-bottom: 10px;
`;




export const RowGraphics = styled.div`
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
`;

export const GraphicContainer = styled.div`
    width: 40%;
    min-width: 500px;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;

    background-color: var(--white);
    border-radius: 10px;
    box-Shadow: 1px 1px 4px 1px var(--gray);
    padding: 20px;

    @media (max-width: 1000px){
        width: 100%;
        min-width: unset;
        border-bottom: 1px solid var(--gray);
    }
`;

export const GraphicTitle = styled.h1`
    font-size: 1.2rem;
    text-align: left;
    width: 100%;
    margin-bottom: 10px;
    color: var(--gray);

    @media (max-width: 1000px){
        text-align: center;
        padding-left: 0;
    }
`;


