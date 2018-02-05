var config = {
    apiKey: "AIzaSyCMTh0EPhtXV0b6d5YAIsUYj_6PogGf0qg",
    authDomain: "train-schedules-3a9a6.firebaseapp.com",
    databaseURL: "https://train-schedules-3a9a6.firebaseio.com",
    projectId: "train-schedules-3a9a6",
    storageBucket: "train-schedules-3a9a6.appspot.com",
    messagingSenderId: "847922981052"
  };

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding train schedule
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  // capture user input
  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var startingTime = moment($("#startingTime-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creation of local temp object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    startingTime: startingTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#startingTime-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var startingTime = childSnapshot.val().startingTime;
  var frequency = childSnapshot.val().frequency;


  var formatTime = moment.unix(startingTime).format("h:mma");
  


  var timeDiff = moment().diff(moment.unix(startingTime, "X"), "minutes");
  
  
  var remainder = timeDiff % frequency;
  
  
  var waitTime = frequency - remainder;
  

  var nextArrival = moment().add(waitTime, "minutes").format("h:mma");
  


  // Add train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + 
  "</td><td class='tableBody'>" + destination + "</td><td class='tableBody'>"
  + frequency + "</td><td class='tableBody'>" + nextArrival +
  "</td><td class='tableBody'>" + waitTime + "</td></tr>");
});
