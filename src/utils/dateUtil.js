export function getFormatDate(){
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    if (month < 9) {
        month = "0" + month;
    }
    let day = myDate.getDate();
    if (day < 9) {
        day = "0" + day;
    }
    let date = year + "-" + month + "-" + day;
    return date;
};
export function getFormatTime() {
    let myTime = new Date();
    let hour = myTime.getHours();
    let minute = myTime.getMinutes();
    let time = hour + ":" + minute;
    return time;
};