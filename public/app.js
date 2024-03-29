document.addEventListener('DOMContentLoaded', (event) => {
	const firebaseConfig = {
		apiKey: 'AIzaSyCzWPeTGJsB0s3wk_dR1qrfyT9CZI23LDg',
		authDomain: 'worktime-c70c6.firebaseapp.com',
		databaseURL: 'https://worktime-c70c6.firebaseio.com',
		projectId: 'worktime-c70c6',
		storageBucket: 'worktime-c70c6.appspot.com',
		messagingSenderId: '652565024473',
		appId: '1:652565024473:web:5f2dc25d6796314f4878c8',
		measurementId: 'G-NE1TNK7RSR',
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

	const db = firebase.database();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			document.getElementById('login-button').style.display = 'none';
			document.getElementById('mainContents').style.display = 'block';
			let userData = db.ref(`users/${user.uid}/Timestamps`);
			userData.on('value', (snapshot) => {
				getTimestampList(snapshot.val());
			});
		} else {
			document.getElementById('logout-button').style.display = 'none';
			document.getElementById('goToStart').style.display = 'none';
			document.getElementById('export-button').style.display = 'none';
		}
	});
});

let getDb = () => {
	return firebase.database();
};

let getUser = () => {
	return firebase.auth().currentUser;
};

let getDateTime = () => {
	var today = new Date();

	var year = today.getFullYear();
	var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
	var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
	var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
	var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
	var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
	var dateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

	return dateTime.toString();
};

let googleLogin = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			const user = result.user;
			window.location.reload();
		})
		.catch((err) => console.log(err));
};

let logout = () => {
	firebase
		.auth()
		.signOut()
		.then((message) => console.log('user logged out', message));
	window.location.reload();
};

let checkIn = () => {
	const db = getDb();
	let user = getUser();
	if (user) {
		let userDataList = db.ref(`users/${user.uid}/Timestamps`);
		let posting = userDataList.push({ 'check-in': getDateTime() });
	}
};

let checkOut = () => {
	const db = getDb();
	let user = getUser();
	if (user) {
		let userDataList = db.ref(`users/${user.uid}/Timestamps/${event.target.id}`);
		let updates = {};
		updates[`users/${user.uid}/Timestamps/${event.target.id}/check-out`] = getDateTime();

		db.ref().update(updates);
	}
};

let edit = () => {
	const db = getDb();
	let user = getUser();
	let row_id = event.target.id.slice(5);
	if (user) {
		let userDataList = db.ref(`users/${user.uid}/Timestamps/${row_id}`);
		let relevant_row = document.getElementById(`row-${row_id}`);

		userDataList.on('value', (snapshot) => {
			editTimestampList(relevant_row, row_id, snapshot.val());
		});
		//
	}
};

let submitEdit = () => {
	let row_id = event.target.id.slice(7);
	let relevant_row = document.getElementById(`row-${row_id}`);
	let inputs = relevant_row.getElementsByTagName('input');
	let checkInValue;
	let checkOutValue;
	if (inputs.length > 0) {
		checkInValue = inputs[0]['value'];
		if (inputs.length > 1) {
			checkOutValue = inputs[1]['value'];
		}
	}

	let user = getUser();
	let db = getDb();

	if (user) {
		let updates = {};
		if (checkInValue) {
			updates[`users/${user.uid}/Timestamps/${row_id}/check-in`] = checkInValue;
		}
		if (checkOutValue) {
			updates[`users/${user.uid}/Timestamps/${row_id}/check-out`] = checkOutValue;
		}

		db.ref().update(updates);
	}
};

let resetEdit = () => {
	const db = getDb();
	let user = getUser();
	let row_id = event.target.id.slice(6);
	let relevant_row = document.getElementById(`row-${row_id}`);
	let userDataList = db.ref(`users/${user.uid}/Timestamps/${row_id}`);
	userDataList.on('value', (snapshot) => {
		setDefaultTableItem(relevant_row, row_id, snapshot.val());
	});
};

let deleteEntry = () => {
	let row_id = event.target.id.slice(7);
	let relevant_row = document.getElementById(`row-${row_id}`);
	let user = getUser();
	let db = getDb();

	if (user) {
		let updates = {};
		updates[`users/${user.uid}/Timestamps/${row_id}/check-in`] = null;
		updates[`users/${user.uid}/Timestamps/${row_id}/check-out`] = null;

		db.ref().update(updates);
	}
};

let provideExport = () => {
	const db = getDb();
	let user = getUser();
	let userData = db.ref(`users/${user.uid}/Timestamps/`);
	userData.once('value', (snapshot) => {
		let csvContent =
			'data:text/csv;charset=utf-8,' +
			'id,check-in,check-out\n' +
			Object.entries(snapshot.val())
				.map((item) => [item[0], item[1]['check-in'], item[1]['check-out']].join(','))
				.join('\n');

		var encodedUri = encodeURI(csvContent);
		var link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', `my_timestamps_${getDateTime()}.csv`);
		document.body.appendChild(link);
		link.click(); // This will download the data file named "my_data.csv".
	});
};
