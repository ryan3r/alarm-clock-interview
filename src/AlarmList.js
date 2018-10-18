import React, {Component} from "react";
// import "./AlarmList.css";

class AlarmList extends Component {
    render() {
        let alarms = this.props.alarms.map(alarm => {
            return <li key={`${alarm.timeString}-${alarm.nextAlertString}`} className="alarm-list-alarm">
                {alarm.timeString} (Next alert in {alarm.nextAlertString})
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
