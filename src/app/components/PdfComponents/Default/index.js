
import {  Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";



const ResumeCv = (props) => {

    const classes = useStyles();
    return (

        <Grid  container spacing={1} className={classes.mainContainer}>
        <Grid item xs={12} className={classes.userTitle}>
          {props.firstName} Quevedo Alonso
        </Grid>
        <Grid item xs={12} className={classes.userLocation}>
          Carlos kramer ritcher 2277, Valdivia, Chile
        </Grid>
        
        <Grid item xs={12}>
          <hr className={classes.divider}></hr>
        </Grid>
        <Grid item xs={3} className={classes.profileTitle}>
          PROFILE
        </Grid>
        <Grid item xs={9} className={classes.profileValue}>
        
          {props.profileDescription}
        </Grid>
        <Grid item xs={12}>
          <hr className={classes.divider}></hr>
        </Grid>
        <Grid item xs={12} className={classes.profileTitle}>
          EMPLOYMENT HISTORY
        </Grid>
    
        <Grid item xs={3}></Grid>
        <Grid item xs={7}></Grid>
    
        <Grid item xs={2}></Grid>
    
      </Grid>
    );
  
}


const useStyles = makeStyles({
 
    userTitle: {
        fontWeight: 'bold',
        fontSmooth: '3em',
        fontSize: '1.2em',
  
        color: 'black',
        marginTop: '0.5em'
      },
      userLocation: {
        fontSmooth: '3em',
        fontSize: '0.8em',
        marginBottom: '0.8em',
        color: '#555'
      },
      divider: {
        marginTop: '0.1em',
        marginBottom: '0.1em',
        border: '0',
        height: '0.1em',
        background: 'black',
        color: 'black'
        
      },
      profileTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSmooth: '3em',
        color: 'black',
        fontSize: '0.8em'

      },
      profileValue: {
        textAlign: 'justify',
        width: '100%',
        padding: '0',
        border: 'none',
        outline: 'none',
        overflow: 'auto',
        boxShadow: 'none',
        fontStyle: 'italic',
        marginBottom: '0.8em',
        fontSize: '0.8em'

      },
      mainContainer: {
        '&:hover': {
          cursor: 'pointer'
        }
      }
  });
  
  
  

export default ResumeCv;