import React from 'react';
import {Box, Paper, TableBody} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {useDispatch, useSelector} from "react-redux";
import SelectAllEntitiesCheckboxes from "./select_all_entities_checkboxes";
import EntityTable from "./entity_table";
import TableHeader from "./entity_table_header";
import {updateAccessPackages} from "../../../data/redux/actions/access_templates";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(20),
    },
    accessBox: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    tableRow: {
        '&:nth-of-type(even)': {
            backgroundColor: "#fef3ef",
        },
    },
    icon: {
        margin: theme.spacing(1),
        verticalAlign: "middle",
    },
    header: {
        marginTop: theme.spacing(4),
    },
    chooseAllRow: {
        backgroundColor: theme.palette.secondary.light,
    },
    customWidth: {
        maxWidth: 500,
    },
}));

const EntitySelection = (props) => {
    const classes = useStyles();
    const {selectedAccessPackage} = props;
    const dispatch = useDispatch();
    const accessTemplates = useSelector(state => state.accessTemplate.access_templates);
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);

    function removePath(array, path) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === path) {
                array.splice(i, 1);
            }
        }
    }

    function updateAccesses(event, path) {
        let newAccessPackages = [...accessTemplates];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex= newAccessPackages.indexOf(newAccessPackages.filter(ap=> ap.dn === newAccessPackage.dn)[0]);

        switch (event.target.name) {
            case "collection":
                if (newAccessPackage.collection.includes(path)) {
                    removePath(newAccessPackage.collection, path);
                }
                if (event.target.checked) {
                    newAccessPackage.collection.push(path);
                }
                break;
            case "read":
                if (newAccessPackage.read.includes(path)) {
                    removePath(newAccessPackage.read, path);
                }
                if (event.target.checked) {
                    newAccessPackage.read.push(path);
                }
                break;
            case "modify":
                if (newAccessPackage.modify.includes(path)) {
                    removePath(newAccessPackage.modify, path);
                }
                if (event.target.checked) {
                    newAccessPackage.modify.push(path);
                }
                break;
            default:
                console.log("nothing to add");
                break;
        }
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    function checkAll(e, collection) {
        e.target.name = collection;
        selectedAccessPackage.components.forEach(selectedComponent => {
            componentConfiguration.forEach(componentConfig => {
                if (componentConfig.dn === selectedComponent) {
                    componentConfig.classes.forEach(aClass => {
                        updateAccesses(e, aClass.path);
                    });
                }
            });

        });
    }

    return (
        <div className={classes.root}>

            <Box className={classes.accessBox} component={Paper}>
                <Typography variant="h4" className={classes.header}>Tilganger</Typography>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableHeader classes={classes} selectedAccessPackage={selectedAccessPackage}/>
                    </TableHead>
                    <TableBody>
                        {componentConfiguration.map(component => {
                            if (selectedAccessPackage.components.includes(component.dn)) {
                                return component.classes.map(entity => {
                                    return (
                                        <EntityTable
                                            key={entity.path}
                                            classes={classes}
                                            entity={entity}
                                            component={component}
                                            selectedAccessPackage={selectedAccessPackage}
                                            updateAccesses={updateAccesses}
                                        />
                                    )
                                })
                            } else {
                                return null;
                            }
                        })
                        }
                        <SelectAllEntitiesCheckboxes classes={classes} checkAll={checkAll}
                                                     selectedAccessPackage={selectedAccessPackage}/>
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
};

export default EntitySelection;