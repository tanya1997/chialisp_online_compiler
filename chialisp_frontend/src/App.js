import logo from './logo.svg';
import './App.css';
import './support.css';
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import CustomTabsHook from './components/CustomTabsHook'
import ResultPanel from './components/ResultPanel'
import { setupLanguage } from "./components/Editor/setup";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import SaveIcon from '@material-ui/icons/Save';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { saveAs } from 'file-saver';
import { SplitPane, SplitPaneProps, ResizerOptions, CollapseOptions, SplitPaneHooks } from "react-collapse-pane";

const API_URL = 'https://agile-chamber-85205.herokuapp.com';

function App() {
  const [result, setResult] = useState();
  const [brunResult, setBrunResult] = useState();
  const [brunText, setBrunText] = useState();

  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0,
      title: 'main',
      text: ''
    },
  ])

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const palletEditor = darkState ? "vs-dark" : "vs-light";
  const darkTheme = createTheme({
    palette: {
      type: palletType,
    }
  });

  function runBuild() {
    const url = `${API_URL}/api/run_command/`;
    var querystring = require('querystring');
    var result = {}

    tabList.map(tab => {
      result[tab.title + ".clvm"] = tab.text;
      console.log(" tabtext " + tab.text + " tabtitle " + tab.title)
    });

    console.log(JSON.stringify(result));
    axios.post(url, querystring.stringify(result)).then(response => setResult(response.data))
  }

  function brunBuild() {
    const url = `${API_URL}/api/brun_command/`;
    var querystring = require('querystring');
    var result = {}
    result["value"] = brunText;
    console.log(JSON.stringify(result));
    axios.post(url, querystring.stringify(result)).then(response => setBrunResult(response.data))
  }

  function saveFiles() {
    const zip = require('jszip')();
    tabList.map(tab => {
      zip.file(tab.title + ".clvm", tab.text);
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "project.zip");
    });
  }

  function myFunction() {
    setDarkState(!darkState);
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  setupLanguage();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6">
            Chialisp compiler
          </Typography>
          <Box
          flexGrow={1} 
            />
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<PlayArrowIcon />}
            onClick={() => { runBuild() }}
          >
            Run
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<SaveIcon />}
            onClick={() => { saveFiles() }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<Brightness6Icon />}
            onClick={() => { myFunction() }}
          ></Button>
          </ButtonGroup>
        </Toolbar>
        
      </AppBar>
      <SplitPane split="horizontal" className="split"
      resizerOptions={{
        css: {
          height: '10px',

          background: 'rgba(0, 0, 0, 0.1)',
        },
        hoverCss: {
          height: '10px',
          background: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      initialSizes={[10, 1]}
      collapse
      collapseOptions={{
        collapseDirection: "down"
      }}
      > 
          <CustomTabsHook setTabList={setTabList}
            tabList={tabList} editorTheme={palletEditor}></CustomTabsHook>
            <ResultPanel result={result} brunResult={brunResult} brunText={brunText} setBrunText={setBrunText} brunBuild={brunBuild}></ResultPanel>
      </SplitPane>

        

    </ThemeProvider>
  );
}

export default App;
