




const firebaseConfig = {
  apiKey: "AIzaSyBmqzRLUCLkYP64SzD7cCb3Fauz4ohDfDs",
  authDomain: "amnesiacsavior3421.firebaseapp.com",
  projectId: "amnesiacsavior3421",
  storageBucket: "amnesiacsavior3421.appspot.com",
  messagingSenderId: "529656710642",
  appId: "1:529656710642:web:6fb5a8aa586f84227cd76b",
  measurementId: "G-ENC0T71582"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var myDatabase = firebase.database();
var user=null;
var uid;
var day="11";
var subject="web";
var description="xxxxxxxx"

function signinWithGoogle() {
  const provider=new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
      .then((result) => {
        console.log("sign in success")
        user=result.user;
        uid=user.uid
      }).catch((error) => {
        console.log("sign in error")

      });
}

function createNewEvent(day,subject,description) {
  if (user!=null){
    console.log("create new event")
    var eventRootRef=myDatabase.ref('events/' + uid+"/"+day);
    var current=new Date();
    var newEventRef=eventRootRef.push();
    newEventRef.set({
      "eventKey":newEventRef.toString().replace(eventRootRef.toString()+"/",""),
      "subject":subject,
      "description":description,
      "finished": 0,
      "addtime": current.toString()
    })
  }
}

function getTODOListByDay(day){
  var toDoList;
  if (user!=null){
  var eventRootRef=myDatabase.ref("events/"+uid+"/"+day);
  eventRootRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var event = childSnapshot.val();
      toDoList+=event.eventKey;
      toDoList+=':';
      toDoList+=event.description;
      toDoList+=event.subject;
      toDoList+='///';

      if (event.finished!=0){
        toDoList.push(event);
      }
    });
  });
  document.getElementById("todo").innerText=toDoList;
  }
}

