import { useState } from 'react';
import {  Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({

    profileValue: {
      textAlign: 'justify',
      width: '100%',
      padding: '0',
      border: 'none',
      outline: 'none',
      overflow: 'auto',
      boxShadow: 'none',
      fontStyle: 'italic',
      marginBottom: '0.8em'
      
    },
  
    profileEditValue: {
      textAlign: 'justify',
      width: '100%',

      padding: '0',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontStyle: 'italic',
   
      
    },
  

  
  
    
  
  });


const EditableTextArea = () => {

    const classes = useStyles();

    let profileValue = `
        Professional Software engineer graduated from Universidad Austral de Chile (Valdivia, Chile).
        Polyvalent profile (solution architect, software developer, data engineer and data scientist). 

        Academically initiated in the data science field, then working on different business of software development: public health, retail and consultancy.

        Autodidact person with easy learning and high empathy, experience working on interdisciplinary laboral environments.
    `;


    const [editable, setEditable] = useState(false);
    const toggleEditable = () => setEditable(!editable);

    const [profileContent, setProfileValue] = useState(profileValue);

    const test = () => {
        alert('is changing');
    }

    return (
        <div contentEditable="true"  className={classes.profileValue} onClick={toggleEditable}>{profileContent}</div>
      );

    
}


export default EditableTextArea;









