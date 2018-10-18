// Convert from a 24 hour format to a 12 hour format
export default function convertTo12Hour(hour) {
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