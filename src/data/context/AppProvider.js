import React, {Component} from "react";
import AppContext from "./AppContext";
import LoadingProgress from "../../common/LoadingProgress";
import PropTypes from "prop-types";

import {Cookies, withCookies} from "react-cookie";


class AppProvider extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentOrganisation: undefined,
            organisations: undefined,
            setCurrentOrganisation: (organisation) => {
                this.setCurrentOrganisation(organisation);
            },
            refresh: () => {
                this.refreshState();
            }
        };
    }


    componentDidMount() {
        this.refreshState();
    }

    setCurrentOrganisation = (organisation) => {
        const {cookies} = this.props;
        cookies.set('organisation', organisation, {path: '/'});
        this.setState({currentOrganisation: organisation});
    };

    refreshState = () => {
        this.setState({
            organisations: [],
            currentOrganisation: 'test'
        });
    };

    render() {
        if (this.state.organisations === undefined || this.state.currentOrganisation === undefined) {
            return (<LoadingProgress/>);
        }
        else {
            return (
                <AppContext.Provider value={this.state}>
                    {this.props.children}
                </AppContext.Provider>
            );
        }
    }

}

AppProvider.propTypes = {
    children: PropTypes.any.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(AppProvider);