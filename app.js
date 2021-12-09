const dateInputRefrance = document.querySelector('#bday-input')
const checKBtn = document.querySelector('#check-btn')
const outputResults = document.querySelector("#result")


function reverseStr(str){
//     var listOfChar = str.split('')
//     var reversListOfchars = listOfChar.reverse();
//     var reversedStr = reversListOfchars.join('');
//    return reversedStr
    return str.split('').reverse().join('')
}


function ispailindrome(str){
    var reverseCheck=reverseStr(str)
    return str === reverseCheck;
     
}

function convertDateTostr(dob){

     var datestr={day:'',month:'',year:''};

     if (dob.day<10){
         datestr.day = '0'+dob.day
     }else{
         datestr.day=dob.day.toString();
     }
     if (dob.month<10){
        datestr.month = '0'+dob.month
    }else{
        datestr.month=dob.month.toString();
    }
    datestr.year=dob.year.toString();
    return datestr
}

function getAllDateFormats(dob){
    var datestr = convertDateTostr(dob)

    var ddmmyyyy = datestr.day + datestr.month + datestr.year;
    var mmddyyyy = datestr.month + datestr.day + datestr.year;
    var yyyymmdd = datestr.year + datestr.month + datestr.day;
    var ddmmyy   = datestr.day + datestr.month + datestr.year.slice(-2);
    var mmddyy   = datestr.month + datestr.day + datestr.year.slice(-2);
    var yymmdd   = datestr.year.slice(-2) + datestr.month + datestr.day
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeAllDateFormats(dob){
    var listOfPalindromes = getAllDateFormats(dob);
    var flag = false;

    for(var i=0;i<listOfPalindromes.length;i++){
        if(ispailindrome(listOfPalindromes[i])){
            flag =true
            break
        }
    }
    return flag;

}

function isCheckleapYear(year){
    if (year % 400 ===0){
        return true;
    }
    if (year % 100 ===0){
        return false
    }
    if(year % 4 ===0){
        return true
    }
    return false;
}


function getNextDate(dob){
    var day = dob.day + 1;
    var month = dob.month;
    var year = dob.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if (month===2){                               // check for fubuary 
        if(isCheckleapYear(year)){
            if(day > 29){
                day =1
                month++
            }

        }
        else{
            if(day > 28){
                day=1;
                month++;
            }
        }
    }
    //check the day extend the next days
    else{
        if(day > daysInMonth[month-1]){
        day=1;
        month++;
        }
    } 
    if(month>12){
        month = 1;
        year++;
    }
    return {day:day,month:month,year:year};
}


function getNextpalindromeDate(dob){
    var ctr = 0;
    var nextDate = getNextDate(dob);

    while(1){
        ctr++;
        var ispailindrome = checkPalindromeAllDateFormats(nextDate)
        if(ispailindrome){
            break;
        }
        nextDate = getNextDate(nextDate)
    }
    return [ctr,nextDate];

}

function ClickHandler(e){
    var bdayStr = dateInputRefrance.value;
    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-')
        var date = {
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };
        var ispailindrome = checkPalindromeAllDateFormats(date)
        if(ispailindrome){
            outputResults.innerText = `your Birthday is a pailindrom!! 😃😍
            `
        }else{
            var [ctr,nextDate] = getNextpalindromeDate(date)
            outputResults.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}
            you missed it by ${ctr}days! 😊😊
            `
        }
    };
};

checKBtn.addEventListener("click",ClickHandler);

