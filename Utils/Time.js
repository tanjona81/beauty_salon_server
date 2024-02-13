const stringToTime = (stime) => {
    const [hours, minutes, seconds] = stime.split(":").map(Number);
    const time = new Date();
    time.setHours(hours, minutes, seconds);
    // console.log(time.toTimeString().slice(0, 8))
    return time;
}

module.exports = {
    stringToTime
}