import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PVP from './PVP'
import PVC from './PVC'
import reportWebVitals from './reportWebVitals';


class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: true,
      showPVP: false,
      showPVC: false
    }
    
    this.setInfo = this.setInfo.bind(this);
    this.setPVP = this.setPVP.bind(this);
    this.setPVC = this.setPVC.bind(this);
  }
  
  setInfo() {
    this.setState({showInfo: true});
    this.setState({showPVP: false});
    this.setState({showPVC: false});
  }
  
  setPVP() {
    this.setState({showInfo: false});
    this.setState({showPVP: true});
    this.setState({showPVC: false});
  }
  
  setPVC() {
    this.setState({showInfo: false});
    this.setState({showPVP: false});
    this.setState({showPVC: true});
  }
  
  render() {
    return(
      <div>
        <button onClick={() => this.setInfo()}>Learn about handSigns</button>
        <button onClick={() => this.setPVP()}>Play against a friend</button>
        <button onClick={() => this.setPVC()}>Play against the computer</button>
        {this.state.showInfo ? <App /> : null}
        {this.state.showPVP ? <PVP /> : null} 
        {this.state.showPVC ? <PVC /> : null} 
      </div>
    )
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Display />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
