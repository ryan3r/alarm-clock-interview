import React, {Component} from "react";
import "./Clock.css";

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

    render() {
        let amPm = "am";
        // get the time
        let hour = this.state.date.getHours();
        let minute = this.state.date.getMinutes().toString().padStart(2, 0);
        let second = this.state.date.getSeconds().toString().padStart(2, 0);

        // convert to a 12 hour format
        if(hour >= 12) {
            amPm = "pm";
            hour -= 12;
        }

        if(hour === 0) {
            hour = 12;
        }

        return (
            <div className="clock">
                <div className="clock-text">{hour}:{minute}:{second}{amPm}</div>
            </div>
        );
    }
}

export default Clock;
