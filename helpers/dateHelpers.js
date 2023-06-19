// https://www.codegrepper.com/code-examples/javascript/get+all+monday+date+in+a+month+jquery
function mondaysInMonth(m,y) {
  var days = new Date(y,m,0).getDate();
  var mondays =  new Date(m +'/01/'+ y).getDay();
  if(mondays != 1){
    mondays = 9 - mondays;
  }
  mondays = [mondays];
  //console.log(mondays);
  for (var i = mondays[0] + 7; i <= days; i += 7) {
    mondays.push(i);
  }
  return mondays;
}

// https://stackoverflow.com/questions/563406/how-to-add-days-to-date
function addDays(date, days) {
  let result = new Date(date.getTime());;
  result.setDate(result.getDate() + days);
  return result;
}
function convertDate(date){
  let [year, month, day] = date.toISOString().slice(0,10).split('-');
  return [day, month, year].join('/')
}

// https://bobbyhadz.com/blog/javascript-convert-dd-mm-yyyy-string-to-date#:~:text=To%20convert%20a%20dd%2Fmm,returns%20a%20new%20Date%20object.
function convertFromDDMMYYYY(str){
  const [day, month, year] = str.split('/');
  
  const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day)+1);
  return date;
}
export { mondaysInMonth, addDays, convertDate, convertFromDDMMYYYY };
