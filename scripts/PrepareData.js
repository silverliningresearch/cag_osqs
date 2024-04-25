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

    if (interview_data[i].InterviewDate.substring(0,7) == "2023-10") {

      if ( interview_data[i].quota_id == "Baggage Storage\u2666TERMINAL 2\u2666Airside\u2666#02-242\u2666BS\u2666Min9") 
      {     
        interview_data[i].quota_id = "Smarte Carte Premises D (T2 Airside)\u2666TERMINAL 2\u2666Airside\u2666#02-242\u2666BS\u2666Min9";
      }  
      if ( interview_data[i].quota_id == "LT T1 Arrival East\u2666TERMINAL 1\u2666Airside\u2666#01-10F\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T1 Arrival East\u2666TERMINAL 1\u2666Airside\u2666#01-10F\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T1 Arrival West\u2666TERMINAL 1\u2666Airside\u2666#01-23E\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T1 Arrival West\u2666TERMINAL 1\u2666Airside\u2666#01-23E\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T1 DT East\u2666TERMINAL 1\u2666Airside\u2666#02-68\u2666LT\u2666Min20") interview_data[i].quota_id = "LT T1 DT East\u2666TERMINAL 1\u2666Airside\u2666#02-68\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T2 DT North\u2666TERMINAL 2\u2666Airside\u2666#02-401\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T2 DT North\u2666TERMINAL 2\u2666Airside\u2666#02-401\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T3 Arrival North\u2666TERMINAL 3\u2666Airside\u2666#01-29\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T3 Arrival North\u2666TERMINAL 3\u2666Airside\u2666#01-29\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T3 Arrival South\u2666TERMINAL 3\u2666Airside\u2666#01-19\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T3 Arrival South\u2666TERMINAL 3\u2666Airside\u2666#01-19\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T3 DT North\u2666TERMINAL 3\u2666Airside\u2666#02-65\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T3 DT North\u2666TERMINAL 3\u2666Airside\u2666#02-65\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "LT T3 DT South\u2666TERMINAL 3\u2666Airside\u2666#02-10/11/12\u2666LT\u2666Min25") interview_data[i].quota_id = "LT T3 DT South\u2666TERMINAL 3\u2666Airside\u2666#02-10/11/12\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T1 ABE)\u2666TERMINAL 1\u2666Airside\u2666#01-09F\u2666PC\u2666Min25") interview_data[i].quota_id = "Perfumes & Cosmetics (T1 ABE)\u2666TERMINAL 1\u2666Airside\u2666#01-09F\u2666PC\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T1 ABW)\u2666TERMINAL 1\u2666Airside\u2666#01-22F\u2666PC\u2666Min25") interview_data[i].quota_id = "Perfumes & Cosmetics (T1 ABW)\u2666TERMINAL 1\u2666Airside\u2666#01-22F\u2666PC\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T1 DTE)\u2666TERMINAL 1\u2666Airside\u2666#02-67\u2666PC\u2666Min20") interview_data[i].quota_id = "Perfumes & Cosmetics (T1 DTE)\u2666TERMINAL 1\u2666Airside\u2666#02-67\u2666PC\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T3 ABN)\u2666TERMINAL 3\u2666Airside\u2666#01-28\u2666PC\u2666Min25") interview_data[i].quota_id = "Perfumes & Cosmetics (T3 ABN)\u2666TERMINAL 3\u2666Airside\u2666#01-28\u2666PC\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T3 ABS)\u2666TERMINAL 3\u2666Airside\u2666#01-20\u2666PC\u2666Min25") interview_data[i].quota_id = "Perfumes & Cosmetics (T3 ABS)\u2666TERMINAL 3\u2666Airside\u2666#01-20\u2666PC\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T3 DTN)\u2666TERMINAL 3\u2666Airside\u2666#02-58\u2666PC\u2666Min25") interview_data[i].quota_id = "Perfumes & Cosmetics (T3 DTN)\u2666TERMINAL 3\u2666Airside\u2666#02-58\u2666PC\u2666Min15";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T3 DTS)\u2666TERMINAL 3\u2666Airside\u2666#02-03\u2666PC\u2666Min25") interview_data[i].quota_id = "Perfumes & Cosmetics (T3 DTS)\u2666TERMINAL 3\u2666Airside\u2666#02-03\u2666PC\u2666Min15";

      if ( interview_data[i].quota_id == "The Cocoa Trees (T2 DTS)\u2666TERMINAL 2\u2666Airside\u2666#02-218\u2666CCD\u2666Min9") interview_data[i].quota_id =  "The Cocoa Trees (T2 DTS, beside Montblanc)\u2666TERMINAL 2\u2666Airside\u2666#02-218\u2666CCD\u2666Min9";
      if ( interview_data[i].quota_id == "The Cocoa Trees (Premises B3) (T2 DTN)\u2666TERMINAL 2\u2666Airside\u2666#02-403\u2666CCD\u2666Min9") interview_data[i].quota_id =  "The Cocoa Trees (Premises B3) (T2 DTN, near E20)\u2666TERMINAL 2\u2666Airside\u2666#02-403\u2666CCD\u2666Min9";
      if ( interview_data[i].quota_id == "Premises C - Baggage Storage by Smarte Carte\u2666TERMINAL 2\u2666Landside\u2666#01-01\u2666BS\u2666Min9") interview_data[i].quota_id =  "Premises C - Baggage Storage by Smarte Carte\u2666TERMINAL 2\u2666Landside\u2666#01-01 (#016-024)\u2666BS\u2666Min9";

      if ( interview_data[i].quota_id == "T2 UOB Bank\u2666TERMINAL 2\u2666Landside\u2666#B1-52\u2666MC\u2666Min9") interview_data[i].quota_id =  "T2 UOB Bank\u2666TERMINAL 2\u2666Landside\u2666#B1-52 (#B16-017)\u2666MC\u2666Min9";
      if ( interview_data[i].quota_id == "Charles & Keith\u2666TERMINAL 2\u2666Airside\u2666#026-057\u2666MP\u2666Min9") interview_data[i].quota_id =  "Charles & Keith\u2666TERMINAL 2\u2666Airside\u2666#02-234 (#026-057)\u2666MP\u2666Min9";


    }  

    if (interview_data[i].InterviewDate.substring(0,7) == "2023-11") {
      if ( interview_data[i].quota_id == "WH Smith - Premises D (Air) (T2 DTN)\u2666TERMINAL 2\u2666Airside\u2666#026-055-02A (#026-84-3)\u2666OW\u2666Min9") interview_data[i].quota_id =  "WH Smith - Premises D (Air) (T2 DTN)\u2666TERMINAL 2\u2666Airside\u2666#026-055-02A (#02-240)\u2666OW\u2666Min9";
      if ( interview_data[i].quota_id == "SSAP SAAP THAI & SAAP SAAP THAI DESSERTS\u2666TERMINAL 3\u2666Landside\u2666#B2-33\u2666FBL\u2666Min8") interview_data[i].quota_id =  "SAAP SAAP THAI & SAAP SAAP THAI DESSERTS\u2666TERMINAL 3\u2666Landside\u2666#B2-33\u2666FBL\u2666Min8";
      if ( interview_data[i].quota_id == "T1 iSC Arrival counter\u2666TERMINAL 1\u2666Landside\u2666NA\u2666PS\u2666Min9") interview_data[i].quota_id =  "T1 iSC Arrival counter\u2666TERMINAL 1\u2666Landside\u2666NA\u2666PS\u2666Min5";
      if ( interview_data[i].quota_id == "T2 iSC Arrival counter\u2666TERMINAL 2\u2666Landside\u2666#01-179\u2666PS\u2666Min9") interview_data[i].quota_id =  "T2 iSC Arrival counter\u2666TERMINAL 2\u2666Landside\u2666#01-179\u2666PS\u2666Min5";
      if ( interview_data[i].quota_id == "T3 iSC Arrival counter\u2666TERMINAL 3\u2666Landside\u2666NA\u2666PS\u2666Min9") interview_data[i].quota_id =  "T3 iSC Arrival counter\u2666TERMINAL 3\u2666Landside\u2666NA\u2666PS\u2666Min5";
      if ( interview_data[i].quota_id == "T4 iSC Arrival pushcart\u2666TERMINAL 4\u2666Landside\u2666NA\u2666PS\u2666Min9") interview_data[i].quota_id =  "T4 iSC Arrival pushcart\u2666TERMINAL 4\u2666Landside\u2666NA\u2666PS\u2666Min5";
      interview_data[i].quota_id = interview_data[i].quota_id.replace("\u2666Min9", "\u2666Min8");
      
    }
    
    if (interview_data[i].InterviewDate.substring(0,7) == "2024-01") {    
      if ( interview_data[i].quota_id == "Travelex T2 DT North\u2666TERMINAL 2\u2666Airside\u2666#026-CTR-02\u2666MC\u2666Min8") interview_data[i].quota_id =  "Travelex T2 DT North\u2666TERMINAL 2\u2666Airside\u2666#02-235\u2666MC\u2666Min8";
      if ( interview_data[i].quota_id == "UOB T2 DT South\u2666TERMINAL 2\u2666Airside\u2666#026-CTR-03\u2666MC\u2666Min8") interview_data[i].quota_id =  "UOB T2 DT South\u2666TERMINAL 2\u2666Airside\u2666#02-209B\u2666MC\u2666Min8";
      if ( interview_data[i].quota_id == "UOB T2 DT North\u2666TERMINAL 2\u2666Airside\u2666#026-CTR-01\u2666MC\u2666Min8") interview_data[i].quota_id =  "UOB T2 DT North\u2666TERMINAL 2\u2666Airside\u2666#02-237\u2666MC\u2666Min8";
      if ( interview_data[i].quota_id == "Garrett Popcorn Shops\u2666TERMINAL 2\u2666Airside\u2666#02-181\u2666CCD\u2666Min8") interview_data[i].quota_id =  "Garrett Popcorn Shops\u2666TERMINAL 2\u2666Airside\u2666#02-164 (#026-095-05R)\u2666CCD\u2666Min8";
      if ( interview_data[i].quota_id == "Perfumes & Cosmetics (T2 DTC)\u2666TERMINAL 2\u2666Airside\u2666#02-177 (#026-103E)\u2666PC\u2666Min25") interview_data[i].quota_id =  "Perfumes & Cosmetics (T2 DTC)\u2666TERMINAL 2\u2666Airside\u2666#02-174 (#026-103E)\u2666PC\u2666Min25";
      if ( interview_data[i].quota_id == "CHANGI MEET & GREET\u2666TERMINAL 1\u2666Landside\u2666#01-K1\u2666CR\u2666Min8") interview_data[i].quota_id =  "CHANGI MEET & GREET\u2666TERMINAL 1\u2666Landside\u2666#01-K7\u2666CR\u2666Min8";
    }

    if (interview_data[i].InterviewDate.substring(0,7) == "2024-02") {    
      if ( interview_data[i].quota_id == "HUGO\u2666TERMINAL 2\u2666Airside\u266602-232\u2666LX\u2666Min8") interview_data[i].quota_id =  "Hugo Boss\u2666TERMINAL 2\u2666Airside\u2666#02-232\u2666LX\u2666Min8";
      if ( interview_data[i].quota_id == "CHAGEE\u2666TERMINAL 2\u2666Landside\u2666#02-06\u2666FBL\u2666Min8") interview_data[i].quota_id =  "CHAGEE (AMPS TEA)\u2666TERMINAL 2\u2666Landside\u2666#02-06\u2666FBL\u2666Min8";
      if ( interview_data[i].quota_id == "Avenue Kids\u2666TERMINAL 2\u2666Airside\u2666#02-161\u2666CT\u2666Min8") interview_data[i].quota_id =  "Avenue Kids\u2666TERMINAL 2\u2666Airside\u2666#02-161 (#026-97)\u2666CT\u2666Min8";
      if ( interview_data[i].quota_id == "Kaboom\u2666TERMINAL 2\u2666Airside\u2666#02-162\u2666CT\u2666Min8") interview_data[i].quota_id =  "Kaboom\u2666TERMINAL 2\u2666Airside\u2666#02-162 (#026-098)\u2666CT\u2666Min8";
      if ( interview_data[i].quota_id == "Lacoste\u2666TERMINAL 2\u2666Airside\u2666#02-163\u2666MP\u2666Min8") interview_data[i].quota_id =  "Lacoste\u2666TERMINAL 2\u2666Airside\u2666#02-163 (#026-098-01)\u2666MP\u2666Min8";
      if ( interview_data[i].quota_id == "Liquor & Tobacco (T2 DTS)\u2666TERMINAL 2\u2666Airside\u2666#02-201/202/203\u2666LT\u2666Min15") interview_data[i].quota_id =  "Liquor & Tobacco (T2 DTS)\u2666TERMINAL 2\u2666Airside\u2666#02-197\u2666LT\u2666Min15";
      if ( interview_data[i].quota_id == "Prada\u2666TERMINAL 2\u2666Airside\u2666#026-072\u2666LX\u2666Min8") interview_data[i].quota_id =  "Prada\u2666TERMINAL 2\u2666Airside\u2666#026-072 (#02-229)\u2666LX\u2666Min8";
      if ( interview_data[i].quota_id == "Victoria's Secret\u2666TERMINAL 2\u2666Airside\u2666#026-093\u2666PC\u2666Min8") interview_data[i].quota_id =  "Victoria's Secret\u2666TERMINAL 2\u2666Airside\u2666#026-093 (#02-151)\u2666PC";
    }

    if (interview_data[i].InterviewDate.substring(0,7) == "2024-04") {    
      if ( interview_data[i].quota_id == "Samsonite Red / Lipault Paris\u2666TERMINAL 2\u2666Airside\u2666#02-190\u2666MP\u2666Min8") interview_data[i].quota_id =  "Samsonite\u2666TERMINAL 2\u2666Airside\u2666#02-190\u2666MP\u2666Min8";
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
