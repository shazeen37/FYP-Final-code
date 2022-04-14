import React, { Fragment, useState } from 'react';
import logo from './logo.png';
import axios from 'axios';
import { useRecordWebcam } from 'react-record-webcam'
function Wordbased() {
  const [showbuttons, setsshowbuttons] = useState(true);
  const [Querysend, setsQuerysend] = useState(false);
  const [Query, setsQuery] = useState('');
  const [Querryresponse, setsQuerryresponse] = useState('');
  const OPTIONS={
    filename: "test-filename2",
    fileType: "mp4",
    width: 480,
    height: 848
  };
  const recordWebcam = useRecordWebcam(OPTIONS);

 
  

console.log(Query)
 const Predict = async (formData) =>{
console.log(formData)
    axios
      .post('http://localhost:5000/Atoz', formData) 
      .then((res) => {
        console.log(res.data);
        setsQuery(res.data)
        


      }).catch(err => console.log(err));;
  
    // fetch(`/predict`, requestOptions)
    //     .then(response => console.log(response.json()))
    //     .then(data => {
    //       console.log(data)
    //       // this.setState({
    //       // isLoading: true
    //       // })})
    //     });

    
  }


  const saveFile = async () => {
    const blob = await recordWebcam.getRecording(OPTIONS);
  //  console.log(blob)
  //recordWebcam.download()
  console.log({ blob });
  
  setsQuerysend(true)

  recordWebcam.stop()
   var file = new File([ blob ], "nametest2", { type: "video/mp4", })
   var formData = new FormData();
  await formData.append('video', file, file.name);
 console.log(file)
   Predict(formData)
  
  
   
    };
  const open = async (e) => {
    setsshowbuttons(false)
    
    console.log('helllooo')
    const blob = await recordWebcam.getRecording();
    recordWebcam.open()
   
  
  };

  const start = async (e) => {
    
    console.log('helllooo')
    recordWebcam.start()
    
  
  };

  const stop = async (e) => {
    
    console.log('helllooo')
    recordWebcam.stop()
  
  };

  const Cancel = async (e) => {
    
    setsshowbuttons(true)
    recordWebcam.stop()
  
  };

  const retake = async (e) => {
    
    console.log('helllooo')
    recordWebcam.retake()
  
  };

 


  return (
    <div>
      {<video id="video"   ref={recordWebcam.webcamRef} autoPlay muted></video>}
 
  
    <div className="split-left">
      <div className="centered">
        <img src={logo}></img>
        <h1 id="text" className="intro-steps">Alphabet based </h1>
        {!Querysend?(<div><h4><span className="subtext">Perform the sign language word</span></h4>
     </div>):(<div>
          <h1 id="text" className="intro-steps">Query: {Query}</h1>
          
        </div>)}
        <div id="training-list">
          <div id="example-list">
  
  
          </div>
          <div id="add">
         
             
             
            {showbuttons?( <button  className="button-59" onClick={(e) => open()}>Start Saying</button>):(
            <Fragment>
               <button className="button-59"  onClick={(e) => start()}>Start</button>
               <button className="button-59"  onClick={(e) => stop()}>Stop</button>
      <button className="button-59"  onClick={(e) => retake()}>Retake</button>
      <button className="button-59"  onClick={(e) => saveFile()}>Submit</button>
      <button className="button-59"  onClick={(e) => Cancel()}>Cancel</button></Fragment>)}
     
     
              <p><b>Perform each Alphabet for 3 sec </b> </p>
              <p>e.g If you intend to perfom "A" or "B" perfom each Alphabet for 30 sec in your webcam screen <b><em>then click</em></b> Send to get response</p>
           
          </div>
          <p id="count"></p>
          <div id="action-btn"></div>
        </div>
        

    </div>
 </div>
    <div className="split-right">
      <div className="centered">
        <div id="loader"></div>
        <h1>
          <span id="answerText">
            {Query}
          </span>
          <span id="interimText"></span>
        </h1>
      </div>
    </div>
    
    
    
  
  </div>
  );
}

export default Wordbased;