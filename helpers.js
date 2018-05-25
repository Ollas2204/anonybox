exports.convertDate = (date) => {
  const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 
                'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June'
                ,'July', 'August', 'September', 'October', 'November', 'December'];

  const dateNow = new Date();

  let day = ""+date.getDate();
  let month = months[date.getMonth()];
  const year = date.getFullYear();

  var timeDiff = Math.abs(dateNow.getTime() - date.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays <= 7) day = days[date.getDay()];
  else if (+day < 10) day = "0"+day;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}


