let switchButtons = document.getElementsByClassName('switch-button');
for(let i=0;i<switchButtons.length;i++){
    $(switchButtons[i]).on('click', function(e){
        if(i==0){
            if($(switchButtons[i]).hasClass('active-switch')){
                console.log("already has the class");
            }else{
                $(switchButtons[i]).addClass('active-switch');
                $(switchButtons[1]).removeClass('active-switch');
                $('#subscribed').css('display','block');
                $('#all-timelines').css('display','none');
            }
        }else{
            if($(switchButtons[i]).hasClass('active-switch')){
                console.log("already has the class");
            }else{
                $(switchButtons[i]).addClass('active-switch');
                $(switchButtons[0]).removeClass('active-switch');
                $('#subscribed').css('display','none');
                $('#all-timelines').css('display','block');
            }
        }
    })
}



// //////////////////subscribe api call /////////////////////////////
$('.subscribe-button').on('click', function(e){
    let timelineId = $(e.target).children('span').text();
    let studentId = $('#student-id').text();
    $.ajax({
        url : '/api/subscribe-timeline',
        type : 'POST',
        data : {
            timelineId : timelineId,
            studentId : studentId
        },
        success : function(data){
            $(e.target).text('Subscribed');
            $(e.target).css('backgroundColor','green');
            $(e.target).attr('disabled','true');
        },
        erorr : function(err){
            console.log(err);
        }
    })
});


// //////////////// disable subscribe in show all cards //////////////////////////////////
let subscribed = document.getElementsByClassName('timeline-name');
let newArray = new Array();
for(let i=0;i<subscribed.length;i++){
    let text = $(subscribed[i]).text().trim();
    newArray.push(text);
}

let allTimeline = document.getElementsByClassName('all-timeline-name');
for(let j=0;j<allTimeline.length;j++){
    let timelineName = $(allTimeline[j]).text().trim();
    for(let i=0;i<newArray.length;i++){
        if(newArray[i] == timelineName){
            let button = $(allTimeline[j]).parent().parent().children('button');
            $(button).text('Subscribed');
            $(button).css('backgroundColor','green');
            $(button).attr('disabled','true');
        }
    }
}

// //////////////////////// show badges colured and B/W ////////////////////////////
let badgesNames = $('#badges span');
let tfNcBadges = $('.tf-nc img');
for(let i=0;i<badgesNames.length;i++){
    let badgeName = $(badgesNames[i]).text().trim();
    for(let j=0;j<tfNcBadges.length;j++){
        if($(tfNcBadges[j]).attr('alt') == badgeName){
            $(tfNcBadges[j]).css('filter', 'grayscale(0)');
        }
    }
}

let timelines = $('.tf-tree');
for(let i=0;i<timelines.length;i++){
    let images = $(timelines[i]).find('img');
    let badges = 0;
    for(let j=0;j<images.length;j++){
        if($(images[j]).css('filter') == 'grayscale(0)'){
            badges++;
        }
    }
    // change badge numbers
    let badgeString = `${badges}/${images.length} Badges`;
    let toBadgeNumbersToChange = $(timelines[i]).parent().parent().find('.badge-number');
    $(toBadgeNumbersToChange).text(badgeString);
    // change badge percentage
    let badgePernectageToChange = $(timelines[i]).parent().parent().find('.progress');
    let percentage = ((badges/images.length)*100).toFixed(2);
    $(badgePernectageToChange).css('width',percentage+'%');
    // change percentage numbers
    let badgePernectageNubersToChange = $(timelines[i]).parent().parent().find('.percentage-number');
    $(badgePernectageNubersToChange).text(percentage + '%');
}


// //////////////// toogle for timeline view /////////////////////////////
$('.timeline-drop-down span').on('click', function(e){
    let timeline = $(e.target).parent().parent().parent();
    let subscribed  = $(timeline).children('.subscribed-timeline');
    subscribed.slideToggle();
    if($(subscribed).css('display') != 'none'){
        $(subscribed).css('display','flex');
    }
})

///////////////strip timleins dates /////////////////////////////

let dates = $('.start-date');
for(let i=0;i<dates.length;i++){
    $(dates[i]).text($(dates[i]).text().trim().substring(4,15));
}