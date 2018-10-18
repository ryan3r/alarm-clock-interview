const SECONDS_IN_DAY = 60 * 60 * 24;
const SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;

class Alarm {
    /**
     * An alarm
     * @param {number} day The days of the week that the alarm goes off
     * @param {number} seconds The number of seconds into a day the alarm goes off
     *                         (ex: 12:00 am = 0 seconds, 1:00 am = 60 * 60 seconds)
     */
    constructor(day, seconds) {
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
        return setTimeout(cb, Alarm.nextAlarm.nextAlert * 1000);
    }
}

Alarm.alarms = [
    new Alarm(5, ((11 * 60) + 41) * 60),
    new Alarm(4, ((12 * 60) + 8) * 60)
];

export default Alarm;
