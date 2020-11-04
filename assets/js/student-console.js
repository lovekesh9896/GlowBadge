// ///////////////////// slice the dates //////////////////////////////
var dateCreated = $(".date-created");
for (let i = 0; i < dateCreated.length; i++) {
    $(dateCreated[i]).text($(dateCreated[i]).text().slice(0, 15));
}

// //////////////////// pop up for cirtificates and security /////////////////////////////

$('#backdrop').on('click', function(e){
    if(e.target === this){
        $('#backdrop').fadeOut();
    }
});

$('.grid-item').on('click', function(e){
    let img = $(this).children('img').attr('src');
    let name = $(this).children('p').text();
    let clientName = $(this).find('.client-name').text();
    let dateCreated = $(this).find('.date-created').text();
    let badgeId = $(this).find('.badge-id').text();
    $('#pop-up-img').attr('src', img);
    $('#pop-up-name').text(name);
    $('#pop-up-date').text(dateCreated);
    $('#pop-up-client').text(clientName);
    $('#backdrop').fadeIn();
    $('#backdrop').css('display', 'flex');
    let id = $('#student-id').text();
    let string = `https://chart.googleapis.com/chart?cht=qr&chl=localhost:8000/verify-badge/${id}${badgeId}&chs=180x180&chld=L|0`;
    $('#qr-code').attr('src', string);
});

// /////////////////// cirtificate //////////////////////////
$('#download-cirtificate').on('click', function(e){
    let div = $(e.target).parent().parent().parent().find('img');
    $(this).css('background-color', 'green');
    $(this).html(' Generating...');
    $.ajax({
        url : '/api/get-cirtificate',
        type : 'post',
        data : {
            badgeUrl : $(div[0]).attr('src'),
            badgeQr : $(div[1]).attr('src')
        },
        success : function(res){
            $('#download-cirtificate').css('background-color', 'navy');
            $('#download-cirtificate').html('Download');
            var win = window.open(res.data.url, '_blank');
            if (win) {
                win.focus();
            } else {
                alert('Please allow popups for this website');
            }
        },
        error : function(err){
            new Noty({
                text: 'Error in generating Cirtificate!',
                type: 'error', 
                theme: "relax", 
                timeout: "1500"
            }).show();
            console.log(err);
        }
    })
});


