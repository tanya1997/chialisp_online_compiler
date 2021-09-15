import React, { Component, useState } from "react";
import {
    withStyles,
    AppBar,
    Tabs,
    Typography,
    Box,
    Tab,
    Grid,
    Button
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import MonacoEditor from 'react-monaco-editor'
import { monarchLanguage, configuration  } from "./Editor/chialispLang";
import { languageID } from './Editor/config';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogName(props){

  const handleTextChange = (e) => {
    props.setTitleValue(e.target.value)
  }

  return(
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Filename</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={props.titleValue}
            onChange={handleTextChange}
            margin="dense"
            id="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSaveClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default function CustomTabsHook (props) {
  const useStyles = makeStyles((theme) => ({
    tabs: {
      "& .MuiTab-wrapper": {
        flexDirection: "row-reverse",
        alignItems: 'end'
      },
      "& .MuiTab-labelIcon": {
        minHeight: 0,
        marginBottom: '6px',
        paddingTop: '5px'
       
      }
    }
  }));
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [tabValue, setTabValue] = useState(0)
  const [testValue, setTestValue] = useState('')
  const [titleValue, setTitleValue] = useState('new_file')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTab = (title_name) => {
    let id = props.tabList[props.tabList.length - 1].id + 1
    if (title_name === 'new_file')
        title_name = 'new_file' + id
    props.setTabList([...props.tabList, { key: id, id: id, text: '', title: title_name}])
  }

  const handleSaveClose = () => {
    addTab(titleValue)
    setOpen(false);
  };


    const editorWillMount = monaco => {
      if (!monaco.languages.getLanguages().some(({ id }) => id === languageID)) {
        // Register a new language
        monaco.languages.register({ id: languageID })
        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider(languageID, monarchLanguage)
        // Set the editing configuration for the language
        monaco.languages.setLanguageConfiguration(languageID, configuration)
      }
    }

    const handleTabChange = (event, value) => {
      console.log("value change" + value)
  //    console.log(" id " + tabList[value].id + " tabvalue " + tabValue + " testvalue " + testValue)
    var text = ''
      const editedTaskList = props.tabList.map(tab => {
        // if this task has the same ID as the edited task
        if (value === tab.id)
          {
            text = tab.text
          }

         if (tabValue === tab.id)
          {
            //
            console.log(" tabvalue " + tabValue + " testvalue " + testValue)
            return {...tab, text: testValue}
          }
          return tab;
        });
        props.setTabList(editedTaskList);
      setTabValue(value)
      //console.log("value " + value + " text " + tabList[value].text)
      setTestValue(text)
    };
  

  
    const deleteTab = (e) => {
      e.stopPropagation()
  
     
      let tabId = parseInt(e.target.id)
      let tabIDIndex = 0
      if (tabId === 0) {
       return
      }
      let tabs = props.tabList.filter((value, index) => {
        if (value.id === tabId) {
          tabIDIndex = index
        }
        console.log('delete 1')
        return value.id !== tabId
      })
  
      let curValue = parseInt(tabValue)
      if (curValue === tabId) {
        if (tabIDIndex === 0) {
          curValue = props.tabList[tabIDIndex + 1].id
        } else {
          curValue = props.tabList[tabIDIndex - 1].id
        }
      }
      setTabValue(curValue)
      props.setTabList(tabs)
      //
    }

    const editorChange=(value, event)=>{
      console.log('handle change')
      setTestValue(value)

      const editedTaskList = props.tabList.map(tab => {
         if (tabValue === tab.id)
          {
            return {...tab, text: value}
          }
          return tab;
        });
        props.setTabList(editedTaskList);
    }
  
    return (
      <div>
        <Grid container alignItems="center" justify="left">
          <Grid item xl={11} lg={11} md={11} sm={11} xs={9}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="simple tabs example"
              className={classes.tabs}
            >
              {props.tabList.map((tab) => (
                <Tab
                  key={tab.key.toString()}
                  value={tab.id}
                  label={tab.title + '.clvm'}
                  icon={tab.id !== 0 && <Close viewBox="0 -5 24 24" style={{verticalAlign: 'middle'}} id={tab.id} onClick={deleteTab} />}
                ></Tab>
                
              ))}
            </Tabs>
          </Grid>
          <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
            <Button variant="outlined" onClick={/*addTab*/handleClickOpen}>
              <Add />
            </Button>
          </Grid>
        </Grid>
        <div>
          <DialogName handleClose={handleClose} open={open} handleSaveClose={handleSaveClose}
          titleValue={titleValue} setTitleValue={setTitleValue}
          />


        <MonacoEditor
          language={languageID}
          theme={props.editorTheme}
          value={testValue}
          onChange={editorChange}
          editorWillMount={editorWillMount}
          height="90vh"
        />

        </div>
      </div>
    )
  }
/*{tabList.map((tab) => (
            <div
              value={tabValue}
              index={tab.id}
              key={tab.id}
            >
              <Editor></Editor>
            </div>
          ))}*/