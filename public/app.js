document.addEventListener("DOMContentLoaded", event => {

    const firebaseConfig = {
        apiKey: "AIzaSyCzWPeTGJsB0s3wk_dR1qrfyT9CZI23LDg",
        authDomain: "worktime-c70c6.firebaseapp.com",
        databaseURL: "https://worktime-c70c6.firebaseio.com",
        projectId: "worktime-c70c6",
        storageBucket: "worktime-c70c6.appspot.com",
        messagingSenderId: "652565024473",
        appId: "1:652565024473:web:5f2dc25d6796314f4878c8",
        measurementId: "G-NE1TNK7RSR"
      };

       // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // const db = firebase.firestore();
    const db = firebase.database();
    
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            document.getElementById('googleLogin').style.display = "none";
            document.getElementById('googleLogin2').style.display = "none";
            document.getElementById('logout').style.display = "block";
            document.getElementById('mainContents').style.display = "block";
            document.getElementById('profilePic').style.display = "block";
            document.getElementById('profilePic').src = user.photoURL;
            document.getElementById('startButton').style.display = "block";
            //show current timestamps here
           
            let userData = db.ref(`users/${user.uid}/Timestamps`)
            userData.on('value', (snapshot) => {
                getTimestampList(snapshot.val());
            })


            // let userTimestamps = db.collection('users').doc(user.uid)
            // userTimestamps.onSnapshot(snapshot => getTimestampList(snapshot.data()))
        }
        else {
            document.getElementById('googleLogin').style.display = "block";
            document.getElementById('googleLogin2').style.display = "block";
            document.getElementById('logout').style.display = "none";
            //show nothing
        }
    })
});

let getDateTime = () => {
    var today = new Date();

    var year = today.getFullYear();
    var month = ((today.getMonth()+1) < 10) ? ('0'+(today.getMonth()+1)) : (today.getMonth()+1);
    var day = ((today.getDate()) < 10) ? ('0'+(today.getDate())) : (today.getDate());
    var hour = ((today.getHours()) < 10) ? ('0'+(today.getHours())) : (today.getHours());
    var minute = ((today.getMinutes()) < 10) ? ('0'+(today.getMinutes())) : (today.getMinutes());
    var second = ((today.getSeconds()) < 10) ? ('0'+(today.getSeconds())) : (today.getSeconds());

    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date+' '+time;
    var dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`

    return dateTime.toString()
}


let googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log(user)
        })
        .catch(err => console.log(err))
}

let logout = () => {
    firebase.auth().signOut().then((message) => console.log("user logged out", message))
    window.location.reload();
}

let checkIn = () => {
    const db = firebase.database();
    let user = firebase.auth().currentUser;
    if(user){
        
        let userDataList = db.ref(`users/${user.uid}/Timestamps`)
        let posting = userDataList.push({"check-in": getDateTime()})
        console.log("posting")
        
        
        // const db = firebase.firestore();

        /*
        const myEntry = db.collection(user.uid).add({"Check-in": new Date()})
            .then((result) => window.location.reload())
            .catch(err => console.log(err)) */
    }
    
}

let checkOut = () => {
    const db = firebase.database();
    let user = firebase.auth().currentUser;
    if(user){
        let userDataList = db.ref(`users/${user.uid}/Timestamps/${event.target.id}`)
        let updates = {}
        updates[`users/${user.uid}/Timestamps/${event.target.id}/check-out`] = getDateTime()
        
        db.ref().update(updates)
        
    }
}
