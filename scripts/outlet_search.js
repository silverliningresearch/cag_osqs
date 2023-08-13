var postalCode;

function load_postal_code() {
  var terminal  = api.fn.answers().Q10_1;
  var area  = api.fn.answers().Q10_2;
  var temp_data = JSON.parse(quota_list);
 
  if (area == 1) area_text = "Airside F&B";
  if (area == 2) area_text = "Landside F&B";
  if (area == 3) area_text = "Airside Shops";
  if (area == 4) area_text = "Landside Shops";
  if (area == 5) area_text = "Airside Services";
  if (area == 6) area_text = "Landside Services";

  console.log("load_postal_code started...");
  console.log("terminal...", terminal);
  console.log("area ...", area_text);

  postalCode = [];

  for (i = 0; i<temp_data.length; i++ )
  {
    item = temp_data[i];
    if ((item["Terminal"] == "TERMINAL " +  terminal)
    && (item["AL"] == area_text)
    )
    {
      postalCode.push(item);
    }
  }

  console.log("load_postal_code done!");
}

// Important: Make sure to return true when your filter
// receives an empty string as a search term.

function contains(str1, str2) {
  return new RegExp(str2, "i").test(str1);
}

function show_outlet_search_box() {
    load_postal_code();  
    if (data) {
    // the variable is defined
      data = postalCode;
    }
    else{
      var data = $.map(postalCode, function (obj) {
        obj.id = obj.id || postalCode.indexOf(obj); // replace pk with your identifier
        obj.text = obj.quota_id;
        return obj;
      });
    }

    $('.rt-body.slt-page-container main').find('section').hide();
    if ($('.post-code').length) {
      $('.post-code').show();
    }
    else{
      $('.rt-body.slt-page-container main').append(`<section class='post-code'>
   <sha-interview-page-renderer>
      <sha-interview-page-item-renderer>
         <sha-rt-element>
            <div class="sv-rt-element-container rt-element rt-sc-container q1 rt-element-active">
               <sha-basic-single-choice>
                  <div class="rt-qtext fr-view" id="1-text">Please select outlet:</div>
                  <div class="rt-qelement">
                     <div class="rt-form-group">
                        <sha-basic-single-item>
                           <div class="rt-control rt-answer-option rt-has-input">
                              <input type="radio" class="rt-control-input ng-untouched ng-pristine ng-valid" id="single_1_1" name="single_1" aria-labelledby="1-text label-1-0" tabindex="100000" onchange="answer()"><label class="rt-control-label rt-radio-button fr-view" id="label-1-0" for="single_1_1"><span>Outlet name:</span></label>
                              <sha-validated-text-input>
                                 <div class="rt-semi-open-container">
                                    <sha-list-autocomplete>
                                       <sha-drop-down class="ng-untouched ng-pristine ng-valid">
                                          <div >
                                             <dx-drop-down-box  class="rt-drop-down-container dx-show-invalid-badge dx-dropdownbox dx-textbox dx-texteditor dx-show-clear-button dx-dropdowneditor-button-visible dx-editor-outlined dx-widget dx-texteditor-empty dx-dropdowneditor dx-dropdowneditor-field-clickable dx-dropdowneditor-active">
                                                <div class="dx-dropdowneditor-input-wrapper" id="post-code-select2">
                                                   <div class="dx-dropdowneditor-field-template-wrapper">
                                                      <div  class="rt-dropdown-choice-container dx-template-wrapper">
                                                         <div class="fr-view" title=""></div>
                                                         <dx-text-box class="rt-sr-only dx-show-invalid-badge dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-state-readonly dx-widget">
                                                            <div class="dx-texteditor-container">
                                                               <div class="dx-texteditor-input-container">
                                                                  <input id="inputpostalCodeID" autocomplete="off" placeholder=" " class="dx-texteditor-input" type="text" readonly="" aria-readonly="true" spellcheck="false" tabindex="0" role="combobox">
                                                                  <div data-dx_placeholder="" class="dx-placeholder"></div>
                                                               </div>
                                                               <div class="dx-texteditor-buttons-container">
                                                                  <div></div>
                                                               </div>
                                                            </div>
                                                         </dx-text-box>
                                                      </div>
                                                   </div>
                                                   <input type="hidden" value="">
                                                   <div class="dx-texteditor-buttons-container">
                                                      <span class="dx-clear-button-area"><span class="dx-icon dx-icon-clear"></span></span>
                                                      <div role="button" class="dx-widget dx-button-mode-contained dx-button-normal dx-dropdowneditor-button" aria-label="Select">
                                                         <div class="dx-button-content">
                                                            <div class="dx-dropdowneditor-icon"></div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </dx-drop-down-box>
                                          </div>
                                       </sha-drop-down>
                                    </sha-list-autocomplete>
                                    <label class="rt-sr-only" id="label-q1_1_text">Please define Nationality:#PostalCodeGermany</label>
                                 </div>
                              </sha-validated-text-input>
                           </div>
                        </sha-basic-single-item>
                        
                     </div>
                  </div>
               </sha-basic-single-choice>
            </div>
         </sha-rt-element>
      </sha-interview-page-item-renderer>
   </sha-interview-page-renderer>
</section>
`);
    // document.getElementById('inputpostalCodeID').value = "";
    $('.post-code #post-code-select2').select2({
      // allowClear: true,
      // placeholder: "",
      data: data,
      query: function(q) {
        var pageSize = 50,
            results = this.data.filter(function(e) {
              return contains(e.text, q.term);
            });
            
        // Get a page sized slice of data from the results of filtering the data set.
        
        var paged = results.slice((q.page - 1) * pageSize, q.page * pageSize);
        
        q.callback({
          results: paged,
          more: results.length >= q.page * pageSize
        });
      }
    });

    }
    $('#post-code-select2').on('select2:select', function (e) {
      var data = e.params.data;
      document.getElementById('inputpostalCodeID').value = data.quota_id;
      $('#select2-post-code-select2-container').prop('title', data.quota_id);
      $('#select2-post-code-select2-container').html(data.quota_id);
      $('#single_1_1').prop('checked', true);

      // console.log(data);
    });
    var currentValue;
    // console.log(currentValue)
    if (currentValue) {
      if (currentValue !== "") {
        document.getElementById('inputpostalCodeID').value = currentValue;
        $('#single_1_1').prop('checked', true);
      }
    }
    $('.post-code').show(); 
}
function dontanswer(){
  console.log('Press do not want to answer')
  clear_data_select2();
  //set value don't answer
}
function answer(){
  console.log('Press Answer...')
  clear_data_select2();
}
function clear_data_select2(){
  $('#post-code-select2').val(null).trigger('change');
  document.getElementById('inputpostalCodeID').value = "";
  $('#select2-post-code-select2-container').prop('title', "");
  $('#select2-post-code-select2-container').html("");
}
function hide_outlet_search_box() {
  $('.rt-body.slt-page-container main').find('section').show();
  $('.post-code').hide();
}
