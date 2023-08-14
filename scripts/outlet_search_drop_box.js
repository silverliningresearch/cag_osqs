var outletsList = [];
var outletsShortList = [];

function outlet_in_list_found(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Show.toLowerCase() === item) {
          $('.rt-btn.rt-btn-next').show(); 
          return true;
        }
      }
    }
  }
  $('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_outlets_list() {
  var terminal  = api.fn.answers().Q10_1;
  var area  = api.fn.answers().Q10_2;
  var temp_data = JSON.parse(quota_list);
 
  if (area == 1) area_text = "Airside F&B";
  if (area == 2) area_text = "Landside F&B";
  if (area == 3) area_text = "Airside Shops";
  if (area == 4) area_text = "Landside Shops";
  if (area == 5) area_text = "Airside Services";
  if (area == 6) area_text = "Landside Services";

  console.log("load_outlet_code started...");
  console.log("terminal...", terminal);
  console.log("area ...", area_text);

  outletsList = [];

  var i;
  for (i = 0; i<temp_data.length; i++ )
  {
    item = temp_data[i];
    if ((item["Terminal"] == "TERMINAL " +  terminal)
    && (item["AL"] == area_text)
    )
    { 
      item.Show = item.quota_id;
      outletsList.push(item);
    }
  }

  console.log("outletCode: ", outletsList);
  console.log("load_outlet_code done!");
}


function load_outlet_list_for_drop_box(input) {
  var searchList = document.getElementById('outletsDropbox');
  searchList.innerHTML = '';
  outletsShortList = [];
  outletsShortList.length = 0;

  input = input.toLowerCase();

  for (i = 0; i < outletsList.length; i++) {
    let item = outletsList[i];
    if ((input == "all") || 
        (item.Show.toLowerCase().includes(input))) {
      const elem = document.createElement("option");
      elem.value = item.Show;
      elem.text = item.Show;
      searchList.appendChild(elem);
      outletsShortList.push(item);
    }
  }
}

function update_outlet_list_for_drop_box() {
  var input = document.getElementById('inputOutletID').value;

  load_outlet_list_for_drop_box(input);

  if (outlet_in_list_found(outletsList, document.getElementById('inputOutletID').value)) {
    console.log("Found ", document.getElementById('inputOutletID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputOutletID').value);
  }  
  
  console.log("search Outlet done!");
}


function select_oulet() {
  var inputValue = document.getElementById('inputOutletID').value;
  var found = false;

  api.fn.answers({urlVar20:  inputValue});

  for (i = 0; i < outletsList.length; i++) {
    var currentOutlet = outletsList[i];
    if (currentOutlet.Show == inputValue) { 
      //store detail data here
      api.fn.answers({Outlet_ID:  currentOutlet.quota_id});
      api.fn.answers({Terminal:  currentOutlet.Terminal});
      api.fn.answers({Area:  currentOutlet.AL});
      api.fn.answers({Outlet_name:  currentOutlet.Name + currentOutlet.Number});
      api.fn.answers({urlVar20:  currentOutlet.quota_id});

      found = true;
      $('.rt-btn.rt-btn-next').show(); 
      break;
    }
  }
  if (!found) {
    alert("Please select a outlet name from the list!");
  }
}


function show_outlet_search_box() {
  load_outlets_list();

/*   $('.rt-element.rt-text-container').append(
    ` <input list="outletsDropBoxList" 
        onchange="select_oulet()"  
        onkeyup="update_outlet_list_for_drop_box()" 
        name="inputOutletID" 
        id="inputOutletID">
      <datalist id="outletsDropBoxList"> </datalist>`); */
 
      $('.rt-element.rt-text-container').append(
        `
          <label for="outlets">Choose a outlet:</label>
            <select id="outletsDropbox" name="outletsDropbox">
          </select>
        `);


  load_outlet_list_for_drop_box("all");

  var currentValue  = api.fn.answers().Outlet_ID;
  if (currentValue) {
    if (currentValue !== "") {
      document.getElementById('inputOutletID').value = currentValue;
    }
  }

  if (outlet_in_list_found(outletsList, document.getElementById('inputOutletID').value)) {
    console.log("Found ", document.getElementById('inputOutletID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputOutletID').value);
    document.getElementById('inputOutletID').value = "";
  }
  $('#inputOutletID').show(); 
}


function hide_outlet_search_box() {
  $('#inputOutletID').hide();
}
