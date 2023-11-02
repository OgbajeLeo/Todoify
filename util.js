
//function to generate a unique Id 
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

//Database
const todo_DB =() =>{ return (JSON.parse(localStorage.getItem(DB_NAME) )|| [])}

const saveToDatabase=(key,value)=>{return (localStorage.setItem(key, JSON.stringify(value)))}


//convert to Date format
const todoDate= (todoD) => {
const currentDate = new Date(todoD);

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
let amOrPm = 'AM';

// Convert hours to 12-hour format and set AM or PM
if (hours >= 12) {
  amOrPm = 'PM';
  hours = (hours % 12) || 12; // If hours is 0, set it to 12
}

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}${amOrPm}`
return (formattedDate)
}