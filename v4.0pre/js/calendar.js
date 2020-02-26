let today = new Date();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
day = today.getDate();
month = months[today.getMonth()];
weekday = days[today.getDay()];
year = today.getFullYear();



document.getElementById('month').innerHTML = month;    
document.getElementById('day').innerHTML = day;
document.getElementById('weekday').innerHTML = weekday;    
document.getElementById('year').innerHTML = year;        

console.log(month);
