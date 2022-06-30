/* sanitizeInput method basically doing the santizing input value
	the method parameter should be as string.
	It can be santize based on non-word characters.
	Simply make as normal string insted of html 
*/
function sanitizeInput(str) {
	return str.replace(/[^\w. ]/gi, function (char) {
		return '&#' + char.charCodeAt(0) + ';'; /*specal characters convert to string */
	});
};

/* sanitizeOutput is the method to santize the inpput value from javascript.quiz.html calling this methods */
function sanitizeOutput() {
    var inputValue = document.querySelector('#inputSanitize').value;
   document.querySelector('#sanitizedOutput').innerHTML =  sanitizeInput(inputValue);
}

/* without sanitize the input value. For reference puprpose only I did. I know this not asked */
function unSaniitized() { 
    var inputValue = document.querySelector('#inputUnSanitize').value;
    document.querySelector('#unSanitizedOutput').innerHTML =  inputValue;
}

/////////////////////////////////////////////
///////// Part 2 ///////////////
///////////////////////////////////////////

/* Question 3 -6 */

/*  Make playback action array based on the table records in TASK PDF*/
 var userPlayBackActionArray = [ 
	{
	user_id: 1,
	device: "Windows 10",
	action: "start",
	date_actioned: 100
 }, {
	user_id: 2,
	device: "OSX 15.4",
	action: "start",
	date_actioned: 200
 }, {
	user_id: 1,
	device: "iPhone 8s",
	action: "start",
	date_actioned: 250
 }, {
	user_id: 1,
	device: "Windows 10",
	action: "stop",
	date_actioned: 370
 }, {
	user_id: 1,
	device: "iPhone 8s",
	action: "stop",
	date_actioned: 410
 },  {
	user_id: 2,
	device: "OSX 15.4",
	action: "stop",
	date_actioned: 490
 },  {
	user_id: 3,
	device: "Android 9.1",
	action: "start",
	date_actioned: 700
 },
 {
	user_id: null,
	device: null,
	action: null,
	date_actioned: null
 }
];

/* Question 3
    Returns all user ids that performed that action within the privided action and time.
	getUsers is a method parameters as
	@records
	@action
	@start_time
	@stop_time
 */

function getUsers(records, action, start_time, stop_time) {
	var actionedUserIds = [];
	if(records.length > 0){
		/*  filter records from records based the parameter values. (filter method used from EcmaScript) */
		var filterRecords =	records.filter(record => (record.action === action && record.date_actioned >= start_time & record.date_actioned <= stop_time));
		 if(filterRecords.length > 0) {
			filterRecords.forEach(element => {
				let findExistUserId = actionedUserIds.findIndex(userId => userId === element.user_id); 
				/*  If already user_Id  into actionedUserIds,  */
				/*  then we dont required duplicate user_ids. I just assumed myself. the question not even defined this */
				if(findExistUserId === -1){
				 actionedUserIds.push(element.user_id);
				}
			});
		 }
		 /* value print in the console */
		 console.log(action + ' actioned User Ids ' + actionedUserIds);
		 return action + ' actioned User Ids ' + actionedUserIds;
	}
}
/* excute the function to get users */ 
getUsers(userPlayBackActionArray, "start", 100, 900); /* Example 1 */
getUsers(userPlayBackActionArray, "stop", 400, 500); /* Example 2 */

/* 
Find unique playback time Question 4#
getUniquePlaybackTime() is the method as ainput parameters are
@records
@user_id
*/

function getUniquePlaybackTime(user_id, records){
	var uniquePlaybackTime;
	/* filter all the action records based on user Id */
	var filterOnUserId = records.filter(record => record.user_id === user_id);
	if(filterOnUserId.length > 0){
		/* filter the records based on actions */
		var filterStartActions = filterOnUserId.filter(record => record.action === "start"); 
		var filterStopActions = filterOnUserId.filter(record => record.action === "stop");
		/* sorting the final arrays */
		var sortStartActions = sortArray(filterStartActions);
		var sortStopActions = sortArray(filterStopActions);
		/*  It might not mentioned in question. 
		 But I preseume if there any condions not have user start or stop action */
		if(sortStartActions.length === 0 && sortStopActions.length === 0) {
			uniquePlaybackTime = 0;
		} else if(sortStartActions.length === 0){
			uniquePlaybackTime = sortStopActions[sortStopActions.length -1].date_actioned ;
		} else if(sortStopActions.length === 0) {
			uniquePlaybackTime = sortStartActions[0].date_actioned
		} else {
			uniquePlaybackTime = (sortStopActions[sortStopActions.length -1]?.date_actioned - sortStartActions[0]?.date_actioned);
		}
	}
	else {
		uniquePlaybackTime = 0;
	}
	console.log(uniquePlaybackTime)
	return (uniquePlaybackTime);
}
/* sorting the array common method */
function sortArray(records) {
	return Object.values(records).sort(function(a, b){
		return sortArray[a]-sortArray[b];
	})
}

getUniquePlaybackTime(1, userPlayBackActionArray); /* Example 1 */
getUniquePlaybackTime(2, userPlayBackActionArray); /* Example 2 */

/* As per Question 5 added neccessary comments */
/* As per Question 6 nothing much I found here. Basically I used advaced javascript (EcmaScript) */