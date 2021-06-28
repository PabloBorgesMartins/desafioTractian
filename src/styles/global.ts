import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --green: #30854C;
        --yellow:#f9be2b;
        --red:#cc2419;
        --gray:#4A525A;
        --black:#222;
        --white:#f1f1f1;

        --egyptianBlue:#15348F;
        --cobaltBlue:#004BA8;
        --hanBlue:#4B6DD1;
        --spaceCadet:#32394F;
        --jet:#2D2E33;
        --nimbus: #CAD6FA;

        --tractianBlue: #2563ea;
        --tractianDarkBlue: #1e62ed;
        /* --background: #eaeaea; */
        --background: #ddd;
        --backgroundLight: #e7e7e7;

        --zindexPopup: 1200;
        --zindexNav: 1100;
        --zindexTop: 1000;
        --zindexContent: 900;
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
        scroll-behavior: smooth;
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

    textarea:focus, input:focus, select:focus {
        box-shadow: 0 0 0 0;
        /* border: 0 none; */
        outline: 0;
    } 

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 2px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;  
    }
    ::-webkit-scrollbar-thumb {
        background-color: #1e62ed;
        border-radius: 16px;
        @media (max-width: 1000px) {
            background-color: #aaa;
        }
    }

`;