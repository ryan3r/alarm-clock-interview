import React, {Component} from "react";
import "./App.css";
import Clock from "./Clock.js";
import AlarmControls from "./AlarmControls.js";
import Alarm from "./AlarmService.js";
import AlarmList from "./AlarmList.js";
import CreateAlarm from "./CreateAlarm.js";

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
    // Update the view everytime we load the alarms
    Alarm.onAlarmsReady = () => {
      this.waitForAlarm();

      this.setState({
        alarmTriggered: false,
        nextAlarm: Alarm.nextAlarm
      });
    };

    Alarm.loadAll();
  }

  waitForAlarm() {
    // Wait for the next alarm to go off
    this._alarmTimer = Alarm.waitForNextAlarm(() => {
      this.setState({
        alarmTriggered: true
      });

      // Start waiting for the next alarm
      this.waitForAlarm();
    });
  }

  componentWillUnmount() {
    clearTimeout(this._alarmTimer);
    Alarm.onAlarmsReady = undefined;
  }

  render() {
    return (
      <div>
        <Clock 
          nextAlarm={this.state.nextAlarm}/>
        <AlarmControls
          visible={this.state.alarmTriggered}
          dismiss={this.dismiss}/>
        <AlarmList
          alarms={Alarm.alarms}/>
        <CreateAlarm/>
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
