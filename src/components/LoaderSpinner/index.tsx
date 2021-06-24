import React from 'react';
import {
    Container,
} from './styles'
import Loader from "react-loader-spinner";

const LoaderSpinner = () => {
    return (
        <Container>
            <Loader
                type="TailSpin"
                color="#1e62ed"
                height={240}
                width={100}
            />
        </Container>
    );
}

export default LoaderSpinner;