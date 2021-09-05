import React, {Component} from 'react';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Main from "./main/Main";
import AppProvider from "./data/context/AppProvider";
import {CookiesProvider} from "react-cookie";

const theme = createMuiTheme({
    palette: {
        secondary: {
            light: '#7fb434',
            main: '#5FA202',
            dark: '#427101',
        },
        primary: {
            light: '#4b727a',
            main: '#1F4F59',
            dark: '#15373e',
        },

        typography: {
            fontFamily: [
                "Nunito Sans", 'sans-serif'
            ].join(','),
        },
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CookiesProvider>
                    <AppProvider>
                        <Main/>
                    </AppProvider>
                </CookiesProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
