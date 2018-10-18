import React, {Component} from "react";
import AlarmClip from "./analog-watch-alarm_daniel-simion.mp3";

class AlarmControls extends Component {
    constructor(props) {
        super(props);
        this._sound = React.createRef();
    }

    componentDidMount() {
        if(this._sound.current) {
            this._sound.current.play();
        }
    }

    render() {
        if(!this.props.visible) return <span/>;

        return (
            <div style={{textAlign: "center"}}>
                <button onClick={this.props.dismiss}>Dismiss</button>
                <span> (Sound on)</span>
                <audio src={AlarmClip} ref={this._sound}></audio>
            </div>
        );
    }
}

export default AlarmControls;
