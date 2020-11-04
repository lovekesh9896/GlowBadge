// /////////////// Create the bar graph
const makeTheBadgeGraph = function(data){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [{
                label: 'Badges in Month',
                data: data,
                backgroundColor: 'rgba(12, 105, 253, 0.2)',
                borderColor: 'rgba(12,105,253, 1)',
                borderWidth: 1
            }]
        },
    });
}
// ///////////// Get the badge statics for Donought graph
$.ajax({
    type : 'GET',
    url : '/api/badge-statics',
    success : function(res){
        console.log(res);
        makeTheBadgeGraph(res.statics);
    },
    error : function(err){
        console.log(err);
        new Noty({
          text: 'Error in Loading Badge Distribution Graph',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
    }
});
// /////////// Create the timeline bar graoh
const makeTheTimelineGraph = function(data){
    let name = [];
    let number = [];
    data.map((item) => {
        name.push(item.name);
        number.push(item.timesUsed);
    });
    var ctx = document.getElementById('myTimelineChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: name,
            datasets: [{
                data: number,
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
            }]
        }
    });
}
// /////////// Grt the timeline statics for Donought graph
$.ajax({
    type : 'Get',
    url : '/api/timeline-statics',
    success : function(res){
        console.log(res);
        makeTheTimelineGraph(res.statics);
    },
    error : function(err) {
        console.log(err);
        new Noty({
          text: 'Error in creating Timeline Graph',
          type: 'error', 
          theme: "relax", 
          timeout: "1500"
      }).show();
    }
})

// //////////////////// adding color to first 3 badges ///////////////////////
let badges = $('.top-badge');
for(let i=0;i<badges.length;i++){
    if(i == 0 || i == 5){
        $(badges[i]).css('color','rgb(2,93,255)');
    }
    if(i == 1 || i == 6){
        $(badges[i]).css('color','rgb(11,254,55)');
    }
    if(i == 2 || i == 7){
        $(badges[i]).css('color','rgb(249,111,4)');
    }
}

// /////////////// croping the last badge date ///////////////
let lastOnline = $('.last-online');
for(let i=0;i<lastOnline.length;i++){
    $(lastOnline[i]).text($(lastOnline[i]).text().substring(4,15));
}