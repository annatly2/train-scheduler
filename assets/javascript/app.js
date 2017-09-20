$(document).ready(function(){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmjG0ZUQcZZpeJ8EthXI67ijcvYCzOYw8",
    authDomain: "train-scheduler-d4f27.firebaseapp.com",
    databaseURL: "https://train-scheduler-d4f27.firebaseio.com",
    projectId: "train-scheduler-d4f27",
    storageBucket: "train-scheduler-d4f27.appspot.com",
    messagingSenderId: "1026606938343"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button for adding new train
$("#add-train-btn").on("click", function(event){
  event.preventDefault();

//Grabs user input
var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var trainTime = moment($("#train-time-input").val().trim(),"HH:mm").format("HH:mm");
var frequency = $("#frequency-input").val().trim();

//Sets input in new temporary object
var newTrain = {
  name: trainName,
  dest: destination,
  time: trainTime,
  freq: frequency
};

//Uploads train data to the database
database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.dest);
console.log(newTrain.time);
console.log(newTrain.freq);

//Clears text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#train-time-input").val("");
$("#frequency-input").val("");

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  console.log("hello!!!");
  console.log(childSnapshot.val());
  console.log(prevChildKey);

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().freq;

  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  var currentTime = moment();
  var nextArrive = moment.unix(trainTime).format("HH:mm");
  var minsAway = moment.utc(moment().format("HH:mm")).diff(moment(trainTime, "HH:MM"));
  console.log(minsAway);

  //$("#train-table >tbody").append("<tr><td")


})

});




});
