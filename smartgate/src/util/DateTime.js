class DateTime {
    // Simple function
    static getCurrentDateTime = () => {
        const date_time = new Date();
        let year=date_time.getFullYear();
        let month=(date_time.getMonth()+1)+"";
        if(month.length!=2){
            month="0"+month
        }
        let date=date_time.getDate()+"";
        if(date.length!=2){
            date="0"+date
        }
        let hours=date_time.getHours()+"";
        if(hours.length!=2){
            hours="0"+hours
        }
        let minutes=date_time.getMinutes()+"";
        if(minutes.length!=2){
            minutes="0"+minutes
        }
        const current_date_time = year+"-"+month+"-"+ date+"T"+hours+":"+minutes;
      return current_date_time;
    };

    static getFormatDataTime = (given_date_time) => {
        const date_time = given_date_time;
        let year=date_time.getFullYear();
        let month=(date_time.getMonth()+1)+"";
        if(month.length!=2){
            month="0"+month
        }
        let date=date_time.getDate()+"";
        if(date.length!=2){
            date="0"+date
        }
        let hours=date_time.getHours()+"";
        if(hours.length!=2){
            hours="0"+hours
        }
        let minutes=date_time.getMinutes()+"";
        if(minutes.length!=2){
            minutes="0"+minutes
        }
        let seconds=date_time.getSeconds()+"";
        if(seconds.length!=2){
            seconds="0"+seconds
        }
        const current_date_time = date+"-"+month+"-"+ year+" "+hours+":"+minutes+":"+seconds;
      return current_date_time;
    };
   
  }
  
  export default DateTime;


  export function getDateFromDateTime(dateTime){
    let resultDate="";
    const year=dateTime.getFullYear();
    let month=(dateTime.getMonth()+1)+"";
    if(month.length!=2){
        month="0"+month
    }
    let date=dateTime.getDate()+"";
    if(date.length!=2){
        date="0"+date
    }
    resultDate=year+'-'+month+'-'+date
    return resultDate;
  }
  export function getInputDateTimeFromJSDateTime(JSDateTime){
    let resultInputDateTime="";
    const year=JSDateTime.getFullYear();
    let month=(JSDateTime.getMonth()+1)+"";
    if(month.length!=2){
        month="0"+month
    }
    let date=JSDateTime.getDate()+"";
    if(date.length!=2){
        date="0"+date
    }
    let hours=JSDateTime.getHours()+"";
    if(hours.length!=2){
        hours="0"+hours
    }
    let minutes=JSDateTime.getMinutes()+"";
    if(minutes.length!=2){
        minutes="0"+minutes
    }
    resultInputDateTime=year+'-'+month+'-'+date+'T'+hours+':'+minutes
    return resultInputDateTime;
  }
