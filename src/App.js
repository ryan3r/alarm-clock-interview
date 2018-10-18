import React, {Component} from "react";
import "./App.css";
import Clock from "./Clock.js";
import AlarmControls from "./AlarmControls.js";
import Alarm from "./AlarmService.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);

    this.state = {
      alarmTriggered: false
    };
  }

  // Dismiss the alarm
  dismiss() {
    this.setState({
      alarmTriggered: false
    });
  }

  componentDidMount() {
    // Wait for the next alarm to go off
    this._alarmTimer = Alarm.waitForNextAlarm(() => {
      this.setState({
        alarmTriggered: true
      });

      // Start waiting for the next alarm
      this.componentDidMount();
    });
  }

  componentWillUnmount() {
    clearTimeout(this._alarmTimer);
  }

  render() {
    return (
      <div>
        <Clock 
          nextAlarm={Alarm.nextAlarm}/>
        <AlarmControls
          visible={this.state.alarmTriggered}
          dismiss={this.dismiss}/>
        <div className="footer">
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
