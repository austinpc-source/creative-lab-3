import React from 'react';
import {Menu} from './menu'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuStyle: props.value,
      object: "",
      results: []
    };
    
    this.handleSignSelection = this.handleSignSelection.bind(this);
  }
  
  handleSignSelection(event, index) {
        let url = "https://rps101.pythonanywhere.com/api/v1/objects/" + event.target.value;
        
        fetch(url)
        .then((results) => {
          return(results.json());
        }).then((outcome) => {
          this.setState({object: outcome.object})
          this.setState({results: outcome["winning outcomes"]});
        });
    }
  
  render() {
    
    const outcomes = this.state.results.map((outcome) => 
      <li key={outcome[1]}>{this.state.object} {outcome[0]} {outcome[1]}</li>
    );
    
        
    return(
      <div>
      <p class="info"> Click on a sign below to find out which fellow signs it beats and/or loses to! </p>
        <div id="page-format">
          <Menu onClick={this.handleSignSelection} value="options-alt" />
          <ul>{outcomes}</ul>
        </div>
        
      </div>
    );
  }
}

export default App;
