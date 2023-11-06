//Defining function to manage calendar events
$(function () {
  //use dayjs library to initialize date function
  var today = dayjs();
  //using dayjs to define current hour
  var currentHour = today.format("H");
  //using days to define current day
  $("#currentDay").text(today.format("MMM D, YYYY"));
  //looping through the divs using the div ids in order to dynamically update class for past, present, and future
  for (i = 9; i <= 17; i++) {
    var divClass;
    //checking to see if there are tasks stored in localStorage for those hours
    var saveTasksName = "saveTasks" + "hour-" + i + today.format("MMM-D-YYYY");
    var tasks = localStorage.getItem(saveTasksName);
    var parentDiv = $("#hour-" + i);
    if (tasks != null) {
      //if there are tasks stored in localStorage, it will be displayed on the textarea.
      parentDiv.find("textarea").val(tasks);
    }
    if (currentHour > i) {
      divClass = "past";
    } else if (currentHour == i) {
      divClass = "present";
    } else {
      divClass = "future";
    }
    $("#hour-" + i).addClass(divClass);
  }
  //this is the function to store parent div id and event in localStorage when saveBtn is clicked
  $(".saveBtn").click(function () {
    var parentDivId = $(this).parent().attr("id");
    var textareaValue = $(this).siblings("textarea").val();
    var saveTasks = "saveTasks" + parentDivId + today.format("MMM-D-YYYY");
    localStorage.setItem(saveTasks, textareaValue);
    $(".notification").html(
      "Appointment added to <span>localstorage</span> &#10003"
    );
  });
});
