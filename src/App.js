import React, {Component} from "react";
import "./App.css";
import Clock from "./Clock.js";
import AlarmControls from "./AlarmControls.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);

    this.state = {
      alarmTriggered: false
    };
  }

  dismiss() {
    this.setState({
      alarmTriggered: false
    });
  }

  render() {
    return (
      <div>
        <Clock/>
        <AlarmControls visible={this.state.alarmTriggered} dismiss={this.dismiss}/>
        <div class="footer">
          <h3>Attibution</h3>
          <p>
            The alarm sound was recorded by Daniel Simion and can be found&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="http://soundbible.com/2197-Analog-Watch-Alarm.html">here</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
