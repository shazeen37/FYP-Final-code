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
    filename: "test-filename3",
    fileType: "mp4",
    width: 640,
    height: 640
  };
  const recordWebcam = useRecordWebcam(OPTIONS);

 
  

console.log(Query)
 const Predict = async (formData) =>{
console.log(formData)
    axios
      .post('http://localhost:5000/predict', formData) 
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
  // setsshowbuttons(true)

   var file = new File([ blob ], "nametestW", { type: "video/mp4", })
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

  const retake = async (e) => {
    
    console.log('helllooo')
    recordWebcam.retake()
  
  };

  const Cancel = async (e) => {
    
    setsshowbuttons(true)
    recordWebcam.stop()
  
  };


  return (
    <div>
      {Querysend?(<video
         id="video"
          ref={recordWebcam.previewRef}
          style={{
            width:'315.98px',
            height: '165.98px',
           
          }} 
          
          autoPlay
          muted
          loop
        />):(  <video id="video"   ref={recordWebcam.webcamRef} autoPlay muted></video>)}
 
  
    <div className="split-left">
      <div className="centered">
        <img src={logo}></img>
        <h1 id="text" className="intro-steps">Word Based</h1>
        {!Querysend?(<div><h4><span className="subtext">Perform the sign language word </span></h4>
       </div>):(<div>
     
          
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
      <button className="button-59"  onClick={(e) => Cancel()}>Cancel</button>
      </Fragment>)}
     
     
             
           
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
