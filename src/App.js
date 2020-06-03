import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Signin from './Components/Signin/Signin';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

const particlesOptions = {
    particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 800
            }
          }
    }
}
const initialState = {
  input:'',
  imageUrl:'',
  box: {},
  route: 'signin',
  clarifaiFace:'',
  image:[],
  isSignin: false,
  user: {
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:new Date()
  }
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      clarifaiFace:'',
      image:[],
      isSignin: false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:new Date()
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const result= [];
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    data.outputs[0].data.regions.map(region=>{
      result.push({
        top: region.region_info.bounding_box.top_row * height,
        right: width - (region.region_info.bounding_box.right_col * width),
        bottom: height - (region.region_info.bounding_box.bottom_row * height),
        left: region.region_info.bounding_box.left_col* width
      });
    });
    this.setState({image:result});
    return result;
  }

  onInputChange = event => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    fetch('/imageurl',{
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if (response){
        fetch('/image',{
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.calculateFaceLocation(response)
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({ isSignin: true})
    }
    this.setState({ route: route})
  }
  

  render(){
    return (
      <div className="App">
        <Particles className="particles" 
          params={particlesOptions}/>
          <Navigation isSignin={this.state.isSignin} onRouteChange={this.onRouteChange}/>
        { this.state.route ==='home' ?
          <div>
            <Logo/>
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
              image={this.state.image}
              />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition 
              imageUrl={this.state.imageUrl}
              image={this.state.image}/>
          </div>
          : (
            this.state.route ==='signin' || this.state.route=== 'signout' ?
            <Signin 
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
              />
            : 
            <Register 
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}/>
          )
        
          }
      </div>
    );
  }
  
}

export default App;
