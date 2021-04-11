//var filePrompt = prompt("Enter file path");

$('#sendFolder').click(function (e) { 
    e.preventDefault();

    folder($('#folder').val());
});

function folder(filePrompt){
    $('#chooseFolder').attr('id', 'tree');
    var actualFolder = filePrompt.substr(filePrompt.lastIndexOf("/") + 1);
    $.ajax({
        type: "GET",
        url: "readFolder.php",
        data: {
            filePrompt: filePrompt,
        },
        success: function (data) {


            // display all folders

            $('div').html("<tr><td id='actualFolder' class='folder'>&larr; "+ actualFolder +"</td><th id='name'>Nom</th><th id='date'>Date de modification</th><th id='size'>Taille</th></tr>" + data);
            for (let i = 0; i < $('.folder').length; i++) {

                $('.folder').eq(i).on('click', function(){

                    if ($('.folder').eq(i).attr('id') == 'actualFolder') {
                        folder(filePrompt.substr(0, filePrompt.lastIndexOf("/")));
                    } 
                });
            }


            // display all files

            for (let i = 0; i < $('.name').length; i++) {
                
                $('.name').eq(i).hover(function () {
                    $("#" + $('.name').eq(i).attr('id')).css('text-decoration-line', 'underline').css('cursor', 'pointer')
                    
                }, function () {
                    $("#" + $('.name').eq(i).attr('id')).css('text-decoration-line', 'none');
                });

                $('.name').eq(i).on('click', function () {
                    if ($('.name').eq(i).attr('class') == 'folder name') {
                        folder(filePrompt + "/" + $(".name").eq(i).attr('id'));
                    } else {
                        var file = $(".name").eq(i).attr('id');
                        file = file.replace("_", ".");
                        readFile(filePrompt + "/" + file);
                    }
                });
                
            }

            // Tri by element clicked
            for (let i = 0; i < $('th').length; i++) {
                var alreadySort = false;

                $('th').eq(i).on('click', function () {
                    var id = $('th').eq(i).attr('id');

                    var list = [];

                    for (let i = 0; i < $('.name').length; i++) {

                        list.push([
                            $('.icon').eq(i).html() ,
                            $('.name').eq(i).html(), 
                            $('.date').eq(i).html(), 
                            $('.size').eq(i).html(), 
                            $('.size').eq(i).attr('size'),
                            $('.name').eq(i).attr('id'),
                            $('.name').eq(i).attr('class')
                        ])

                    }

                    switch (id) {
                        case 'name':
                            console.log(alreadySort)
                            
                            if (alreadySort == false) {
                                list = list.sort(function(a, b){
                                    if(a[1] < b[1]) return -1;
                                    if(a[1] > b[1]) return 1;
                                    return 0;
                                })
                                alreadySort = true;
                            } else {
                                list = list.sort(function(a, b){
                                    if(a[1] < b[1]) return 1;
                                    if(a[1] > b[1]) return -1;
                                    return 0;
                                })
                                alreadySort = false;
                            }

                            for (let i = 0; i < list.length; i++) {
                                $('.icon').eq(i).html(list[i][0]);
                                $('.name').eq(i).html(list[i][1]).attr('id', list[i][5]).attr('class', list[i][6]);
                                $('.date').eq(i).html(list[i][2]);
                                $('.size').eq(i).html(list[i][3]).attr('size', list[i][4]); 
                            }
                            break;

                        case 'date':
                            if (alreadySort == false) {
                                list = list.sort(function(a, b){
                                    var dt1 = Date.parse(a[2]);
                                    var dt2 = Date.parse(b[2]);
    
                                    if (dt1 < dt2) return -1;
                                    if (dt1 > dt2) return 1;
                                    return 0;
                                });
                                alreadySort = true;
                            } else {
                                list = list.sort(function(a, b){
                                    var dt1 = Date.parse(a[2]);
                                    var dt2 = Date.parse(b[2]);
    
                                    if (dt1 < dt2) return 1;
                                    if (dt1 > dt2) return -1;
                                    return 0;
                                })
                                alreadySort = false
                            }

                            for (let i = 0; i < list.length; i++) {
                                $('.icon').eq(i).html(list[i][0]);
                                $('.name').eq(i).html(list[i][1]).attr('id', list[i][5]).attr('class', list[i][6]);
                                $('.date').eq(i).html(list[i][2]);
                                $('.size').eq(i).html(list[i][3]).attr('size', list[i][4]); 
                            }
                            break;

                        case 'size':

                            if (alreadySort == false) {
                                list = list.sort(function(a, b){
                                    return a[4] - b[4];
                                })
                                alreadySort = true;
                            } else {
                                list = list.sort(function(a, b){
                                    return b[4] - a[4];
                                })
                                alreadySort = false;
                            }

                            for (let i = 0; i < list.length; i++) {
                                $('.icon').eq(i).html(list[i][0]);
                                $('.name').eq(i).html(list[i][1]).attr('id', list[i][5]).attr('class', list[i][6]);
                                $('.date').eq(i).html(list[i][2]);
                                $('.size').eq(i).html(list[i][3]).attr('size', list[i][4]); 
                            }
                            break;
                    
                        default:
                            alert(4)
                            break;
                    }
                });
            }

            // Change color of icons
            for (let i = 0; i < $('i').length; i++) {
                $('i').eq(i).on('click', function () {
                        $('#colorPicker').html("<select id='colorSelect'><option id='red'>Rouge</option>"+
                        "<option id='blue'>Bleu</option>"+
                        "<option id='yellow'>Jaune</option>"+
                        "<option id='green'>Vert</option>"+
                        "<option id='orange'>Orange</option>"+
                        "<option id='purple'>Violet</option>"+
                        "<option id='black'>Noir</option>"+
                        "</select>");
                        $('#colorPicker').attr('title', "Color Picker");
                        $('#colorPicker').dialog({
                            buttons: [
                                {
                                    text: "Choisir",
                                    icon: 'ui-icon-check',
                                    click: function(){
                                        var color = $('#colorSelect').children(':selected').attr('id');
                                        $('i').eq(i).css('color', color);
                                        $('#colorSelect').css("display", "none");
                                        $(this).dialog("destroy");
                                    }
                                }
                            ],
                        });
                });
                
            }
        }
    });
}

// Read file clicked and show content in popup
function readFile(file)
{
    $.ajax({
        type: "GET",
        url: "readFile.php",
        data: {
            file: file
        },
        success: function (data) {
            $('#dialog').html(data);
            file = file.substr(file.lastIndexOf("/") + 1);
            $('#dialog').attr('title', file);
            $('#dialog').dialog();
        }
    });
}
