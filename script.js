// Hours variable to store and loop through scheduler
var workDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: " am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: " am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: " am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: " pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: " pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: " pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: " pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: " pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: " pm",
        reminder: ""
    },
    
]
// save hours var to localStorage
function saveReminders() {
    localStorage.setItem("workDay", JSON.stringify(workDay));
}

// sets any data in localStorage to be displayed
function displayReminders() {
    workDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("workDay"));

    if (storedDay) {
        workDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// Display header date
$(document).ready(function() {
    var currentDate = moment().format('dddd MMMM Do YYYY');
    var $headerDate = $('#currentDay');
    $headerDate.text(currentDate);
});

// creating Timeblocks
workDay.forEach(function(thisHour) {
    // timeblocks rows
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // time holder Boxes
    var hourBox = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // Textarea Boxes
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "col-md-12 description p-4 past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "col-md-12 description p-4 present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "col-md-12 description p-4 future"
        })
    }

    // save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourBox, hourPlan, savePlan);
})

// loads any existing localstorage 
init();

// saves data in localStorage on click of save button 
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".col-md-12").attr("id");
    workDay[saveIndex].reminder = $(this).siblings(".description").children(".col-md-12").val();
    //display saved message
    alert("Saved!");
    saveReminders();
    displayReminders();
})



