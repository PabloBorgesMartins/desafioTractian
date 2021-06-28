import React from "react";
import {
    BrowserRouter,
} from "react-router-dom";

import App from './pageStructure'

export default function Routes() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
