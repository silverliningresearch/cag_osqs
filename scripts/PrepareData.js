var quota_data;
var download_time;
var total_quota = 2500;
var total_completed;
var total_remaining;
var hard_quota = 2248;
var hard_quota_completed;
var hard_quota_remaining;
var felxible_quota_remaining;
/************************************/
function prepareData() {
  raw_data = JSON.parse(weekly_plan);
 
  var i = 0;
  total_completed = 0;
  hard_quota_completed = 0;

  quota_data = [];
  quota_data.length = 0;
  for (i = 0; i<raw_data.length; i++ )
  {
    var item = raw_data[i];
    if (item.Completed) 
    {
      total_completed = total_completed + item.Completed;
    }

    if (item.Completed > item.Quota) {
      hard_quota_completed = hard_quota_completed + item.Quota;
    }
    else {
      hard_quota_completed = hard_quota_completed + item.Completed;
    }

    if (item.Missing > 0) 
    {
      quota_data.push(item);
    }
  }
  total_remaining = total_quota - total_completed;
  hard_quota_remaining = hard_quota - hard_quota_completed;
  felxible_quota_remaining = total_remaining - hard_quota_remaining;
}
