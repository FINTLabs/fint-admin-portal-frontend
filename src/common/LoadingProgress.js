import React from "react";
import {CircularProgress, withStyles} from "@material-ui/core";

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing(2)}px`,
    position: 'absolute',
    top: '30%',
    left: '50%',
    marginRight: '-50%',
  },
});

class LoadingProgress extends React.Component {

  render() {

    const {classes} = this.props;

    return (
      <CircularProgress color='secondary' className={classes.progress} size={150}/>
    );
  }

}

export default withStyles(styles)(LoadingProgress);
