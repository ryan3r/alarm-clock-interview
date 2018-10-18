import React, {Component} from "react";
import "./Clock.css";

// Convert from a 24 hour format to a 12 hour format
function convertTo12Hour(hour) {
    let amPm = "am";
    if(hour >= 12) {
        amPm = "pm";
        hour -= 12;
    }

    if(hour === 0) {
        hour = 12;
    }

    return {hour, amPm};
}

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

        let time = this.props.nextAlarm.nextAlert;

        // Break the time into individual componenets
        let second = (time % 60).toString().padStart(2, 0);
        time = Math.floor(time / 60);

        let minute = (time % 60).toString().padStart(2, 0);
        time = Math.floor(time / 60);

        let hour = (time % 24).toString().padStart(2, 0);
        time = Math.floor(time / 24);

        let day = time;

        return <div className="clock-next-alarm">Next alarm in {day}:{hour}:{minute}:{second}</div>
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
