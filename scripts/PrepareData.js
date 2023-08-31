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
    if ((quota_month== currentMonth) && (quota_data_temp[i].Quota>0))
    {
      quota_data.push(quota_data_temp[i]);
    }
  }

  interview_data = [];
  for (j = 0; j<interview_data_temp.length; j++ ) {
    if (isCurrentMonth(interview_data_temp[j].InterviewDate)) 
    {
      interview_data.push(interview_data_temp[j]);
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
}
