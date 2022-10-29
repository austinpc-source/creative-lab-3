import React from 'react';
//import test from './hand_images/1.png'
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
        <img src={process.env.PUBLIC_URL + imagePath} alt="" className={props.className}/>
    );
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        
        this.getHandSigns = this.getHandSigns.bind(this);
    }
    
    getHandSigns() {
        if (this.state.objects != null) {
            return;
        }
        let url = "https://rps101.pythonanywhere.com/api/v1/objects/all"
        fetch(url)
        .then((response) => {
            return(response.json());
        }).then((signs) => {
            this.setState({objects:signs});
        });
    }
    
    render() {
        const signs = this.state.objects.map((signName, index) =>
            <button className="object" value={signName.object} onClick={(event) => this.props.onClick(event, index)} class="button-signs">
                <SetImagePath value={index} className="icon" />
                {signName.object}
            </button>
        ); 
        return(
            <div id="options">{signs}</div>
        );
    }
}

export { Menu,SetImagePath };