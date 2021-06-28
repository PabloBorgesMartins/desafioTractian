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
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 1200px;

    background-color: var(--white);
    border-radius: 10px;
    box-Shadow: 1px 1px 4px 1px var(--gray);
`;

export const ContentRow = styled.div`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
`;


export const ContentLeft = styled.div`
    padding: 30px;
    width: 40%;
    align-items: center;
    justify-content: space-evenly;

    @media (max-width: 1000px){
        width: 100%;
    } 
`;

export const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    max-width: 500px;
    max-height: 500px;
    border-radius: 10px;
`;

export const GraphicContainer = styled.div`
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    /* background-color: red; */
    padding-top: 20px;
    
    @media (max-width: 1000px){
        width: 100%;
        min-width: unset;
    }
`;

export const StatusRow = styled.div`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const StatusName = styled.h1`
    font-size: 1.5rem;
    color: var(--black);
`;

export const AssetStatus = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 100%;
    margin-right: 5px;
`;



export const ContentRight = styled.div`
    padding: 20px;
    width: 55%;
    justify-content: space-between;

    @media (max-width: 1000px){
        width: 100%;
    } 
`;

export const BodyRight = styled.div`
    padding: 20px 0 0;
    width: 100%;
`;

export const Row = styled.div`
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const Name = styled.h1`
    font-size: 1.8rem;
    color: var(--black);
    margin-bottom: 30px;
`;

export const ListPadding = styled.div`
    padding-left: 30px;
    margin-bottom: 30px;
`;

export const Title = styled.h1`
    font-size: 1.3rem;
    color: var(--black);
`;

export const Unit = styled.p`
    font-size: 1.1rem;
    color: var(--gray);
`;





