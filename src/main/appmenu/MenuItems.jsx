import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BusinessIcon from "@material-ui/icons/Business";
import ContactIcon from "@material-ui/icons/Person";
import ComponentIcon from "@material-ui/icons/WebAsset";
import AccessIcon from "@material-ui/icons/LockOpen";
import ToolsIcon from "@material-ui/icons/Build";
import {Link} from "react-router-dom";
import List from "@material-ui/core/List";

const MenuItems = () => {
    return (
        <List id="menuList">
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button component={Link} to="/organisations">
                <ListItemIcon>
                    <BusinessIcon/>
                </ListItemIcon>
                <ListItemText primary="Organisasjoner"/>
            </ListItem>
            <ListItem button component={Link} to="/contacts">
                <ListItemIcon>
                    <ContactIcon/>
                </ListItemIcon>
                <ListItemText primary="Kontakter"/>
            </ListItem>
            <ListItem button component={Link} to="/components">
                <ListItemIcon>
                    <ComponentIcon/>
                </ListItemIcon>
                <ListItemText primary="Komponenter"/>
            </ListItem>
            <ListItem button component={Link} to="/access">
                <ListItemIcon>
                    <AccessIcon/>
                </ListItemIcon>
                <ListItemText primary="Tilgangspakker"/>
            </ListItem>
            <ListItem button component={Link} to="/tools">
                <ListItemIcon>
                    <ToolsIcon/>
                </ListItemIcon>
                <ListItemText primary="Verktøy"/>
            </ListItem>
        </List>
    );
}

export default MenuItems;
