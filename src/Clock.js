import React, {Component} from "react";
import "./Clock.css";
import convertTo12Hour from "./12hour.js";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentWillMount() {
        // Update the clock every second
        this._timer = setInterval(() => {
            this.setState({
                date: new Date()
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    renderTime() {
        // Get the time
        let {hour, amPm} = convertTo12Hour(this.state.date.getHours());
        let minute = this.state.date.getMinutes().toString().padStart(2, 0);
        let second = this.state.date.getSeconds().toString().padStart(2, 0);

        return <div className="clock-text">{hour}:{minute}:{second}{amPm}</div>;
    }

    renderNextAlarm() {
        if(!this.props.nextAlarm) {
            return <span/>;
        }

        return <div className="clock-next-alarm">Next alarm in {this.props.nextAlarm.nextAlertString}</div>
    }

    render() {
        return (
            <div className="clock">
                {this.renderTime()}
                {this.renderNextAlarm()}
            </div>
        );
    }
}

export default Clock;
