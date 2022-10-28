import React from 'react';
import Menu from './menu'
import './handsigns.css';


function FetchButton(props) {
    return(
        <button className="fetch" onClick={props.onClick}>
            Play
        </button>
    );
}

function ClearButton(props) {
    return(
        <button className="clear" onClick={props.onClick}>
            Clear
        </button>
    );
}


function ConvertFirstCharacterToUppercase(stringToConvert) {
  var firstCharacter = stringToConvert.substring(0, 1);
  var restString = stringToConvert.substring(1);
  return firstCharacter.toUpperCase() + restString;
}

class PVP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            p1Turn: true,
            p1Choice: "",
            p2Choice: "",
            results: "",
        };
        
        this.handleSignSelection = this.handleSignSelection.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
        this.clearPlayerChoice = this.clearPlayerChoice.bind(this);
    }
    
    handleSignSelection(event) {
        if (this.state.p1Choice !== "" && this.state.p2Choice !== "") {
            return;
        }
        if(this.state.p1Turn) {
            this.setState({p1Choice: event.target.value});
        } else {
            this.setState({p2Choice: event.target.value});
        }
        this.setState({p1Turn: !this.state.p1Turn})
    }
    
    fetchResults() {
        if (this.state.p1Choice === "" || this.state.p2Choice === "") {
            return;
        }
        let url = "https://rps101.pythonanywhere.com/api/v1/match?object_one=" + this.state.p1Choice + "&object_two=" + this.state.p2Choice;
        fetch(url)
        .then((results) => {
            return(results.json());
        }).then((outcome) => {
            this.setState({results: outcome});
        });
    }
    
    clearPlayerChoice() {
        this.setState({p1Choice: ""});
        this.setState({p2Choice: ""});
        this.setState({results: ""});
    }
    
    render() {
        
        let status = null;
        let winner = null;
        if (this.state.results !== "") {
            status = this.state.results.winner + " " + this.state.results.outcome + " " + this.state.results.loser;
            winner = "Player ";
            if (this.state.results.winner === ConvertFirstCharacterToUppercase(this.state.p1Choice)) {
                winner += "1";
            } else {
                winner += "2";
            }
            winner += " wins!!!";
        }
        
        return(
            <div>
                <Menu onClick={this.handleSignSelection} />
                <p>Player 1 choice: {this.state.p1Choice}</p>
                <p>Player 2 choice: {this.state.p2Choice}</p>
                <FetchButton onClick={this.fetchResults}/>
                <ClearButton onClick={this.clearPlayerChoice}/>
                <p>{status}</p>
                <p>{winner}</p>
            </div>
        );
    }
}

export default PVP;