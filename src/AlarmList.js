import React, {Component} from "react";
import Alarm from "./AlarmService";

class AlarmList extends Component {
    makeDelete(i) {
        return async (event) => {
            event.preventDefault();

            const res = await (await fetch(`//localhost:3001/alarms/delete/${i}`)).text();
            // reload the alarms
            Alarm.loadAll();
            if (res !== "Ok") {
                alert("An error occured while deleting your alarm");
            }
        };
    }

    render() {
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
