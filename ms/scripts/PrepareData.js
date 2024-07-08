var quota_data;
var interview_data;
var download_time;
var total_quota = 4800;
var total_completed;
var total_remaining;
var minium_quota = 0;
var minium_quota_completed;
var minium_quota_remaining;
var felxible_quota_remaining;

var currentMonth;
var currentDate;
/************************************/
function initCurrentTimeVars() {
  var d = new Date();
      
  var month = '' + (d.getMonth() + 1); //month start from 0;
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  currentMonth =[month,year].join('-')
  currentDate = [day, month,year].join('-');
  
  //next day
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  var tomorrowMonth = '' + (tomorrow.getMonth() + 1); //month start from 0;
  var tomorrowDay = '' + tomorrow.getDate();
  var tomorrowYear = tomorrow.getFullYear();

  if (tomorrowMonth.length < 2) 
  tomorrowMonth = '0' + tomorrowMonth;
  if (tomorrowDay.length < 2) 
  tomorrowDay = '0' + tomorrowDay;
  nextDate  = [tomorrowDay, tomorrowMonth, tomorrowYear].join('-');

  //return [day, month,year].join('-');
  if (document.getElementById('year_month') && document.getElementById('year_month').value.length > 0)
  {
    if (document.getElementById('year_month').value != "current-month")
    {
      currentMonth = document.getElementById('year_month').value;
    }
  }
  console.log("currentMonth: ", currentMonth);  
}

function isCurrentMonth(interviewEndDate)
{
// Input: "2023-04-03 10:06:22 GMT"
  var interviewDateParsed = interviewEndDate.split("-")

  var interviewYear = (interviewDateParsed[0]);
  var interviewMonth =(interviewDateParsed[1]);
  
  var result = false;

  if ( currentMonth ==[interviewMonth,interviewYear].join('-'))
  {
    result = true;
  }

   return result;
}

function clean_data ()
{
  for (i = 0; i<interview_data.length; i++ )
  {
    //clean data
   // console.log("interview_data[i]: ", interview_data[i].InterviewDate.substring(0,7) );
    if (interview_data[i].InterviewDate.substring(0,7) == "2023-09") {
      if (interview_data[i].quota_id == "Paul le Cafe\u2666TERMINAL 1\u2666Airside\u266602-26\u2666FBA\u2666Min6") {
        interview_data[i].quota_id = "Paul le Cafe\u2666TERMINAL 1\u2666Airside\u2666#02-26\u2666FBA\u2666Min9"
      }
    }

    if (interview_data[i].quota_id == "Giordano\u2666TERMINAL 2\u2666Airside\u2666#026-096\u2666MP") {
      interview_data[i].quota_id = "Giordano\u2666TERMINAL 2\u2666Airside\u2666#026-096 (#02-160)\u2666MP"
    }

    if (interview_data[i].quota_id == "Tumi\u2666TERMINAL 2\u2666Airside\u2666#02-184\u2666MP") {
      interview_data[i].quota_id = "Tumi\u2666TERMINAL 2\u2666Airside\u2666#026-100\u2666MP"
    }

    
  }
}
function prepareData() {
  initCurrentTimeVars();			

  var quota_data_temp = JSON.parse(quota_list);
  var interview_data_temp  = JSON.parse(interview_statistics);

  download_time = interview_data_temp[0].download_time;

  //get quota data
  quota_data = [];
  quota_data.length = 0;
  for (i = 0; i < quota_data_temp.length; i++) {
    var quota_month =  quota_data_temp[i].Month + "-"  + quota_data_temp[i].Year; 
    //MS: get all
    //if ((quota_month== currentMonth) && 
    if (quota_data_temp[i].Quota>0)
    {
      quota_data.push(quota_data_temp[i]);
    }
  }

  interview_data = [];
  for (j = 0; j<interview_data_temp.length; j++ ) {
    
    //if (isCurrentMonth(interview_data_temp[j].InterviewDate)) 
    {
      interview_data.push(interview_data_temp[j]);
      clean_data();
    }
  }

  var i = 0;
  total_completed = 0;
  minium_quota_completed = 0;
  minium_quota = 0;
  for (i = 0; i<quota_data.length; i++ )
  {
    var quota = quota_data[i];
    minium_quota = minium_quota + quota.Quota;

    quota.Completed  = 0;
    for (j = 0; j<interview_data.length; j++ ) 
    {
      interview = interview_data[j];
        if ( quota.quota_id == interview.quota_id) 
        {
          quota.Completed = quota.Completed + interview["Number of interviews"];
        }
    }
    total_completed = total_completed + quota.Completed  ;
    quota.Missing = quota.Quota - quota.Completed;
    
    if (quota.Completed > quota.Quota) {
      minium_quota_completed = minium_quota_completed + quota.Quota;
    }
    else {
      minium_quota_completed = minium_quota_completed + quota.Completed;
    }
  }

  total_remaining = total_quota - total_completed;
  minium_quota_remaining = minium_quota - minium_quota_completed;
  felxible_quota_remaining = total_remaining - minium_quota_remaining;

  
  //check what not belong to quota data
  var found_temp = 0;
  var not_in_quota_list =[];
  for (i = 0; i < interview_data.length; i++) 
  {
    found_temp = 0;
    for (j = 0; j < quota_data.length; j++) 
    {
      if (quota_data[j].quota_id == interview_data[i].quota_id) 
      { 
        found_temp = 1;
      }
    }
    if (found_temp==0) not_in_quota_list.push(interview_data[i]);
  }
  console.log("not_in_quota_list: ", not_in_quota_list);

}
