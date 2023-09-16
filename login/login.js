const firebaseConfig = {
  apiKey: "AIzaSyCSJiNlhc_Db69xvdU399HZJAN4I8hd5r0",
  authDomain: "donation-harbour.firebaseapp.com",
  databaseURL: "https://donation-harbour-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "donation-harbour",
  storageBucket: "donation-harbour.appspot.com",
  messagingSenderId: "516172119638",
  appId: "1:516172119638:web:2cceec93b61824bfddc5f7",
  measurementId: "G-G097S7BJDX"
};
  
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
let index = 0;

document.getElementById("signUpLink").addEventListener("click", () => {
  document.querySelector(".carouselContainer").style.left = "45.45%";
});

document.getElementById("logInLink").addEventListener("click", () => {
  document.querySelector(".carouselContainer").style.left = "0";
});

function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
    userName = result.additionalUserInfo.profile.given_name;
    userID = result.additionalUserInfo.profile.id;
    sessionStorage.setItem('username', userName);
    sessionStorage.setItem('userid', userID);
    window.location.href = "/dashboard/dashboard.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

function signInWithEmailAndPassword(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  const user = userCredential.user;
  const userEmail = result.user.email; 
  sessionStorage.setItem('username', userName);
  sessionStorage.setItem('userid', result.user.uid);
  sessionStorage.setItem('useremail', userEmail); 
  window.location.href = "/dashboard/dashboard.html";
})
.catch((error) => {
  window.alert('Sign-in error:' + error);
});
}

function signUpWithEmailAndPassword(email, password, name) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
  const user = userCredential.user;
  user.updateProfile({
displayName: name,
  }).then(function() {
sessionStorage.setItem('username', user.displayName);
sessionStorage.setItem('userID', user.uid);
  }).catch(function(error) {
window.alert(error)
  })
})
.catch((error) => {
  throw error 
});
}

function signInWithGoogleCharity() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const userID = user.uid;

      const database = firebase.database();
      const databaseRef = database.ref(`charityRequests/${userID}/verified`);
      
      databaseRef.once(userID, (snapshot) => {
        const verified = snapshot.val();

        if (verified === true) {
          // User is verified, redirect to the charity dashboard
          window.location.href = "../charityReqPage/charity.html";
        } else {
          // User is not verified, redirect to the verification page
          window.location.href = "../dashboard/charity-verify/index.html";
        }
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}


function SignUpButton() {
const email = document.getElementById("emailS").value;
const password = document.getElementById("passwordS").value;
const name = document.getElementById("name").value;
signUpWithEmailAndPassword(email, password, name);
}
  
function SignInButton() {
  const email = document.getElementById("emailL").value;
  const password = document.getElementById("passwordL").value;
  signInWithEmailAndPassword(email, password)
}