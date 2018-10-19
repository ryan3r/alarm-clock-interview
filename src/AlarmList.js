import React, {Component} from "react";
import Alarm from "./AlarmService";
import BASE_URL from "./config.js";

class AlarmList extends Component {
    // create a function to delete an alarm
    makeDelete(id) {
        return async (event) => {
            event.preventDefault();

            const res = await (await fetch(`${BASE_URL}/alarms/delete/${id}`)).text();
            // reload the alarms
            Alarm.loadAll();
            if (res !== "Ok") {
                alert("An error occured while deleting your alarm");
            }
        };
    }

    render() {
        // create a list of alarms with their alert time and the time until their next alert
        let alarms = this.props.alarms.map(alarm => {
            return <li key={`${alarm.id}`} className="alarm-list-alarm">
                {alarm.timeString} (Next alert in {alarm.nextAlertString})
                [<a href={`/alarms/delete/${alarm.id}`} onClick={this.makeDelete(alarm.id)}>Delete</a>]
            </li>;
        });

        return (
            <ul className="alarm-list">
                {alarms}
            </ul>
        );
    }
}

export default AlarmList;
