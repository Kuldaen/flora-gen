import React, { Component } from "react";

import { Box } from "@mui/material";
import SceneViewer from "./components/SceneViewer"

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Box component="div"
        sx={{
          p: 2,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
            <SceneViewer />
        </Box>
      </div>
    );
  }
}

export default App;
