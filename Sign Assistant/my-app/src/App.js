import React, { Fragment } from 'react';
import logo from './logo.png';
import './App.css';
import axios from 'axios';
import { useRecordWebcam } from 'react-record-webcam'
import Alphabetbased from './Alphabetbased';
import Sentence  from './Sentencebased';
import Wordbased  from './wordbased';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
 


  return (


    
    <Router>
  
  
     
         
        <Route exact path='/' component={Sentence} />
    
        <section>
          
            <Switch>
         
       
         
              <Route exact path='/wordbased' component={Wordbased} />
              <Route exact path='/Alphabetbased' component={Alphabetbased} />
             
          
            </Switch>
            </section>
       
        
      
      </Router>

 
  );
}

export default App;
