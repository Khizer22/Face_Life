
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particleOptions2 = {
  // background: {
  //   color: {
  //     value: "#0d47a1",
  //   },
  // },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 2,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
      // opacity:0.5,
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: false

}

const initialState = {
  input : '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  updateGeneralInfoText: []
}

class App extends Component {

  constructor(){
    super();
    this.state= initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{

    let faceInfo = [];
    //For each region, do the rest
    for (let i=0; i< data.outputs[0].data.regions.length; i++){
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      const faceBox = {  
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

      faceInfo.push(faceBox);
    }

    return faceInfo;
}

  displayFaceBox = (boxes) =>{
    // console.log(boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    // console.log(Clarifai);
    this.setState({imageURL: this.state.input});
    
    //API to get face location
    fetch(`https://pure-ravine-89852.herokuapp.com/imageurl`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response){
        //API to get tool use count
        fetch(`https://pure-ravine-89852.herokuapp.com/image`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(console.log);

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));

    //API to get general information
    fetch(`https://pure-ravine-89852.herokuapp.com/generalimageurl`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response){
        this.setState({updateGeneralInfoText: response.outputs[0].data.concepts}); //general image info 
      }
      
    })
    .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState(initialState);
    } else if (route === 'home'){
      this.setState({isSignedIn : true})
    }

    this.setState({route: route});
  }

  async particlesInit (main) {
    console.log(main);
    // let tsParticles = main;
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  }

  particlesLoaded (container){
    // console.log(container);
  };

  render(){

    const {isSignedIn, boxes, imageURL, route, user, updateGeneralInfoText} = this.state;

    return (
      <div className="App">
        <Particles className="tsparticles" params={particleOptions2} init={this.particlesInit} loaded={this.particlesLoaded} />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />

        {route ==='home' 
          ? <div>  
              <Rank userName={user.name} userEntries={user.entries}/>
              <FaceRecognition boxes={boxes} imageURL={imageURL}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
                generalInfoText={updateGeneralInfoText}
              />
          </div>
          : route ==='signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
          
        
      </div>
    );
  }
}

export default App;
