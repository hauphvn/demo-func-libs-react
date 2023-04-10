import { useState } from 'react'
import './App.css'
import UploadFileAzure from "../src/components/UploadFileAzure/UploadFileAzure";
import UploadFileLocal from "./components/UploadFileLocal/UploadFileLocal";

function App() {

  return (
    <div className="App">
     <UploadFileLocal/>
    </div>
  )
}

export default App
