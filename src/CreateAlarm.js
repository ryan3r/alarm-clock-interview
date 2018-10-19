import React, {Component} from "react";
import Alarm from "./AlarmService";

class AlarmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "",
            day: "0"
        };

        this.createAlarm = this.createAlarm.bind(this);
    }

    updateText(prop) {
        return (event) => {
            this.setState({
                [prop]: event.target.value
            });
        };
    }

    async createAlarm(event) {
        event.preventDefault();
        let match = this.state.time.match(/(\d+):(\d+)/);

        if(!match) {
            alert(`Expected time in military format`);
            return;
        }

        let seconds = ((+match[1] * 60) + +match[2]) * 60;

        const res = await (await fetch(`//localhost:3001/alarms/create?seconds=${seconds}&day=${this.state.day}`))
            .text();
        
        // reload the alarms
        Alarm.loadAll();
        if (res !== "Ok") {
            alert("An error occured while creating your alarm");
        }

        this.setState({
            time: "",
            day: "0"
        });
    }

    render() {
        return (
            <form onSubmit={this.createAlarm} style={{textAlign: "center", marginTop: "15px"}}>
                <select onChange={this.updateText("day")} value={this.state.day}>
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                </select>
                <input type="time" value={this.state.time} onChange={this.updateText("time")}/>
                <button>Create</button>
            </form>
        );
    }
}

export default AlarmList;
