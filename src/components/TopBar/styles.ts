import styled from 'styled-components';


export const Container = styled.div`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    width: 100%;
    background-color: var(--white);
    border-radius: 0;
    border-radius: 20px 0 0 0;
    box-Shadow: 3px 0px 6px 0px var(--black);
    z-index: var(--zindexTop);

    img{
        color: var(--red);
    }

    @media (max-width: 1000px) {
        /* position: unset; */
        border-radius: 0;
    }
`;

export const Blue = styled.div`
    position: sticky;
    top: 0;
    background-color: var(--tractianDarkBlue);
    width: 100%;

    @media (max-width: 1000px) {
        position: unset;
    }
`;

export const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--black);
    margin-left: 10px;
`;
