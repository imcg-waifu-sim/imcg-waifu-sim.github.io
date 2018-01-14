// THIS IS FOR IDOLMASTER CINDERELLA GIRLS

var globalAudio = null;
var globalWaifu = 'uzuki';
//var maxNumOfCard = id_log[id_log.length-1][0];
var language = 'english';
var maxNumBackground = 2;
var globalIndex = 0;
var away = false;
var timerRanOut = false;
var enableOutsideVal = true;

var charBackground = true;


function isAqours(waifu)
{
	if(waifu == 'chika' || waifu == 'you' || waifu == 'riko' ||
		waifu == 'hanamaru' || waifu == 'yoshiko' || waifu == 'ruby' ||
		waifu == 'kanan' || waifu == 'mari' || waifu == 'dia'){

		return true;

	}else {
		return false;
	}
}

function forgetWaifuRNG(maxRandNum)
{
	// Random number generation for forget speech

	var n = Math.floor(Math.random() * maxRandNum);

	// Forget speech
	if(n == maxRandNum - 1){
		var neg = changeWaifuLoadRandom();
		if(neg == -1)
		{
			return -1;
		}

		forgotSpeech();
		return 0;
		
	}
	return -1;
}


var timeout;
var countdown = 20000;



$(document).on('mousemove', function(){

	clearTimeout(timeout);


	timeout = setTimeout(inactiveSpeech, countdown);
	
	

})


function inactiveSpeech()
{
	var id = parseInt(id_log[globalIndex][0]);
	var name = id_log[globalIndex][1];
	var idolized = id_log[globalIndex][2];
			
	
	if(!away){
		//timeSpeech();
		commandSelect(0);
		clearTimeout(timeout);
		timeout = setTimeout(inactiveSpeech, countdown);
	} else {
		return;
	}
}

function outsideSpeak()
{
	var id = parseInt(id_log[globalIndex][0]);
	var name = id_log[globalIndex][1];
	var idolized = id_log[globalIndex][2];
			
	
	if(away && enableOutsideVal){
		commandSelect(0);
		clearTimeout(timeout);
		timeout = setTimeout(outsideSpeak, countdown);
	} else {
		return;
	}
}


function forgotSpeech()
{
	
    var audioPath = "audio/";
    var waifuName = globalWaifu + "/";
    var file = 'forget/';

    var maxRandNum = 2;
    var n = Math.floor(Math.random() * maxRandNum);


    var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
    globalAudio = new Audio(superString);
    globalAudio.volume = voiceVolume;
    globalAudio.play();
        

    var pathString = "".concat(audioPath, waifuName, file);
    changeSpeechText(pathString, n);
    //refreshBubble();


}

function enableOutside()
{
	enableOutsideVal = document.getElementById('outsideCheckbox').checked;
}

function changeWaifuLoadRandom() {
    var index=getCookie("saved-waifu-index-1");
    var index2=getCookie("saved-waifu-index-2");
    var index3=getCookie("saved-waifu-index-3");



    if((index == null && index == "") && (index2 == null && index2 == "") && (index3 == null && index3 == ""))
    {
    	return -1;
    }

    var nums = [1,2,3],
    ranNums = [],
    i = nums.length,
    j = 0;

	while (i--) {
	    j = Math.floor(Math.random() * (i+1));
	    ranNums.push(nums[j]);
	    if(nums[j] == 1){
	    	 if (index != null && index != "") {
		        globalIndex = index;
		        forgetWaifuLoad(index);
		        return 1;  
		    }
	    } else if (nums[j] == 2){
	    	if (index2 != null && index2 != "") {
		        globalIndex = index2;
		        forgetWaifuLoad(index2);
		        return 2;	        
		    }
	    } else if (nums[j] == 3){
			if (index3 != null && index3 != "") {
		        globalIndex = index3;
		        forgetWaifuLoad(index3);
		        return 3;
		    } 
	    }
	    
	    nums.splice(j,1);
	}

    return -1;
}




function seasonSpeech()
{
	var today;
	today = new Date();
	var curr_year = today.getFullYear();
	var curr_month = today.getMonth() + 1;


	var audioPath = "audio/";
	var waifuName = globalWaifu + "/";
	var file = 'months/';
	var n;


	// setFullYear(Year, month, day)
	if(curr_month >= 3 &&  curr_month <= 5){
		// Between 3/1 and 5/31
		n = 0;
	} else if(curr_month >= 6  &&  curr_month <= 8){
		// Between 6/1 and 8/31
		n = 1;
	} else if(curr_month >= 9 && curr_month <= 11){
		// 9/1 to 11/30
		n = 2;
	} else if( curr_month >= 12 || curr_month <= 2){
		// 12/1/(year) to 2/29/(year + 1)
		n = 3;
	}

	var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
	globalAudio = new Audio(superString);
	globalAudio.volume = voiceVolume;
	globalAudio.play();
		

	var pathString = "".concat(audioPath, waifuName, file);
	changeSpeechText(pathString, n);
	//refreshBubble();
}


function marineDayCheck()
{
	// Check if current girl has a marineDay quote
	if(globalWaifu == 'umi' || globalWaifu == 'honoka' || globalWaifu == 'kotori'){
		return true;
	}
	return false;
}

function searchEventIndex(f, n)
{
	var i;
	for(i = 0; i < event_id_log.length; i++)
	{
		if(event_id_log[i][0] == f.toString())
		{
			// Return index + number (secondary Index of that event)
			if(f > 2 && !marineDayCheck())
			{
				// To prevent marineDay from interfering with non-marine day characters
				return i + n - 2;
			}
			return i + n;
		}
	}
}

function eventSpeechSound(f,maxNum){
	var audioPath = "audio/";
	var waifuName = globalWaifu + "/";
	var file = 'holiday/';
	var dash = "-";

	// Random number generator
	maxNum = maxNum + 1;
	var n = Math.floor(Math.random() * maxNum);

	// Get index
	var txtIndex = searchEventIndex(f,n);

	// Get sound
	var superString = "".concat(audioPath, waifuName, file, f, dash, n, ".mp3");
	globalAudio = new Audio(superString);
	globalAudio.volume = voiceVolume;
	globalAudio.play();
	
	// Add text
	var pathString = "".concat(audioPath, waifuName, file);
	changeSpeechText(pathString, txtIndex);
	//refreshBubble();
}



function eventSpeech()
{
	var today;
	today = new Date();
	var curr_year = today.getFullYear();
	var curr_month = today.getMonth() + 1;
	var curr_day = today.getDate();
	var n = 1;




	if(curr_month == 3 ){

		if(curr_day == 3)
		{
			// Doll's Day
			var f = 15;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 14){
			// White Day
			var f = 16;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 15){
			// Umi's birthday
			var f = 17;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 31){
			// Pre Final concert
			var f = 18;
			n = 0;
			eventSpeechSound(f,n);
			return 0;

		}


	} else if(curr_month == 4){

		if(curr_day == 1)
		{
			// Final concert
			var f = 19;
			n = 0;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 19){
			// Maki's birthday
			var f = 20;
			n = 0;
			eventSpeechSound(f,n);
			return 0;

		} 

	} else if(curr_month == 5){

		if(curr_day == 5){
			// Children's day
			var f = 21;
			n = 0;
			eventSpeechSound(f,n);
			return 0;

		}

	}else if(curr_month == 6){

		if(curr_day == 9){
			// Nozomi's birthday
			var f = 0;
			eventSpeechSound(f,n);
			return 0;

		}

	} else if(curr_month == 7){
		if(curr_day == 7){
			// Star Festival
			var f = 1;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 18 && marineDayCheck()){
			// Marine Day
			var f = 2;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 22){
			// Nico's birthday
			var f = 3;
			eventSpeechSound(f,n);
			return 0;

		}
		

	}else if(curr_month == 9){
		if(curr_day == 12){
			// Kotori's Birthday
			var f = 4;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 15){
			// Mid-Autumn Festival
			var f = 5;
			eventSpeechSound(f,n);
			return 0;

		}

	} else if(curr_month == 10){
		if(curr_day == 21){
			// Eli's birthday
			var f = 6;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 31){
			// Halloween
			var f = 7;
			eventSpeechSound(f,n);
			return 0;

		}

	} else if(curr_month == 11){
		if(curr_day == 1){
			// Rin's birthday
			var f = 8;
			eventSpeechSound(f,n);
			return 0;

		}
		
	} else if( curr_month == 12){
		if(curr_day == 25){
			// Christmas
			var f = 9;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 31){
			// New Year's Eve
			var f = 10;
			eventSpeechSound(f,n);
			return 0;

		}
		
	} else if( curr_month == 1){
		if(curr_day == 1){
			// New Year's Day
			var f = 11;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 17){
			// Hanayo's birthday
			var f = 12;
			eventSpeechSound(f,n);
			return 0;

		}
		
	} else if( curr_month == 2){
		if(curr_day == 3){
			// Setsubun
			var f = 13;
			eventSpeechSound(f,n);
			return 0;

		} else if(curr_day == 14){
			// Valentine's day
			var f = 14;
			eventSpeechSound(f,n);
			return 0;

		}
	}
	return -1;
	
}









function timeSpeech()
{
	var today;
	today = new Date();
	var curr_hour = today.getHours();


	var maxNum = 4;
	var n = Math.floor(Math.random() * maxNum);


	var audioPath = "audio/";
	var waifuName = globalWaifu + "/";
	var file = 'inactive/';
	var n;

	if(n == 0){
		// Play the 12:00am to 11:59pm clip
		n = 0;

	} else if(n == 1){

		if(curr_hour <= 5 && curr_hour >= 17){
			// 5am to 5pm
			n = 1;
		} else if(curr_hour <= 17  || curr_hour >= 4){
			// From 5pm to 4am
			n = 2;
		}

	} else if (n >= 2){

		if(curr_hour >= 5 && curr_hour <= 11){
			// 5am to 11am
			n = 3;
		} else if(curr_hour >= 11 && curr_hour <= 17){
			// 11am to 5pm
			n = 4;
		} else if(curr_hour >= 17 && curr_hour <= 22){
			// 5pm to 10pm
			n = 5;
		} else if(curr_hour >= 22 || curr_hour <= 5){
			// 10pm to 5am
			n = 6;
		}
	
	} else {
		alert('Something went wrong');
		return;
	}

	if (globalAudio!=null){
        globalAudio.pause();
    }

	var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
	globalAudio = new Audio(superString);
	globalAudio.volume = voiceVolume;
	globalAudio.play();
		

	var pathString = "".concat(audioPath, waifuName, file);
	changeSpeechText(pathString, n);
	//refreshBubble();

}

function removeOccIDAr(useAR) {
    var arr = [];
    var tempAr = [];
    for(var i = 0; i < useAR.length; i++) {
        if(!tempAr.includes(useAR[i][2])) {

        	tempAr.push(useAR[i][2]);

        	if(useAR[i][2].split("_").length < 2){
				// One word name
				var fullName = useAR[i][2];
			} else {
				var firstName = useAR[i][2].split("_")[1];
				var lastName = useAR[i][2].split("_")[0];
				var fullName = firstName + "_" + lastName;
			}

            arr.push([fullName,useAR[i][2]]);

        }
    }
    return arr; 
}

function createQuickWaifuSelect(arr){

	resAr = [];

	arr.sort();
	
	for(var i = 0; i < arr.length; i++){

		if(arr[i][0].split("_").length < 2){
			// One word name
			var fullName = capitalizeFirstLetter(arr[i][0]);
		} else {
			var firstName = capitalizeFirstLetter(arr[i][0].split("_")[0]);
			var lastName = capitalizeFirstLetter(arr[i][0].split("_")[1]);
			var fullName = lastName + " " + firstName;
		}


		// Now we create selectbox

		var selectBoxWaifu = document.getElementById("select-waifu");
   		var option = document.createElement("option");
        option.text = fullName;
        option.value = arr[i][1];

        selectBoxWaifu.add(option);


	}

}

window.onload = function() {
	backgroundAudio=document.getElementById("origin-music-player");

	$('#updateModal').modal('show');

	// Preform cookie checks
	checkCookie();
	checkBackgroundCookie();
	checkBGMCookie();
	checkVolumeCookie();

	// Going to create the quick waifu selectbox
	rearrangeIDAr = id_log.slice();
	var nameAR = removeOccIDAr(rearrangeIDAr);
	createQuickWaifuSelect(nameAR);

	// Deal with audio
	backgroundAudio.volume= musicVolume;
	backgroundAudio.play();

    setTimeout(function() {
    	commandSelect(0);
	}, 1000, true)
}


function updateVolumeMusic(soundValue) {
    musicVolume = soundValue/100;
    storeVolumeMusicCookie(musicVolume);
    playBackgroundMusic();
}

function updateVolumeVoice(soundValue) {
    voiceVolume = soundValue/100;
    storeVolumeVoiceCookie(voiceVolume);
    commandSelect(0);
}



function pauseBackgroundMusic()
{
	var audio = document.getElementById("origin-music-player"); // For the main background
	audio.pause();
}

function playBackgroundMusic()
{
	var audio = document.getElementById("origin-music-player"); // For the main background
	var mainAudio = document.getElementById("background-music-player"); // For the music player
	mainAudio.pause();
	audio.pause();
	audio.volume = musicVolume;
	audio.play();
}


function changeBGMusic()
{
	var bgmusic = document.getElementById("bgmusicselect").value;
	var audio = document.getElementById("origin-music-player");
	audio.pause();
	if(bgmusic == 0)
	{
		audio.src = 'audio/background-music.mp3';
		storeBGMusicCookie('0');
	} else if(bgmusic == 1){
		audio.src = 'audio/studio-music-0.mp3';
		storeBGMusicCookie('1');
	} else if(bgmusic == 2){
		audio.src = 'audio/studio-music-1.mp3';
		storeBGMusicCookie('2');
	} else if(bgmusic == 3){
		audio.src = 'audio/studio-music-2.mp3';
		storeBGMusicCookie('3');
	}  else {
		audio.src = 'audio/background-music.mp3';
		storeBGMusicCookie('0');
	}
	audio.play();
}

function backgroundClicked()
{
	if(charBackground && id_log[globalIndex][4] == 'sub'){
		commandSelect(0);
	}
}
function charBackgroundToggleOn()
{	
	charBackground = true;

	var id = id_log[globalIndex][1];
	var name = id_log[globalIndex][2];
	var evolved = id_log[globalIndex][3];
	var subMain = id_log[globalIndex][4];

	if(subMain == 'sub'){
		var backpath = ''
		if(evolved == 'no'){
			id = (parseInt(id)-1).toString();
			backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_pev.png";
		} else {
			id = (parseInt(id)+1).toString();
			backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_p.png";
		}

		document.getElementById("homeScreen").src=backpath;
		document.getElementById("idol_img").src='';

		document.getElementById("charBack_but").innerHTML = 'Character Background: ON';
		document.getElementById("charBack_but").className = 'btn btn-success'

	}

}

function charBackgroundToggleOff()
{
	charBackground = false;

	var id = id_log[globalIndex][1];
	var name = id_log[globalIndex][2];
	var evolved = id_log[globalIndex][3];
	var subMain = id_log[globalIndex][4];

	var idNormal = convertToNormalForm(id, evolved);

	var scrapePath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/";
	

	var path = '';
	if(evolved == 'yes')
	{
		path = scrapePath + name + "/" + idNormal + "_ev.png";
	}else{
		path = scrapePath + name +  "/" + idNormal + ".png";
	}

	document.getElementById("charBack_but").innerHTML = 'Character Background: OFF';
	document.getElementById("charBack_but").className = 'btn btn-primary'
		

	var backpath = 'images/background/background' + background.toString() + '.png';
   	document.getElementById("idol_img").src=path;
	document.getElementById("homeScreen").src=backpath;

}


function charBackgroundChange()
{

	if(!charBackground){
		// Character background was previously off
		// We are turning on character background
		
		charBackgroundToggleOn();

	} else {
		// Character background was previously on
		// We are turning off character background
		charBackgroundToggleOff();
	}
}


function changeBackground()
{	
	if(background < maxNumBackground-1)
	{
		background = background + 1;
	}else {
		background = 0;
	}
	storeBackgroundCookie(background);

	var backpath = 'images/background/background' + background.toString() + '.png';
	
	charBackgroundToggleOff();
	document.getElementById("homeScreen").src=backpath;
	
}

function changeBackgroundBack()
{

	if(background <= 0)
	{
		background = maxNumBackground-1;
		
	}else {
		background = background - 1;
	}
	storeBackgroundCookie(background);

	var backpath = 'images/background/background' + background.toString() + '.png';

	charBackgroundToggleOff();
	document.getElementById("homeScreen").src=backpath;
	

}
function openTranslate(){
	$("#translation-bubble").fadeIn();
}

function closeTranslate(){
	$("#translation-bubble").hide();
}


function refreshBubble()
{
	$(document).ready(function(){
		$("#speech-bubble").hide();
		$("#speech-bubble").fadeIn();
	});
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}



function nameAssign(name)
{

	globalWaifu = name;
	var replacement_name = 'Random ' + capitalizeFirstLetter(name);
	document.getElementById('random-nameplace').innerHTML = replacement_name;

	
}

function waifuRNG()
{
	var maxNum = id_log.length;
	return Math.floor(Math.random() * maxNum);
}


function getWaifuAr(name)
{
	// Searches main
	return id_log.filter(id_log => id_log[2] == name);

}


function cardRNG()
{
	var name = id_log[globalIndex][2];
	var temp_ar = getWaifuAr(name);
	var maxNum = temp_ar.length;


	var n = Math.floor(Math.random() * maxNum);
	
	var temp_index = n;

	var temp_id = temp_ar[temp_index][1];
	var temp_idolized = temp_ar[temp_index][3];


	//alert(temp_ar[temp_index]);
	// Get the index from the main id_log array
	return searchIndexByIdChangeWaifu(temp_id, temp_idolized);

}


function getRandomWaifu()
{

	//var neg = forgetWaifuRNG(30);

	/*
	if(neg == 0){
		// forgetWaifu speech was successful
		return;
	}
	*/

	var i = waifuRNG();
	var charId = parseInt(id_log[i][0]);
	var id = parseInt(id_log[i][1]);
	var name = id_log[i][2];
	var idolized = id_log[i][3];
	
	


	if(idolized == 'no'){
		id = (parseInt(id)-1).toString();
	}

	var path;

	globalIndex = i;



	var scrapePath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/";
	var cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/"

	


	if(idolized == 'yes')
	{
		path = scrapePath + name + "/" + id + "_ev.png";
		cardPicPath = cardPicPath + name + "/" + id + "_ev.png";
		document.querySelector("input[value='yes']").checked = true;
	}else{
		path = scrapePath + name +  "/" + id + ".png";
		cardPicPath = cardPicPath + name +  "/" + id + ".png";
		document.querySelector("input[value='no']").checked = true;
	}
	





	// taking into consideration of charBackground settings
    if(charBackground && id_log[globalIndex][4] == 'sub'){
    	// If character backgrounds are on

    	var id = id_log[globalIndex][1];
		var name = id_log[globalIndex][2];
		var evolved = id_log[globalIndex][3];

		var backpath = ''
		if(evolved == 'no'){
			id = (parseInt(id)-1).toString();
			backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_pev.png";
		} else {
			id = (parseInt(id)+1).toString();
			backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_p.png";
		}

    	document.getElementById("homeScreen").src=backpath;
		document.getElementById("idol_img").src='';
    } else {
    	// if they are off or there is no character background (default card)

    	var backpath = 'images/background/background' + background.toString() + '.png';
    	document.getElementById("idol_img").src=path;
		document.getElementById("cardPicImg").src = cardPicPath;
		document.getElementById("homeScreen").src=backpath;

    }

	

	if(name.split('_').length < 2)
	{
		nameAssign(name);
	} else {
		nameAssign(name.split('_')[1]);
	}
	

	document.getElementById("card_id").value = id;

	if (globalAudio!=null){
		globalAudio.pause();
	}


	setTimeout(function() {
		commandSelect(0);
		
		
	}, 500, true)

	storeCookie(i);


}


function getRandomCard()
{

	/*
	var neg = forgetWaifuRNG(30);

	if(neg == 0){
		// forgetWaifu speech was successful
		return;
	}
	*/


	var i = cardRNG(); 

	//i = 2;


	var id = parseInt(id_log[i][1]);
	var name = id_log[i][2];
	var idolized = id_log[i][3];

	if(idolized == 'no'){
		id = (parseInt(id)-1).toString();
	}

	var path;

	globalIndex = i;

	var scrapePath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/";
	var cardPicPath = "https://imcg-waifu-sim.github.io/imcg-waifu-sim/imcg-waifu-girl-images/"



	
	// If talking about Muse & Aqours
	if(idolized == 'yes')
	{
		path = scrapePath + name + "/" + id + "_ev.png";
		cardPicPath = cardPicPath + name + "/" + id + "_ev.png";
		document.querySelector("input[value='yes']").checked = true;
	}else{
		path = scrapePath + name +  "/" + id + ".png";
		cardPicPath = cardPicPath + name +  "/" + id + ".png";
		document.querySelector("input[value='no']").checked = true;
	}

	// taking into consideration of charBackground settings
    if(charBackground && id_log[globalIndex][4] == 'sub'){
    	// If character backgrounds are on

    	var id = id_log[globalIndex][1];
		var name = id_log[globalIndex][2];
		var evolved = id_log[globalIndex][3];

		var backpath = ''
		if(evolved == 'no'){
			id = (parseInt(id)-1).toString();
			backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_pev.png";
		} else {
			id = (parseInt(id)+1).toString();
			backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_p.png";
		}

    	document.getElementById("homeScreen").src=backpath;
		document.getElementById("idol_img").src='';
    } else {
    	// if they are off or there is no character background (default card)
    	
    	var backpath = 'images/background/background' + background.toString() + '.png';
    	document.getElementById("idol_img").src=path;
		document.getElementById("cardPicImg").src = cardPicPath;
		document.getElementById("homeScreen").src=backpath;

    }



	if(name.split('_').length < 2)
	{
		nameAssign(name);
	} else {
		nameAssign(name.split('_')[1]);
	}

	document.getElementById("card_id").value = id;
	

	if (globalAudio!=null){
		globalAudio.pause();
	}


	setTimeout(function() {
		commandSelect(0);
	}, 500, true)

	storeCookie(i);

}

function checkOutOfBoundsQuoteIndex(id)
{
	var i = 0;
	while(true)
	{
		// Check if we are out of bounds of the entire array
		if(quote_id_log.length <= id + i){
			return i - 1;
		}

		if(quote_id_log[id + i] != quote_id_log[id])
		{
			// If we are out of bounds of our card id number

			return i - 1;
		}
		i++;
	}
}

function searchQuoteIndexByID(id)
{
	// Get the quote index 
	var i;
	for(i = 0; i < quote_id_log.length; i++)
	{
		if(quote_id_log[i] == id)
		{
			return [i, checkOutOfBoundsQuoteIndex(i)];
		}
	}
	return [-1,-1];
}

function searchNameById(id)
{
	var i;
	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][1] == id.toString())
		{

			return id_log[i][2];
		}
	}
	return 'none';
}


function searchIndexByIdChangeWaifu(id, idolized)
{
	var i;

	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][1] == id.toString())
		{
			
			
			// If we are at the end of the array, no need to check if there is anything a step further
			if(i == id_log.length - 1) 
			{
				return i;
			} 

			return i;

		}
	}
	return 'none';
}



function searchIndexById(id, idolized)
{
	var i;

	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][1] == id.toString())
		{

			// If we are at the end of the array, no need to check if there is anything a step further
			if(i == id_log.length - 1) 
			{
				return i;
			} 

			// During normal conditions
			if(idolized == 'yes'){
				return i;
			} else{
				// If not idolized
				return i-1;
			}

		}
	}
	return 'none';
}



function searchIdolizedById(id)
{
	var i;
	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][0] == id.toString())
		{
			return id_log[i][2];
		}
	}
	return 'none';
}


function convertToNormalForm(id, idolized)
{
	
	var i;


	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][1] == id.toString())
		{


			//alert(id_log[i]);
			if(idolized == 'no' && id_log[i][3] == 'no'){
				//alert('1');
				return (parseInt(id_log[i][1])-1).toString();
			} 
			if(idolized == 'yes' && id_log[i][3] == 'yes'){
				//alert('2');
				return id_log[i][1];
				
			} 


			if(idolized == 'no' && id_log[i][3] == 'yes'){
				//alert('3');
				return id_log[i][1];
			} 
			if(idolized == 'yes' && id_log[i][3] == 'no'){
				//alert('4');
				return (parseInt(id_log[i][1])-1).toString();
			} 



			alert('Landed on something, but nothing found');
		}
	}
	return 'none';
}




function searchId()
{

	var id = document.getElementById("card_id").value;
	var idolized = $('input[id="radio-idol"]:checked').val();

	
	if(!isInt(id)){
		alert('Invalid id input');
		//alert('Invalid id input. Please enter a number between 28 and ' + maxNumOfCard.toString());
		return;
	} 

	var idNormal = convertToNormalForm(id, idolized);
	var name = searchNameById(id);



	


	// Once we get the info, get the image
	var path;

	var scrapePath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/";
	var cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/"


	
	// If talking about Muse & Aqours
	if(idolized == 'yes')
	{
		path = scrapePath + name + "/" + idNormal + "_ev.png";
		cardPicPath = cardPicPath + name + "/" + idNormal + "_ev.png";
	}else{
		path = scrapePath + name +  "/" + idNormal + ".png";
		cardPicPath = cardPicPath + name +  "/" + idNormal + ".png";
	}

	

	$.ajax({
	    url:path,
	    type:'HEAD',
	    error: function()
	    {

	        //file not exists
	        alert('Idolized / Non-idolized version of card not found. Trying filling out the alternate option bubble.');
			commandSelect(0);
			return;
	    },
	    success: function()
	    {

	    	var id = document.getElementById("card_id").value;
    		var name = searchNameById(id);
	        
	        globalIndex = searchIndexById(idNormal, idolized);

	        // taking into consideration of charBackground settings
    		if(charBackground && id_log[globalIndex][4] == 'sub'){
    			// If character backgrounds are on

    			var id = id_log[globalIndex][1];
				var name = id_log[globalIndex][2];
				var evolved = id_log[globalIndex][3];

				var backpath = ''
				if(evolved == 'no'){
					id = (parseInt(id)-1).toString();
					backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_pev.png";
				} else {
					id = (parseInt(id)+1).toString();
					backpath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/" + name + "/"+ id +"_p.png";
				}

    			document.getElementById("homeScreen").src=backpath;
				document.getElementById("idol_img").src='';

    		} else {
    			// if they are off or there is no character background (default card)
    			var backpath = 'images/background/background' + background.toString() + '.png';
    			document.getElementById("idol_img").src=path;
				document.getElementById("cardPicImg").src = cardPicPath;
				document.getElementById("homeScreen").src=backpath;

    		}

    		var id = document.getElementById("card_id").value;
    		var name = searchNameById(id);


			if(name.split('_').length < 2)
			{
				nameAssign(name);
			} else {
				nameAssign(name.split('_')[1]);
			}

		

			if (globalAudio!=null){
				globalAudio.pause();
			}

			var index = parseInt(searchIndexById(id, idolized));
			storeCookie(index);

			setTimeout(function() {
				commandSelect(0);
			}, 500, true)
			  }
		});

		

}

function searchIndexByNameDefWaifu(name){
	var i;

	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][2] == name.toString() && id_log[i][4] == 'main' && id_log[i][3] == 'no')
		{
			return i;

		}
	}
	return 'none';
}



function changeWaifu(name){

	var path = "https://imcg-waifu-sim.github.io/imcg-waifu-def-girl-images/scraped-images/audio/" + name + "/0.png";

	document.getElementById("idol_img").src=path;

	var backpath = 'images/background/background' + background.toString() + '.png';
	document.getElementById("homeScreen").src=backpath;


	var indexFun = searchIndexByNameDefWaifu(name);


	globalIndex = indexFun;

	if(name.split('_').length < 2)
	{
		nameAssign(name);
	} else {
		nameAssign(name.split('_')[1]);
	}

	document.getElementById("card_id").value = id_log[indexFun][1];

	if (globalAudio!=null){
			globalAudio.pause();
	}


	setTimeout(function() {
    	commandSelect(0);
	}, 500, true)

	storeCookie(indexFun);

}

	function commandSelect(mode)
	{
		// mode == 0 is home button
		// mode == 1 is waifu button
		// mode == 2 is story button
		// mode == 3 is member button
		// mode == 4 is waifu / home for other characters

		// Forces everthing to go to one mode
		mode = 0;

		if (globalAudio!=null){
			globalAudio.pause();
		}

		var audioPath = "https://raw.githubusercontent.com/imcg-waifu-sim/imcg-waifu-quotes/master/audio/";


		var charId = id_log[globalIndex][0];
		var cardId = id_log[globalIndex][1];
		var waifuFullName = id_log[globalIndex][2];
		var evolved = id_log[globalIndex][3];

		var quotePath = audioPath + waifuFullName + "/" +charId + "/" + cardId + "/home/audio/"

		var waifuName = globalWaifu + "/";
		var file;

		if(isOthers(globalWaifu))
		{
			mode = 4;
		}
		
		var n = 0;

		if(mode == 0){
			// Home button RNG

			var maxNum = 11;
			n = Math.floor(Math.random() * maxNum);
			
		} else if (mode == 1){
			// Waifu button RNG
			var maxNum = 11;
			n = Math.floor(Math.random() * maxNum);
			
			file = "waifu/";
		} else if (mode == 2){
			// Story button RNG
			var maxNum = 1;
			n = Math.floor(Math.random() * maxNum);
			file = "story/";
		} else if (mode == 3){
			// Member button RNG
			var maxNum = 1;
			n = Math.floor(Math.random() * maxNum);
			file = "member/";
		} else if (mode == 4){

			var maxNum = 5; 
			n = Math.floor(Math.random() * maxNum);
			file = "home/";
			waifuName = "z-others/"

			var pathString = "".concat(audioPath, waifuName, file);

			changeSpeechText(pathString, n);
			//refreshBubble();

			return;
		}


		

		var superString = "".concat(quotePath, n, ".mp3");



		globalAudio = new Audio(superString);
		globalAudio.volume = voiceVolume;
		globalAudio.play();
	

		var textPath = "https://raw.githubusercontent.com/imcg-waifu-sim/imcg-waifu-quotes/master/audio/";
		var pathString = textPath + waifuFullName + "/" +charId + "/" + cardId + "/home/"


		changeSpeechText(pathString, n);
		//refreshBubble();

	}

	function saveWaifu(but_id)
	{
	
		storeSaveWaifuCookie(globalIndex, but_id);
	
	    if(but_id == 'waifu_save_but_1'){



			var i = globalIndex;



			document.getElementById("waifu_load_but_1").disabled = false;
	        $('waifu_load_but_1').prop('disabled', false); 


			var id = parseInt(id_log[i][1]);
			var name = id_log[i][2];
			var idolized = id_log[i][3];


			var html_id = "ID: " + parseInt(id);
		    var html_name = "Name: " + name;
		    var html_idol = "Idolized: " + capitalizeFirstLetter(id_log[i][3]);


		    if(name.split('_').length < 2)
			{
				html_name = name;
			} else {
				var firstName = capitalizeFirstLetter(name.split('_')[1]);
				var lastName = capitalizeFirstLetter(name.split('_')[0])
				html_name = 'Name: ' + lastName + ' ' + firstName;
			}

		    

		    document.getElementById("id-saved-1").innerHTML = html_id;
		    document.getElementById("name-saved-1").innerHTML = html_name;
		    document.getElementById("idolized-saved-1").innerHTML = html_idol;
		} else if(but_id == 'waifu_save_but_2'){


			var i = globalIndex;



			document.getElementById("waifu_load_but_2").disabled = false;
	        $('waifu_load_but_2').prop('disabled', false); 


			var id = parseInt(id_log[i][1]);
			var name = id_log[i][2];
			var idolized = id_log[i][3];


			var html_id = "ID: " + parseInt(id);
		    var html_name = "Name: " + name;
		    var html_idol = "Idolized: " + capitalizeFirstLetter(id_log[i][3]);


		    if(name.split('_').length < 2)
			{
				html_name = name;
			} else {
				var firstName = capitalizeFirstLetter(name.split('_')[1]);
				var lastName = capitalizeFirstLetter(name.split('_')[0])
				html_name = 'Name: ' + lastName + ' ' + firstName;
			}


		    document.getElementById("id-saved-2").innerHTML = html_id;
		    document.getElementById("name-saved-2").innerHTML = html_name;
		    document.getElementById("idolized-saved-2").innerHTML = html_idol;

		} else if(but_id == 'waifu_save_but_3'){

			
			var i = globalIndex;



			document.getElementById("waifu_load_but_3").disabled = false;
	        $('waifu_load_but_3').prop('disabled', false); 


			var id = parseInt(id_log[i][1]);
			var name = id_log[i][2];
			var idolized = id_log[i][3];

			var html_id = "ID: " + parseInt(id);
		    var html_name = "Name: " + name;
		    var html_idol = "Idolized: " + capitalizeFirstLetter(id_log[i][3]);


		    if(name.split('_').length < 2)
			{
				html_name = name;
			} else {
				var firstName = capitalizeFirstLetter(name.split('_')[1]);
				var lastName = capitalizeFirstLetter(name.split('_')[0])
				html_name = 'Name: ' + lastName + ' ' + firstName;
			}

		    document.getElementById("id-saved-3").innerHTML = html_id;
		    document.getElementById("name-saved-3").innerHTML = html_name;
		    document.getElementById("idolized-saved-3").innerHTML = html_idol;

		} 
	}

	function homeClick() {
    	var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 0;
		commandSelect(mode);


	}


	function waifuClick()
	{
		
		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 1;
		commandSelect(mode);
		
	}

	function storyClick()
	{

		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 2;
		commandSelect(mode);
	}

	function memberClick()
	{
		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 3;
		commandSelect(mode);
	}

	function hoverInBut(clicked_id)
	{
		if(clicked_id == 'home_but'){
			document.getElementById("home_but").src="images/buttons/home-button-hover.png";
		} else if(clicked_id == 'story_but'){
			document.getElementById("story_but").src="images/buttons/story-button-hover.png";
		} else if(clicked_id == 'member_but'){
			document.getElementById("member_but").src="images/buttons/member-button-hover.png";
		} else if(clicked_id == 'settings_but'){
			document.getElementById("settings_but").src="images/buttons/settings-button-hover.png";
		} else if(clicked_id == 'camera_but'){
			document.getElementById("camera_but").src="images/buttons/camera-button-hover.png";
		} else if(clicked_id == 'liveshow_but'){
			document.getElementById("liveshow_but").src="images/buttons/liveshow-button-hover.png";
		} else if(clicked_id == 'eng_but'){
			document.getElementById("eng_but").src="images/buttons/english-icon-hover.png";
		} else if(clicked_id == 'jap_but'){
			document.getElementById("jap_but").src="images/buttons/japanese-icon-hover.png";
		} 


		
	}

	function hoverOutBut(clicked_id)
	{
		if(clicked_id == 'home_but'){
			document.getElementById("home_but").src="images/buttons/home-button.png";
		} else if(clicked_id == 'story_but'){
			document.getElementById("story_but").src="images/buttons/story-button.png";
		} else if(clicked_id == 'member_but'){
			document.getElementById("member_but").src="images/buttons/member-button.png";
		} else if(clicked_id == 'settings_but'){
			document.getElementById("settings_but").src="images/buttons/settings-button.png";
		} else if(clicked_id == 'camera_but'){
			document.getElementById("camera_but").src="images/buttons/camera-button.png";
		} else if(clicked_id == 'liveshow_but'){
			document.getElementById("liveshow_but").src="images/buttons/liveshow-button.png";


		} else if(clicked_id == 'hanayo_but'){
			document.getElementById("hanayo_but").src="images/chibi-waifu/hanayo.png";
		} else if(clicked_id == 'rin_but'){
			document.getElementById("rin_but").src="images/chibi-waifu/rin.png";
		} else if(clicked_id == 'maki_but'){
			document.getElementById("maki_but").src="images/chibi-waifu/maki.png";
		} else if(clicked_id == 'honoka_but'){
			document.getElementById("honoka_but").src="images/chibi-waifu/honoka.png";
		} else if(clicked_id == 'umi_but'){
			document.getElementById("umi_but").src="images/chibi-waifu/umi.png";
		} else if(clicked_id == 'kotori_but'){
			document.getElementById("kotori_but").src="images/chibi-waifu/kotori.png";	
		} else if(clicked_id == 'nozomi_but'){
			document.getElementById("nozomi_but").src="images/chibi-waifu/nozomi.png";
		} else if(clicked_id == 'eli_but'){
			document.getElementById("eli_but").src="images/chibi-waifu/eli.png";
		} else if(clicked_id == 'nico_but'){
			document.getElementById("nico_but").src="images/chibi-waifu/nico.png";
		
		} else if(clicked_id == 'ruby_but'){
			document.getElementById("ruby_but").src="images/chibi-waifu/ruby.png";
		} else if(clicked_id == 'hanamaru_but'){
			document.getElementById("hanamaru_but").src="images/chibi-waifu/hanamaru.png";
		} else if(clicked_id == 'yoshiko_but'){
			document.getElementById("yoshiko_but").src="images/chibi-waifu/yoshiko.png";
		} else if(clicked_id == 'chika_but'){
			document.getElementById("chika_but").src="images/chibi-waifu/chika.png";
		} else if(clicked_id == 'you_but'){
			document.getElementById("you_but").src="images/chibi-waifu/you.png";
		} else if(clicked_id == 'riko_but'){
			document.getElementById("riko_but").src="images/chibi-waifu/riko.png";	
		} else if(clicked_id == 'kanan_but'){
			document.getElementById("kanan_but").src="images/chibi-waifu/kanan.png";
		} else if(clicked_id == 'mari_but'){
			document.getElementById("mari_but").src="images/chibi-waifu/mari.png";
		} else if(clicked_id == 'dia_but'){
			document.getElementById("dia_but").src="images/chibi-waifu/dia.png";



		} else if(clicked_id == 'eng_but'){
			// If we hover out of the English button
			if(language == 'english'){
				document.getElementById("eng_but").src="images/buttons/english-icon-hover.png";
			} else {
				// The language is Japanese at the time we hovered out
				document.getElementById("eng_but").src="images/buttons/english-icon.png";
			}

		} else if(clicked_id == 'jap_but'){
			// If we hover out of the Japanese button
			if(language == 'japanese'){
				document.getElementById("jap_but").src="images/buttons/japanese-icon-hover.png";
			} else {
				document.getElementById("jap_but").src="images/buttons/japanese-icon.png";
			}

			
		} 
	}



	function changeSpeechText (path, n) {
		var pathString;
		if(language == 'english'){
			pathString = "".concat(path, "quote.txt");
		} else if(language == 'japanese'){
			pathString = "".concat(path, "quote.txt");
		} else {
			alert('Something went wrong');
		}
		//alert(pathString);

		var client;
        if (window.XMLHttpRequest) {
		    // code for modern browsers
		    client = new XMLHttpRequest();
		} else {
		    // code for IE6, IE5
		    client = new ActiveXObject("Microsoft.XMLHTTP");
		}

        client.onreadystatechange = function()
        {
            if( client.responseText != '' )
            {
                var txt = client.responseText.split("\n");
                document.getElementById("speech-text").innerHTML = txt[n];
            }
        }
        client.open("GET", pathString, true);
        client.send();
    }

	function cameraClick()
	{
		var camera_path = 'audio/camera-shutter.mp3'
		var camera_audio = new Audio(camera_path);
		camera_audio.play();

		var backgroundpath = 'images/background/background' + background.toString() + '.png';

		printPhotoCanvas(backgroundpath);

	}


function countDown(n) {
    var seconds = n;
    var mins = 0;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 

        var current_minutes = mins-1
        seconds--;

        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            } else {
            	timerRanOut = true;
            	return;
            }
        }
    }
    if(away){
    	tick();
    }else {
    	return;
    }
    
}





// If we leave tab
$(window).blur(function() { 
	away = true;

	timerRanOut = false;
	countDown(20);



	clearTimeout(timeout);
	timeout = setTimeout(outsideSpeak, countdown);

});


// If we reenter tab
$(window).focus(function() { 
	if(away){
		away = false;
		
		if(timerRanOut){

		    //var neg = forgetWaifuRNG(7);
		    neg = -1;

			if(neg == -1){
				// If forget waifu speech was not successful
				commandSelect(0);			    	
		
			}

		}

	}
});


function changeLanguage(lang_num)
{
	var prev_lang = language;

	if(lang_num == 0)
	{
		// English
		language = 'english';
		document.getElementById('language-tag').innerHTML = 'Current: English';

		if(prev_lang == 'english')
		{
			return;
		}

		document.getElementById("jap_but").src="images/buttons/japanese-icon.png";

	} else if (lang_num == 1){
		language = 'japanese';
		document.getElementById('language-tag').innerHTML = 'Current: Japanese';
		if(prev_lang == 'japanese')
		{
			return;
		}

		document.getElementById("eng_but").src="images/buttons/english-icon.png";
	}
	commandSelect(0);
}


