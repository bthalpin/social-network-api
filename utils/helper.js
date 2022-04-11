//  Gets hour and sets AM or PM
module.exports= formatDate = (v) => {
            let hour = v.getHours();
            let timeOfDay;
            if(hour>12){
              hour-=12
              timeOfDay = 'PM'
            } else {
              timeOfDay = 'AM'
            }
            // Formats current time and date
            return `${hour}:${v.getMinutes()}${timeOfDay} on ${v.getMonth() + 1}/${v.getDate()}/${v.getFullYear()}`
        }