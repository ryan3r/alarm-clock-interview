import convertTo12Hour from "./12hour.js";

const SECONDS_IN_DAY = 60 * 60 * 24;
const SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;

const DAYS_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

class Alarm {
    /**
     * An alarm
     * @param {number} id The id for this alarm
     * @param {number} day The days of the week that the alarm goes off
     * @param {number} seconds The number of seconds into a day the alarm goes off
     *                         (ex: 12:00 am = 0 seconds, 1:00 am = 60 * 60 seconds)
     */
    constructor(id, day, seconds) {
        this.id = id;
        this.day = day;
        this.seconds = seconds;
    }

    /**
     * The number of seconds until this alarm goes off
     */
    get nextAlert() {
        let today = new Date();

        // find the number of days before this alarm goes off
        let daysDelta = this.day - today.getDay();

        // find the current time in seconds
        let seconds = (((today.getHours() * 60) + today.getMinutes()) * 60) + today.getSeconds();
        let secondsDelta = this.seconds - seconds;

        secondsDelta += daysDelta * SECONDS_IN_DAY;

        // already passed the next time the alarm will go off is next week
        if(secondsDelta < 0) {
            secondsDelta += SECONDS_IN_WEEK;
        }

        return secondsDelta;
    }

    /**
     * The next alarm to go off
     */
    static get nextAlarm() {
        return Alarm.alarms.reduce((next, alarm) => {
            if(next.nextAlert < alarm.nextAlert) {
                return next;
            }

            return alarm;
        }, Alarm.alarms[0]);
    }

    /**
     * Calls callback when the next alarm goes off
     * @param {Function} cb 
     */
    static waitForNextAlarm(cb) {
        if(!Alarm.nextAlarm) return;

        return setTimeout(cb, Alarm.nextAlarm.nextAlert * 1000);
    }

    /**
     * Load the alarms from the server
     */
    static loadAll() {
        return fetch("//localhost:3001/alarms")
            .then(res => res.json())
            .then(data => {
                Alarm.alarms = data.alarms.map(alarm => {
                    return new Alarm(alarm.id, alarm.day, alarm.seconds)
                });

                if(Alarm.onAlarmsReady) {
                    Alarm.onAlarmsReady();
                }
            });
    }

    get nextAlertString() {
        let time = this.nextAlert;

        // Break the time into individual componenets
        time = Math.floor(time / 60);

        let minute = (time % 60).toString().padStart(2, 0);
        time = Math.floor(time / 60);

        let hour = (time % 24).toString().padStart(2, 0);
        time = Math.floor(time / 24);

        let day = time;
        let s = day !== 1 ? "s" : "";

        return `${day} day${s} ${hour}:${minute}`;
    }

    get timeString() {
        let time = this.seconds;

        // Break the time into individual componenets
        time = Math.floor(time / 60);

        let minute = (time % 60).toString().padStart(2, 0);
        time = Math.floor(time / 60);

        let {hour, amPm} = convertTo12Hour(time % 24);
        time = Math.floor(time / 24);

        let day = DAYS_NAMES[this.day];

        return `${day} at ${hour}:${minute}${amPm}`;
    }
}

Alarm.alarms = [];

export default Alarm;
