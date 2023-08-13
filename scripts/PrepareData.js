var quota_data;
var download_time;
var total_quota = 4800;
var total_completed;
var total_remaining;
var minium_quota = 0;
var minium_quota_completed;
var minium_quota_remaining;
var felxible_quota_remaining;
/************************************/
function prepareData() {
  quota_data = JSON.parse(quota_list);
  var interview_data  = JSON.parse(interview_statistics);

  download_time = interview_data[0].download_time;

  var i = 0;
  total_completed = 0;
  minium_quota_completed = 0;
  minium_quota = 0;
  for (i = 0; i<quota_data.length; i++ )
  {
    var quota = quota_data[i];
    minium_quota = minium_quota + quota.Quota;

    quota.Completed  = 0;
    for (j = 0; j<interview_data.length; j++ ) {

      interview = interview_data[j];
      console.log("interview",interview );
      console.log("quota.quota_id",quota.quota_id );
      if ( quota.quota_id == interview.quota_id) {
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
