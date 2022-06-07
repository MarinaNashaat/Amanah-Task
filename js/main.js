let selectedDay = document.getElementById("selectDay");
let timeFrom = document.getElementById("timeFrom");
let toTime = document.getElementById("toTime");
let minutes = document.getElementById("minutes");
let timeSlotsList;
if (localStorage.getItem("timeSlotsList") != null) {
  timeSlotsList = JSON.parse(localStorage.getItem("timeSlotsList"));
  addTimeSlots();
} else {
  timeSlotsList = [];
}

document.getElementById("create-time-slot").addEventListener("click", () => {
  if (validForm()) {
    let timeSlot = {
      selectedDay: selectedDay.value,
      timeFrom: timeFrom.value,
      toTime: toTime.value,
    };
    timeSlotsList.push(timeSlot);
    localStorage.setItem("timeSlotsList", JSON.stringify(timeSlotsList));

    addTimeSlots();
    resetTimeSlots();
  }
});

function addTimeSlots() {
  var temp = ``;
  for (var i = 0; i < timeSlotsList.length; i++) {
    temp += `<tr>
        <td>
          <div class="d-flex ">
            <input class="form-check-input" type="checkbox">
            <div class="form-check form-switch ms-1">
              <input class="form-check-input bg-success border-success" type="checkbox" role="switch" id="deliveryTime" checked>

            </div>
            
            <a href="#" class="text-danger removeSlots" id="removeSlot" onclick="removeTimeSlot(${i})">
              <i class="fa fa-times fa-1x"></i>
            </a>
            <a href="#" class="ms-1" onclick="addTimeSlot()">
              <i class="fa fa-plus"></i>
            </a>
         
          </div>

        </td>
        <td> <select class="form-select form-control" id="tableSelectDay">
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
          </select></td>
        <td>
          <input type="time" class="form-control" name="timeFrom" value=${timeSlotsList[i].timeFrom} readonly >

        </td>
        <td>
          <input type="time" class="form-control" name="timeTo" value=${timeSlotsList[i].toTime} readonly >

        </td>
      </tr>
      `;

  }
  if (document.getElementById(`tableSelectDay`) != null) {
    let tableSelectDay = document.getElementById(`tableSelectDay`);
    let tableSelectOption=tableSelectDay.options;
    tableSelectDay.selectedIndex=selectedDay.selectedIndex;
    tableSelectOption[tableSelectDay.selectedIndex].selected='selected'
    console.log("selecttable", tableSelectDay.selectedIndex);
    console.log("selectOption", tableSelectOption);
    console.log("selectform", selectedDay.selectedIndex);
}
  document.getElementById("table-body").innerHTML = temp;
}
function validForm() {
  if ( (minutes.value != "") && (timeFrom.value != "") && (toTime.value != "") && (selectedDay.selectedIndex != 0)) {
    selectedDay.classList.remove("border-danger");
    timeFrom.classList.remove("border-danger");
    toTime.classList.remove("border-danger");
    minutes.classList.remove("border-danger");

    return true;
  } else {
       var toast = document.getElementById("toast");
    var bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    selectedDay.classList.add("border-danger");
    timeFrom.classList.add("border-danger");
    toTime.classList.add("border-danger");
    minutes.classList.add("border-danger");

    return false;
  }
}
function addTimeSlot() {
  let timeSlot = {
    selectedDay: selectedDay.value,
    timeFrom: timeFrom.value,
    toTime: toTime.value,
  };
  timeSlotsList.push(timeSlot);
  localStorage.setItem("timeSlotsList", JSON.stringify(timeSlotsList));
  addTimeSlots();
}
function removeTimeSlot(i) {
  timeSlotsList.splice(i, 1);
  localStorage.setItem("timeSlotsList", JSON.stringify(timeSlotsList));

  addTimeSlots();
}
function resetTimeSlots() {
  selectedDay.selectedIndex = 0;
  minutes.value = "";
  timeFrom.value = "";
  toTime.value = "";
}

$(document).ready(function () {
  $("#deliveryTime").bootstrapToggle({
    on: "Yes",
    off: "No",
    size: "normal",
  });
  $("#deliveryTime").change(function () {
    if (this.checked) {
      $("#deliveryDetails").fadeIn(500);
    } else {
      $("#deliveryDetails").fadeOut(500);
    }
  });
});
