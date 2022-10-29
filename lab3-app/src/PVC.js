import React from 'react';
import Menu from './menu'
import './handsigns.css';

function SetImagePath(props) {
    let imagePath;
    if (props.value === 4 || props.value === 15 || props.value === 37 || props.value === 38 || 
        props.value === 52 || props.value === 62 || props.value === 63 || props.value === 74 || 
        props.value === 85 || props.value === 94) {
            imagePath = "/hand_images/" + props.value + ".gif";
    } else {
        imagePath = "/hand_images/" + props.value + ".png"
    }
    console.log(process.env.PUBLIC_URL);
    console.log(imagePath);
    
    return(
        <img src={process.env.PUBLIC_URL + imagePath} alt="" className="played-icon"/>
    );
}

function FetchButton(props) {
    return(
        <button className="fetch" onClick={props.onClick} class= "button-55">
            Play
        </button>
    );
}

function ClearButton(props) {
    return(
        <button className="clear" onClick={props.onClick}  class= "button-55">
            Clear
        </button>
    );
}

function ConvertFirstCharacterToUppercase(stringToConvert) {
  var firstCharacter = stringToConvert.substring(0, 1);
  var restString = stringToConvert.substring(1);
  return firstCharacter.toUpperCase() + restString;
}

class PVC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            p1Choice: "",
            computerChoice: "",
            results: "",
            objects: [{'object':'air'},{'object':'airplane'},{'object':'alien'},{'object':'axe'},{'object':'baby'},{'object':'beer'},{'object':'bicycle'},{'object':'bird'},{'object':'blood'},{'object':'book'},
                    {'object':'bowl'},{'object':'brain'},{'object':'butter'},{'object':'cage'},{'object':'camera'},{'object':'car'},{'object':'castle'},{'object':'cat'},{'object':'chain'},{'object':'chainsaw'},
                    {'object':'church'},{'object':'cloud'},{'object':'cockroach'},{'object':'community'},{'object':'computer'},{'object':'cross'},{'object':'cup'},{'object':'death'},{'object':'devil'},
                    {'object':'diamond'},{'object':'dragon'},{'object':'duck'},{'object':'dynamite'},{'object':'electricity'},{'object':'fence'},{'object':'film'},{'object':'fire'},{'object':'fish'},
                    {'object':'gold'},{'object':'grass'},{'object':'guitar'},{'object':'gun'},{'object':'heart'},{'object':'helicopter'},{'object':'home'},{'object':'king'},{'object':'laser'},{'object':'law'},
                    {'object':'lightning'},{'object':'man'},{'object':'math'},{'object':'medusa'},{'object':'money'},{'object':'monkey'},{'object':'moon'},{'object':'mountain'},{'object':'noise'},{'object':'nuke'},
                    {'object':'paper'},{'object':'peace'},{'object':'pit'},{'object':'planet'},{'object':'platimum'},{'object':'poison'},{'object':'police'},{'object':'porcupine'},{'object':'power'},{'object':'prayer'},
                    {'object':'prince'},{'object':'princess'},{'object':'queen'},{'object':'quicksand'},{'object':'rain'},{'object':'rainbow'},{'object':'robot'},{'object':'rock'},{'object':'satan'},{'object':'school'},
                    {'object':'scissors'},{'object':'sky'},{'object':'snake'},{'object':'spider'},{'object':'sponge'},{'object':'sun'},{'object':'sword'},{'object':'tv'},{'object':'tank'},{'object':'toilet'},{'object':'tornado'},
                    {'object':'train'},{'object':'tree'},{'object':'turnip'},{'object':'ufo'},{'object':'vampire'},{'object':'videogame'},{'object':'vulture'},{'object':'wall'},{'object':'water'},{'object':'whip'},{'object':'wolf'},
                    {'object':'woman'}]
        };
        
        this.handleSignSelection = this.handleSignSelection.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
        this.clearPlayerChoice = this.clearPlayerChoice.bind(this);
        this.computerChoice = this.computerChoice.bind(this);
    }
    
    handleSignSelection(event) {
        this.setState({p1Choice: event.target.value});
        this.computerChoice();
    }
    
    fetchResults() {
        if (this.state.p1Choice === "") {
            return;
        }
        
        let url = "https://rps101.pythonanywhere.com/api/v1/match?object_one=" + this.state.p1Choice + "&object_two=" + this.state.computerChoice;
        fetch(url)
        .then((results) => {
            return(results.json());
        }).then((outcome) => {
            this.setState({results: outcome});
        });
    }
    
    computerChoice() {
        let index = Math.floor(Math.random() * 101);
        this.setState({computerChoice: this.state.objects[index].object});
    }
    
    clearPlayerChoice() {
        this.setState({p1Choice: ""});
        this.setState({computerChoice: ""});
        this.setState({results: ""});
    }
    
    
    render() {
        let status = "";
        let winner = "";
        if (this.state.results !== "") {
            status = this.state.results.winner + " " + this.state.results.outcome + " " + this.state.results.loser;
            if (this.state.results.winner === ConvertFirstCharacterToUppercase(this.state.p1Choice)) {
                winner += "Player";
            } else {
                winner += "Computer";
            }
            winner += " wins!!!";
        }
        
        return(
            <div>
                <p class="info"> Click on a sign below to fight against the computer and click play to see who wins! </p>
                <Menu onClick={this.handleSignSelection} />
                <div class="leftbox">
                    <p>Player 1 chooses {this.state.p1Choice}</p>
                    <SetImagePath class="played-icon !important" value={1} />
                </div>
                <div class="rightbox">
                    <p>Computer chooses {this.state.computerChoice}</p>
                    <SetImagePath class="played-icon !important" value={1} />
                </div>
                <div class="middlebox">
                    <FetchButton onClick={this.fetchResults}/>
                    <ClearButton onClick={this.clearPlayerChoice}/>
                    <p>{status}</p>
                    <p>{winner}</p>
                </div>
            </div>
        );
    }
}

export default PVC;
