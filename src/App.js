import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: 'volume: 50',
      volume: 50,
    }
    this.playAudio = this.playAudio.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  playAudio (id, buttonActiveID) {
    //plays audio of the pressed button, depending on the given volume by the user
    let audio = document.getElementById(id); 
    audio.volume = this.state.volume/100;
    audio.currentTime = 0;
    audio.play();
    
    //changes the button of the used button
    const button = document.getElementById(buttonActiveID);
    button.style.backgroundColor = "#eca2fc";  // Temporary background color

    setTimeout(() => {
      button.style.backgroundColor = "";  // Reset background color
    }, 300);

  }
  
  updateMessage(id) {
    this.setState({
      currentMessage: id
    })
  }


  handleKeyPress(event) {
    const key = event.key.toUpperCase();
    const validKeys = [
      { key: 'Q', message: 'heater-1' },
      { key: 'W', message: 'heater-2' },
      { key: 'E', message: 'heater-3' },
      { key: 'A', message: 'heater-4' },
      { key: 'S', message: 'clap' },
      { key: 'D', message: 'open-hh' },
      { key: 'Z', message: 'kick-n-hat' },
      { key: 'X', message: 'kick' },
      { key: 'C', message: 'closed-hh' },
    ];
    
    const foundKeyData = validKeys.find(data => data.key === key);
    
    if(foundKeyData) {
      this.playAudio(key, foundKeyData.message);
      
      this.updateMessage(foundKeyData.message);
    }
  }

  handleVolumeChange(event) {
    this.setState({
      volume: event.target.value,
    })
    this.updateMessage("volume: "+event.target.value);
  }

  render () {
    return (
      <div className='App'>
        <div id='wrapper'>
          <div id='drum-machine'>

            <button className='drum-pad' id='heater-1' 
            onClick={() => {this.playAudio('Q', 'heater-1'); this.updateMessage('heater-1');}}>Q
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' className='clip' id='Q'></audio>
            </button>
            <button className='drum-pad' id='heater-2' 
            onClick={() => {this.playAudio('W', 'heater-2'); this.updateMessage('heater-2');}}>W
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' className='clip' id='W'></audio>
            </button>
            <button className='drum-pad' id='heater-3' 
            onClick={() => {this.playAudio('E', 'heater-3'); this.updateMessage('heater-3');}}>E
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' className='clip' id='E'></audio>
            </button>
            <button className='drum-pad' id='heater-4' 
            onClick={() => {this.playAudio('A', 'heater-4'); this.updateMessage('heater-4');}}>A
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' className='clip' id='A'></audio>
            </button>
            <button className='drum-pad' id='clap' 
            onClick={() => {this.playAudio('S', 'clap'); this.updateMessage('clap');}}>S
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' className='clip' id='S'></audio>
            </button>
            <button className='drum-pad' id='open-hh' 
            onClick={() => {this.playAudio('D','open-hh'); this.updateMessage('open-hh');}}>D
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' className='clip' id='D'></audio>
            </button>
            <button className='drum-pad' id='kick-n-hat' 
            onClick={() => {this.playAudio('Z','kick-n-hat'); this.updateMessage('kick-n-hat');}}>Z
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' className='clip' id='Z'></audio>
            </button>
            <button className='drum-pad' id='kick' 
            onClick={() => {this.playAudio('X','kick'); this.updateMessage('kick');}}>X
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' className='clip' id='X'></audio>
            </button>
            <button className='drum-pad' id='closed-hh' 
            onClick={() => {this.playAudio('C','closed-hh'); this.updateMessage('closed-hh');}}>C
              <audio src='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' className='clip' id='C'></audio>
            </button>

            
          </div>
          <div id='display'>{this.state.currentMessage}</div>
          <input type="range" id="volume-slider" value={this.state.volume} onChange={this.handleVolumeChange}></input>
          <img src={process.env.PUBLIC_URL + '/fcc_secondary_large.png'} alt="FCC Secondary Large" />
        </div>
      </div>
    );
  }
}

export default App;