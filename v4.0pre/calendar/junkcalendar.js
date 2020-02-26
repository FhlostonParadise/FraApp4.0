/* function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes();

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}
    ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
} */



    /* month = document.getElementsByClassName("month").innerHTML, 
    weekday = document.getElementsByClassName("weekday").innerHTML, 
    day = document.getElementsByClassName("day").innerHTML,
    year = document.getElementsByClassName("year").innerHTML; */

    


let today = new Date(),
    day = today.getDate(),
    month = today.getMonth();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    weekday = days[today.getDay()]

document.getElementsByClassName('day').innerHTML = today

month = months[today.getMonth()];
document.getElementsByClassName('month').innerHTML = month
document.getElementById('weekday').innerHTML = weekday;
console.log(weekday)




/* document.getElementsByClassName("month").innerHTML = months[today.getMonth()];
document.getElementsByClassName("weekday").innerHTML = days[today.getDay()];
document.getElementsByClassName("year").innerHTML = today.getFullYear(); */

