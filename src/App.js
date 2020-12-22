import React, { useState } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register'
import './App.css';



const particlesOptions = {
  "fps_limit": 28,
  "particles": {
      "collisions": {
          "enable": true
      },
      "number": {
          "value": 300,
          "density": {
              "area": 200,
              "enable": true
          }
      },
      "line_linked": {
          "enable": true,
          "distance": 40,
          
      },
      "move": {
          "speed": 0.5
      }, 
  },
  "retina_detect": true,
}



 
function App() {

  const [input, setInput] = useState('');

  const [faceDetect, setFaceDetect] = useState('');

  const [ route, setRoute] = useState('signout');

  const [ isSignedOn, setIsSignedOn] = useState('');

  const [ user , setUser] = useState({
    id:'',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''

  });
  
  const loadUser = (data) =>
  setUser({
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    entries: data.entries,
    joined: data.joined
  })

  const displayFaceBox = (box) => {
    setFaceDetect(box)
    
  };

  const calcFaceBox =(grid) =>{
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    
    const height = Number(image.height);
    
    return{
      leftCol: grid.left_col * width,
      topRow: grid.top_row * height,
      rightCol: width - (grid.right_col * width),
      bottomRow: height - (grid.bottom_row * height)
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value)
  };

  const onSubmit = () => {
    setFaceDetect('')
    
    fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            setUser(prevUser => ({
              ...prevUser, 
              entries: count
            }))
          })
          .catch(err => console.log(err));
          return response.outputs[0].data.regions[0].region_info.bounding_box;}
        })
      .then(box =>{
        displayFaceBox(calcFaceBox(box))
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) =>{
    if (route ==='signout'){
      setIsSignedOn(false)
      setInput('')
      setFaceDetect('')
    }else if( route ==='home'){
      setIsSignedOn(true)
    }
    setRoute(route);
  }

  return  (
    <div className="App">
      <Particles className='particles' 
      params={particlesOptions}/>
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedOn}/>
      
      { route === 'home' 
        ?<div>
          <Logo/>
          <Rank name ={user.name} entries={user.entries}/>
          <ImageLinkForm inputChange={onInputChange} onSubmit={onSubmit}/>
          <FaceRecognition input ={input} faceDetect ={faceDetect}/>
        </div>
         :(
          route === 'signout'
          ?<SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
          :<Register onRouteChange={onRouteChange} loadUser={loadUser}/> 
        )}
    </div>
  )
}

export default App;
