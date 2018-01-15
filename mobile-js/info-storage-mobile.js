var voiceVolume = 0.4;
var musicVolume = 0.2;
var background = 0;
var globalIndex = 0;
var backgroundMusic = 1;
var cookieExpireDate = 100*365;

var othersArray = ['shiitake','alpaca'];

function isOthers(waifu)
{
    for (var i=0; i < othersArray.length; i++) {
        if(waifu == othersArray[i])
        {
            return true;
        }
    }
    return false;

}


// Setting and getting the cookies

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}

// Check cookies

function checkCookie() {
    var index=getCookie("waifu-index");
    
    globalIndex = index;
    if (index != null && index != "" && !isNaN(index)) {
        mainWaifuSet(index);
    } else{
        document.getElementById("idol_img").src= 'https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/shimamura_uzuki/100001.png';
        document.getElementById("card_id").value = 100001;
        globalIndex = 9; // Default Uzuki
    }
}

function checkBGMCookie() {
    var index=getCookie("background-music");
    if (index != null && index != "") {
        if(index == '0')
        {
            document.getElementById("bgmusicselect").value = "0";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/background-music.mp3';
            backgroundMusic = 0;
        } else if (index == '1'){
            document.getElementById("bgmusicselect").value = "1";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/studio-music-0.mp3';
            backgroundMusic = 1;
        } else if (index == '2'){
            document.getElementById("bgmusicselect").value = "2";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/studio-music-1.mp3';
            backgroundMusic = 2;
        } else if (index == '3'){
            document.getElementById("bgmusicselect").value = "3";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/studio-music-2.mp3';
            backgroundMusic = 3;
        } else {
            document.getElementById("bgmusicselect").value = "0";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/background-music.mp3';
            backgroundMusic = 0;
        }
    } 
}

function checkEnTransCookie(){
    var index = getCookie("en-trans");

    if (index != null && index != "") {
        if(index == 'on'){
            $("#translation-bubble").fadeIn();
        } else {
            $("#translation-bubble").hide();
        }
        
    } else{
        // Cookie is null
        $("#translation-bubble").fadeIn();
        
    }
}

function checkCharBackgroundCookie(){
    var index = getCookie("charBackground");

    if (index != null && index != "") {
        if(index == 'on'){
            charBackgroundToggleOn();
        } else {
            charBackgroundToggleOff();
        }
        
    } else{
        // Cookie is null
        charBackgroundToggleOn();
        
    }
}

function checkBackgroundCookie() {
    var index=getCookie("background-index");
    if (index != null && index != "") {
        mainBackgroundSet(index);
    } else{
        document.getElementById("homeScreen").src= 'images/background/background0.png';
    }
}


function checkVolumeCookie() {
    var voice=getCookie("volumeVoice-value");
    var background=getCookie("volumeBack-value");

    if (voice != null && voice != "") {
        volumeVoiceSet(voice);
    } 

    if (background != null && background != "") {
        volumeBackSet(background);
    }
}

function checkWaifuLoadCookie(but_id) {
    var index=getCookie("saved-waifu-index-1");
    var index2=getCookie("saved-waifu-index-2");
    var index3=getCookie("saved-waifu-index-3");

    globalIndex = 0;

    if (index != null && index != "" && !isNaN(index)) {

        if(but_id == 'waifu_load_but_1'){
            globalIndex = index;
            savedWaifuLoad(index);
        }
        
        
    } 

    if (index2 != null && index2 != "" && !isNaN(index)) {

        if(but_id == 'waifu_load_but_2'){
            globalIndex = index2;
            savedWaifuLoad(index2);
        }
        
        
    } 

    if (index3 != null && index3 != "" && !isNaN(index)) {

        if(but_id == 'waifu_load_but_3'){
            globalIndex = index3;
            savedWaifuLoad(index3);
        }
            
    } 
    
}








// Store cookies

function storeCookie(index)
{

    setCookie("waifu-index", index, true);
}

function storeBGMusicCookie(index)
{
    setCookie("background-music", index, cookieExpireDate);
}

function storeEnTransOn(index)
{
    setCookie("en-trans", index, cookieExpireDate);
}

function storeSaveWaifuCookie(index, but_id)
{   

    if(but_id == 'waifu_save_but_1'){
       setCookie("saved-waifu-index-1", index, cookieExpireDate); 
   } else if(but_id == 'waifu_save_but_2'){
       setCookie("saved-waifu-index-2", index, cookieExpireDate); 
   } if(but_id == 'waifu_save_but_3'){
       setCookie("saved-waifu-index-3", index, cookieExpireDate); 
   } 
    
}


function storeCharBackground(index)
{
    setCookie("charBackground", index, cookieExpireDate);
}

function storeBackgroundCookie(index)
{
    setCookie("background-index", index, cookieExpireDate);
}

function storeVolumeMusicCookie(volume)
{
    setCookie("volumeBack-value", volume, cookieExpireDate);
}

function storeVolumeVoiceCookie(volume)
{
    setCookie("volumeVoice-value", volume, cookieExpireDate);
}





// Functions that uses the cookies to load the values

function mainWaifuSet(index)
{

    var id = parseInt(id_log[index][1]);
    var name = id_log[index][2];
    var idolized = id_log[index][3];

    // Once we get the info, get the image
    var path;

    var scrapePath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/";
    //var cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/audio/"

    if(isOthers(name)){
        scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/z-others/"
        cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/z-others/"
    } 

    
    // If talking about Muse & Aqours
    if(idolized == 'yes')
    {
        path = scrapePath + name + "/" + id + "_ev.png";
        //cardPicPath = cardPicPath + name + "/" + id + "_ev.png";
        $('#select-idol').val('yes').selectmenu('refresh');
    }else{
        id = (parseInt(id)-1).toString();
        path = scrapePath + name +  "/" + id + ".png";
        //cardPicPath = cardPicPath + name +  "/" + id + ".png";
        $('#select-idol').val('no').selectmenu('refresh');
    }
    

        


    //file exists
    document.getElementById("idol_img").src=path;
    //document.getElementById("cardPicImg").src = cardPicPath;

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

    
}


function mainBackgroundSet(index){
    background = parseInt(index);
    var backpath = 'images/background/background' + index.toString() + '.png';
    document.getElementById("homeScreen").src=backpath;
}

function volumeVoiceSet(volume_value)
{
    volume_ex_value = volume_value*100;
    voiceVolume = volume_value;

    var input = document.getElementById("volumeSliderVoice");
    input.value = volume_ex_value;
}

function volumeBackSet(volume_value)
{
    volume_ex_value = volume_value*100;
    musicVolume = volume_value;

    var input = document.getElementById("volumeSliderMusic");
    input.value = volume_ex_value;
    
}


function savedWaifuLoad(index)
{



    var id = parseInt(id_log[index][1]);
    var name = id_log[index][2];
    var idolized = id_log[index][3];



    // Once we get the info, get the image
    var path;

    var scrapePath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/";
    //var scrapePath = "../distribution/imcg-waifu-girl-images/scraped-images/audio/";
    //var cardPicPath = "https://imcg-waifu-sim.github.io/imcg-waifu-girl-images/scraped-images/audio/"



    var idNormal = convertToNormalForm(id, idolized);
    //alert(idNormal);

    // If talking about Muse & Aqours
    if(idolized == 'yes')
    {
        path = scrapePath + name + "/" + idNormal + "_ev.png";
        //cardPicPath = cardPicPath + name + "/" + idNormal + "_ev.png";
        document.querySelector("input[value='yes']").checked = true;
    }else{
        path = scrapePath + name +  "/" + idNormal + ".png";
        //cardPicPath = cardPicPath + name +  "/" + idNormal + ".png";
        document.querySelector("input[value='no']").checked = true;
    }


    //file exists
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
        document.getElementById("idol_img").src='./images/blank.png';
    } else {
        // if they are off or there is no character background (default card)
        
        var backpath = 'images/background/background' + background.toString() + '.png';
        document.getElementById("idol_img").src=path;
        //document.getElementById("cardPicImg").src = cardPicPath;
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


}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

