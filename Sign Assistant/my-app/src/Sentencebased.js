import React, { Fragment, useState,useEffect  } from 'react';
import logo from './logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecordWebcam } from 'react-record-webcam'
import imgagee from './letters/a.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function Sentensebased() {
  const [showbuttons, setsshowbuttons] = useState(true);
  const [Querysend, setsQuerysend] = useState(false);
  const [Query, setsQuery] = useState('');
  const [Querryresponse, setsQuerryresponse] = useState('');
  const [gifs, setgifs] = useState([]);

  const OPTIONS={
    filename: "test-filename",
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
        if(Query)
        {
          setsQuery(Query+" "+ res.data)

        }
        else{
          setsQuery(res.data)
        }
        
      


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

const Assistant = async ()=>
{  setsQuerysend(true)
  setsshowbuttons(true)
 
  console.log(`http://localhost:8001/${Query}`)
  axios.get(`http://localhost:8001/${Query}`) 
  .then((res) => {
    //console.log(res)
      setsQuerysend(true)
      text_play(res.data)
   setsshowbuttons(true)
   console.log(res.data)
    setsQuerryresponse(res.data)
    
  }).catch(err => console.log(err));
}
  

  const saveFile = async () => {
    const blob = await recordWebcam.getRecording(OPTIONS);
  //  console.log(blob)
  //recordWebcam.download()
  console.log({ blob });
  
  setsQuerysend(true)
   setsshowbuttons(true)

   var file = new File([ blob ], "nametest", { type: "video/mp4", })
   var formData = new FormData();
  await formData.append('video', file, file.name);
 console.log(file)
   Predict(formData)
  
  
   
    };


    const Nextword = async () => {
      const blob = await recordWebcam.getRecording(OPTIONS);
    //  console.log(blob)
    //recordWebcam.download()
    console.log({ blob });
    
    setsQuerysend(true)
     //setsshowbuttons(true)
     recordWebcam.retake()
     var file = new File([ blob ], "nametest", { type: "video/mp4", })
     var formData = new FormData();
    await formData.append('video', file, file.name);
  
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

 

  function text_play(txt) {
    const dic = ['hey', 'mate', 'where', 'hi','there', 'help', 'can', 'how', 'islamabad', 'pakistan', 'is', 'congratulations', 'capital', 'birthday', 'thank you',
        'friend', 'goodbye', 'good bye', 'bye', 'of', 'america', 'alter', 'act', 'acer', 'accomplish', 'able'];

    const alphabets = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ];

    var text = txt

    var ar_b = text.split(" ");
    console.log(ar_b)
    const ar = ar_b.map((element) => {
        return element.toLowerCase();
    });


    
    for (let i = 0; i < ar.length; i++) {
        if (dic.includes(ar[i])) {
          let path=`./PSL_Gifs/${ar[i]}.gif`;
         
          setgifs(gifs => [...gifs, path]);
        } else {
            var c = ar[i].split("");

            const chars = c.map((element) => {
                return element.toLowerCase();
            });

            for (let j = 0; j < chars.length; j++) {
                if (alphabets.includes(chars[j])) {
                  let path2=`./letters/${chars[j]}.png`;
                  setgifs(gifs => [...gifs, path2]);
                
                 // console.log('Path: ',path2)
                  
                    // imgArray[k].src = "letters\\" + chars[j] + ".png";
                    // k++;
                }
            }
        }
    }

    
}


// function myLoop() {
//   console.log(document.getElementById('logo'))
//   console.log(gifs.length)
// for (let i = 0; i < gifs.length; i++) {
 
//   setInterval(function () {
      
    
//       document.getElementById("gifs2").src = require(`${gifs[i]}`); //  your code here
      
      
//   }, 180);

//   if( i<gifs.length)
//       {
//         myLoop()
//       }
//       else{
//       break
//       }
 
// }
// }


  return (
    <div>
      {showbuttons?(<video
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
    <Link to='/wordbased'>By Word | </Link>
    <Link to='/Alphabetbased'>A to Z</Link>
      <div className="centered">
        <img id='logo'src={logo}></img>
        <h1 id="text" className="intro-steps">Hi, Your Sign Assist here! </h1>
        {!Querysend?(<div><h4><span className="subtext">There is alot I can help with. Here are a few popular actions:</span></h4>
        <p>Tell me Joke?</p>
        <p>Tell me story?</p>
        <p>What's weather today?</p></div>):(<div>
          <h1 id="text" className="intro-steps">Query: {Query}</h1>
          
        </div>)}
        <div id="training-list">
          <div id="example-list">
  
  
          </div>
          <div id="add">
         
             
             
            {showbuttons?( <Fragment> 
              <button  className="button-59" onClick={(e) => open()}>Start Saying</button>
             </Fragment>
            
            ):(
            <Fragment>
               <button className="button-59"  onClick={(e) => start()}>Start</button>
               <button className="button-59"  onClick={(e) => stop()}>Stop</button>
      <button className="button-59"  onClick={(e) => retake()}>Retake</button>
      <button className="button-59"  onClick={(e) => Nextword()}>Next Word</button>
      <button className="button-59"  onClick={(e) => Assistant()}>Submit</button></Fragment>)}
     
     
              <p><b>Perform each word for 3 sec </b> </p>
              <p>e.g If you intend to ask "What's <b><em>the weather</em></b>?" & "What's <b><em>the time</em></b>?" then <b><em>perfom </em></b> each  <b><em>word</em></b> for 30 sec in your webcam screen <b><em>then click</em></b> Send to get response</p>
           
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
            
            {Querryresponse}
          </span>

        
 
        
        </h1>
        {Querysend?(<Fragment>
            <Carousel  autoPlay={true} interval={1800}>
              {gifs.map(function(image) {
 return (
  <div>
  <img src={require(`${image}`)} />
 
</div>
 );
})}
               
            </Carousel>
         
    
        
            </Fragment>):('')}
      </div>
    </div>
    
    
    
  
  </div>
  );
}

export default Sentensebased;
