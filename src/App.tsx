import { LoginSuccess } from "./app/components/LoginSuccess";
import { AppBar, Box, Container, Toolbar, Typography, Button, Stack, Divider, Grid, FormControl, Input, InputLabel, Backdrop, SpeedDial, SpeedDialIcon, SpeedDialAction, TextField } from "@mui/material";
import { LinkedIn,CodeTwoTone, PictureAsPdf, Share, Print, ZoomIn, LogoutRounded } from '@mui/icons-material';
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setAuthUser } from "./app/appSlice";
import StyleBadge from "./app/components/styleBadge";
import ResumeCV from "./app/components/PdfComponents/Default"
import { useState } from 'react';



const actions = [
  { icon: <ZoomIn />, name: 'Zoom'},
  { icon: <Print />, name: 'Print' },
  { icon: <Share />, name: 'Share' },
  { icon: <PictureAsPdf />, name: 'Pdf' }
];


function App() {
  const user = useSelector((state: any) => state.app.authUser as any) as any;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  

  const [firstName, setFistName] = useState('Fernando');
  const [toggle, setToggle] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  let profileValue = `
  Professional Software engineer graduated from Universidad Austral de Chile (Valdivia, Chile). Polyvalent profile (solution architect, software developer, data engineer and data scientist). Academically initiated in the data science field, then working on different business of software development: public health, retail and consultancy. Autodidact person with easy learning and high empathy, experience working on interdisciplinary laboral environments.
`;


  const [profileDescription, setPorfileDescription] = useState(profileValue);


  const fetchAuthUser = async () => {
    console.log('fetchAuthUser');
    const response = await axios
        .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
        .catch((err) => {
            console.log(err);
            console.log("Not properly authenticated");
            dispatch(setIsAuthenticated(false));
            dispatch(setAuthUser(null));
            history.push("/login/error");
        });

    
    console.log(response);
    if (response && response.data){
        console.log("User: ", response.data);
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(response.data));
        history.push("/welcome");
    
    }
  };


  const linkedinLogin = async () => {
    let timer: NodeJS.Timeout | null = null;
    
    const linkedinLoginUrl = "http://127.0.0.1:5000/api/v1/auth/linkedin";
    let left = 500;
    let top = 500;
    const newWindow = window.open(
      linkedinLoginUrl, 
      "_blank", 
      "width=500, height=600, top="+top+", left="+left
      
      );
  
    
    if (newWindow){
      timer = setInterval(() => {
        if (newWindow.closed){
          console.log("window is closed");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  }  

  const linkedinLogout = () => {
    const linkedinLogoutUrl = "http://127.0.0.1:5000/api/v1/logout";
    axios.get(linkedinLogoutUrl)
    .then((response) => {
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
      history.push("/");
    })
  }


  const handleActionsCvPrev = (action: string) => {

    if (action === 'Zoom'){
      history.push("/cv");
    }
    
  }

  const downloadPdf = async () => {


    const serverSidePdfGeneratorUrl = 'http://127.0.0.1:5000/api/v1/generatePDF';

  
    await axios.get(serverSidePdfGeneratorUrl, {
      method: 'GET',
      responseType: 'blob' //Force to receive data in a Blob Format
    })
    .then(response => {
    //Create a Blob from the PDF Stream
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});
    //Build a URL from the file
        const fileURL = URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = "CV_" + new Date() + ".pdf";
        link.click();
    //Open the URL on new Window
        //window.open(fileURL);
    })
    .catch(error => {
        console.log(error);
    });
  }



  return (
    <Container maxWidth="xl" className={classes.mainContainer}>
      <Switch>
        <Route exact path="/">
          <Box sx={{ flexGrow: 8 }}>
            <AppBar position="fixed" className={classes.header}>
              <Toolbar>
                <CodeTwoTone className={classes.typography}/>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={classes.typography}>
                  ResumeCV
                </Typography>
                <Button variant="contained" onClick={linkedinLogin} className={classes.button} startIcon={<LinkedIn/>}>
                  Login
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </Route>         
        <Route path="/welcome">

          <Box sx={{ flexGrow: 9 }}>
            <AppBar position="absolute" className={classes.header}>
              <Toolbar>
                <CodeTwoTone className={classes.typography}/>
                <Typography variant="h5" component="div" sx={{ flexGrow: 8 }} className={classes.typography}>
                  ResumeCV
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />}
>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.typography_welcome}>
                    Welcome {(user) ? user.fullName : "anonymus"}!
                  </Typography>
                  <StyleBadge alt={(user) ? user.fullName : "anonymus"} src={(user) ? user.picture : ""}/>
                  <LogoutRounded onClick={linkedinLogout} className={classes.logoutIcon}/>
                </Stack>

              </Toolbar>
            </AppBar>
          </Box>


          <Grid  container className={classes.principalContainer}>
            
            <Grid item xs={5} className={classes.formContainer}>
            <Box className={classes.form}> 
            



              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 2 },
                }}
                noValidate
                autoComplete="off"
                
              >
                <Typography variant="h6">CV Resume Form</Typography>
                <StyleBadge alt={(user) ? user.fullName : "anonymus"} src={(user) ? user.picture : ""}/>
                <Divider/>
                <FormControl variant="standard">
                  <InputLabel>Job Title</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Email</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>First Name</InputLabel>
                  <Input onChange={e => setFistName(e.target.value)} className={classes.ownInput} value={firstName} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Last Name</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
              </Box>


              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 2 },
                }}
                noValidate
                autoComplete="off"
                hidden={!toggle}
              >
                
                <FormControl variant="standard">
                  <InputLabel>Phone</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Nationality</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Country</InputLabel>
                  <Input onChange={e => setFistName(e.target.value)} className={classes.ownInput} value={firstName} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>City</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>

              </Box>


              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 2 },
                }}
                noValidate
                autoComplete="off"
                hidden={!toggle}
              >
                
                <FormControl variant="standard">
                  <InputLabel>Phone</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Nationality</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>Country</InputLabel>
                  <Input onChange={e => setFistName(e.target.value)} className={classes.ownInput} value={firstName} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel>City</InputLabel>
                  <Input className={classes.ownInput} />
                </FormControl>

              </Box>

              <Box sx={{ height: '10%'}}>
                <Button className={classes.editDetailsButton} onClick={() => {setToggle(!toggle)}}>Edit details {toggle ? ' -' : ' +'}</Button>

              </Box>
          

              <Box >
            
        
                <TextField
                  sx={{ width:'70%' }}
                  label="Profile description"
                  multiline
                  rows={4}
                  value={profileDescription}
                  onChange={e => setPorfileDescription(e.target.value)}
                />

             
              </Box>




            </Box>
            

            </Grid>
            <Grid item xs={7} className={classes.cvContainer}>
      
              
                
              <div className="page_preview">
                <ResumeCV firstName={firstName} profileDescription={profileDescription}/>
              </div>


                 
               
                      <Backdrop open={open} />
                      <SpeedDial
                        ariaLabel="SpeedDial"
                        sx={{ position: 'absolute', bottom: 20, right: 20 }}
                        icon={<SpeedDialIcon />}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => handleActionsCvPrev(action.name) }
                          />
                        ))}
                      </SpeedDial>

                      <Button onClick={downloadPdf} sx={{ position: 'absolute', bottom: 20, width: 200}} variant='contained' color='success' >Download PDF ($1)</Button>
                    
             
         
            </Grid>

          </Grid>


 


        </Route>
        <Route exact path="/login/success" component={LoginSuccess}/>
        <Route path="/login/error">
            Try Again
        </Route>
        <Route path="/cv">
          <div className="page">
            
            <ResumeCV firstName={firstName} profileDescription={profileDescription}/>
          </div>
            
          
        </Route>
      </Switch>
    </Container>
  );
}

export default App;



const useStyles = makeStyles({
  header: {
    backgroundColor: "cadetblue",
    color: "white"
  },
  button: {
    textTransform: 'none',
  },
  typography: {
    fontFamily: ['Sofia', 'serif'].join(','),
    fontWeight: 'bold',
    textShadow: '1px 1px #0000006e'
  },
  typography_welcome: {
    fontFamily: ['Rajdhani', 'serif'].join(','),
    fontWeight: 'bold',
    textShadow: '1px 1px #0000006e'
  },
  mainContainer: {
    backgroundColor: '#F3F6F9',
    alignItems: 'center',
    paddingLeft: '0',
    paddingRight: '0'
  
  },

  resume: {
    padding: '4vh',
    height: 'calc(23vw * 1.4)',
    width: '23vw'
  },

  
  profileContainer: {
    height: '200px'
  },


  formContainer: {
    backgroundColor: 'white',
    height: '100vh',
    overflow: 'hidden',

    paddingTop: '10vh',
    scrollBehavior: 'smooth'
  },
  form: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    overflowY: 'scroll',
    paddingLeft: '17px',
    paddingRight: '17px', 
    boxSizing: 'content-box'
  },
  cvContainer: {
    backgroundColor: 'rgb(122, 133, 153)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px',
    height: '100vh',
    width: '100%'
    },


  
  principalContainer: {
    height: '100vh'
  },

  ownInput: {
    backgroundColor: '#d1e2e236', 
    borderRadius: '0.2em'
  }
,
editDetailsButton: {
  fontSize: '0.7em'
},
logoutIcon: {
  fontSize: '1.5em',
  fontWeight: 'bold',
  color: 'white',
  cursor: 'pointer'
}

});


