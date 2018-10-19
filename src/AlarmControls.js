import React, {Component} from "react";
import AlarmClip from "./analog-watch-alarm_daniel-simion.mp3";

class AlarmControls extends Component {
    constructor(props) {
        super(props);
        this._sound = new Audio(AlarmClip);
        this._sound.loop = true;
    }

    componentWillUnmount() {
        // stop the sound before we get destroyed
        this._sound.pause();
    }

    render() {
        if(!this.props.visible) {
            // stop the sound
            this._sound.pause();
            return <span/>;
        }

        // play/resume when we know we ar visible
        this._sound.play();

        return (
            <div style={{textAlign: "center"}}>
                <button onClick={this.props.dismiss}>Dismiss</button>
                <span> (Sound on)</span>
            </div>
        );
    }
}

export default AlarmControls;
