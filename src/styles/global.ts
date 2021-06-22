import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --green: #30854C;
        --yellow:#f9be2b;
        --red:#cc2419;
        --gray:#4A525A;
        --black:#222;

        --tractianBlue: #2563ea;
        --tractianDarkBlue: #1e40af;

        --egyptianBlue:#15348F;
        --cobaltBlue:#004BA8;
        --hanBlue:#4B6DD1;
        --spaceCadet:#32394F;
        --jet:#2D2E33;

        --background2: #CAD6FA;
        --background: #f1f1f1;
    }  

    * { 
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
    }

    div{
        display: flex;
        flex-direction: column;
    }

    html{
        @media (max-width: 1080px){
            font-size: 93.75%;
        }
        @media (max-width: 720px){
            font-size: 87.5%;
        }
    }

    body {
        background: var(---background);
        -webkit-font-smoothing: antialiased;
    }

    button {
        cursor: pointer
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

`;