import React from "react";
import { Button, Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PublicContext } from "../../Template/Context/Public";
import { FixedSizeList } from 'react-window';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function Page1() {
  const { publicCtx: { ssx } } = React.useContext(PublicContext);

  document.title = "Kepler Functions"
  const [value, setValue] = React.useState(0);
  const [putKey, setPutKey] = React.useState('');
  const [putValue, setPutValue] = React.useState('');
  const [getKey, setGetKey] = React.useState('');
  const [deleteKey, setDeleteKey] = React.useState('');

  const [response, setResponse] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setResponse('');
  };

  const orbitPut = async () => {
    if (!!putKey && !!putValue) {
      try {
        const responseData = await ssx.orbitPut(putKey, putValue);
        console.log(responseData);
        if (responseData.ok) {
          setResponse(`${putKey} put successfully`);
        } else {
          setResponse(`${putKey} put failed`);
        }
      } catch (error) {
        console.log(error);
        setResponse(error.message || "An error occurred.");
      }

    }
  }

  const orbitGet = async () => {
    if (!!getKey) {
      try {

        const responseData = await ssx.orbitGet(getKey);
        console.log(responseData);
        if (responseData.ok) {
          setResponse(JSON.stringify(responseData.data));
        } else {
          setResponse(`${getKey} get failed`);
        }
      } catch (error) {
        console.log(error);
        setResponse(error.message || "An error occurred.");
      }
    }
  }

  const orbitDelete = async () => {
    if (!!deleteKey) {
      try {

        const responseData = await ssx.orbitDelete(deleteKey);
        console.log(responseData);
        if (responseData.ok) {
          setResponse(`${deleteKey} delete successfully`);

        } else {
          setResponse(`${deleteKey} delete failed`);
        }
      } catch (error) {
        console.log(error);
        setResponse(error.message || "An error occurred.");
      }
    }
  }

  const orbitList = async () => {
    try {

      const responseData = await ssx.orbitList();
      console.log(responseData.data);
      if (responseData.ok) {
        setResponse(responseData.data);


      } else {
        setResponse(`list failed`);
      }
    } catch (error) {
      console.log(error);
      setResponse(error.message || "An error occurred.");
    }
  }


  return (
    <>
      <Container maxWidth="sm" align="center">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Put" {...a11yProps(0)} />
            <Tab label="Get" {...a11yProps(1)} />
            <Tab label="List" {...a11yProps(2)} />
            <Tab label="Delete" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="outlined-basic" variant="outlined" label="key" value={putKey} onChange={(e) => setPutKey(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic" variant="outlined" label="value" value={putValue} onChange={(e) => setPutValue(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={orbitPut}>Submit</Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="outlined-basic" variant="outlined" label="key" value={getKey} onChange={(e) => setGetKey(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={orbitGet}>Submit</Button>
            </Grid>
          </Grid>

        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" onClick={orbitList}>Submit</Button>
            </Grid>
          </Grid>
          {response && response instanceof Array &&
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {response.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}

            </List>
          }

        </TabPanel>
        <TabPanel value={value} index={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="outlined-basic" variant="outlined" label="key" value={deleteKey} onChange={(e) => setDeleteKey(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={orbitDelete}>Submit</Button>
            </Grid>
          </Grid>

        </TabPanel>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {response && typeof (response) === 'string' && <Typography>{response}</Typography>}
        </Box>
      </Container>
    </>
  );
}
