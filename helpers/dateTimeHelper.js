export default function dateTimeHelper(currentdate){
    var datetime = currentdate.getFullYear()+ "-"
                    + (currentdate.getMonth()+1)  + "-" 
                    + currentdate.getDate() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    return datetime;
}