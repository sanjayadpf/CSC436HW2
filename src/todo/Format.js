//got an error when converting to string, date is formatted here
export function formatDate(dateInput){
    let formatted_date = dateInput.getFullYear() + "-" + (dateInput.getMonth() + 1) + "-" + dateInput.getDate() + " " + dateInput.getHours() + ":" + dateInput.getMinutes() + ":" + dateInput.getSeconds()
    return formatted_date;
  }
