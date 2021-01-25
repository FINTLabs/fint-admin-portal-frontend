import React, {useState} from "react";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import AddAccessPackageForm from "./TemplateForm";

const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: 0,
        top: 100,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "fixed"
    }
}));

const AddAccessPackage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const accessTemplates = useSelector(state => state.accessTemplate.access_templates);
    const [valid, setValid] = useState(false);

    function openAddDialog() {
        setOpen(true);
    }

    function closeAddAccessPackage() {
        setOpen(false);
    }

    function packageNameIsValid(event) {
        setValid(event);
    }

    return (
        <div>
            <Fab
                color="secondary"
                className={classes.addButton}
                onClick={openAddDialog}
            >
                <Add/>
            </Fab>
            <AddAccessPackageForm
                closeAddAccessPackage={closeAddAccessPackage}
                packageNameIsValid={packageNameIsValid}
                packages={accessTemplates}
                valid={valid}
                open={open}
                setOpen={setOpen}/>
        </div>
    );
};

export default AddAccessPackage;