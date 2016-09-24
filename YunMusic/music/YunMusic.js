/**
 * Created by shiwanfute on 9/22/022.
 */
var index = 1;
$(function() {
    $(" #play").click(playAndPause);
    $("#next").click(nextSong);
    $("#forward").click(lastSong);

    $(".bg").each(function (ind) {
        var $this = $(this);
        $this.click(function () {
            index = parseInt(ind + 1);
            $("audio").attr("src", "audio/" + index + ".mp3");
            $("audio").attr("autoplay", "autoplay");
            playAndPause();
            headChange();
        })

    });

    $('audio').on('timeupdate', function() {
        t = parseInt(audio.currentTime)
        $(".range").attr({'max': audio.duration});
        $('.max').html(timeToStr(audio.duration));
        if (flag) {
            $(".range").val(t);
        }
        /*console.log($(".range").val());*/
        $('.cur').text(timeToStr(t));
    });


    //结束时自动播放下一曲
    $('audio').on('ended', nextSong);


    //监听滑块，可以拖动
    $('.range').on('mousedown', function() {
        flag = 0;
    });
    $('.range').on('mouseup', function() {
        //console.log($(this).val());
        audio.currentTime = parseInt($(this).val());
        flag = 1;
    });

    /*$(".range").on('change', function () {
        console.log($(this).val());
        flag = 0;
        //audio.currentTime = $(this).val();
    });
*/

    $('.vol').click(function() {
        var $this = $(this);
        if ($('.vol').hasClass('icon-volume-up')) {
            $this.removeClass('icon-volume-up').addClass('icon-volume-off');
            audio.volume = 0;
            $('.volVal').html("0%");
            $('.volshow').css('background', 'linear-gradient(to top, rgba(35, 100, 206, 0.85), #e6dccf 0%, #e6dccf)');
            $('.range2').css('background', 'linear-gradient(to right, rgba(35, 100, 206, 0.85), #e6dccf 0%, #e6dccf)');
            $('.range2').val(0);
        } else{
            $this.removeClass('icon-volume-off').addClass('icon-volume-up');
            audio.volume = 1;
            $('.volVal').html("100%");
            $('.volshow').css('background', 'linear-gradient(to top, rgba(35, 100, 206, 0.85), #e6dccf 100%, #e6dccf)');
            $('.range2').css('background', 'linear-gradient(to right, rgba(35, 100, 206, 0.85), #e6dccf 100%, #e6dccf)');
            $('.range2').val(100);

        }
    });

    $('.volshow').mouseup(function(event) {
        var val = Math.round((120 - event.offsetY) * 100 /120);
        audio.volume = val / 100;
        $('.volVal').html(val + "%");
        $('.volshow').css('background', 'linear-gradient(to top, rgba(35, 100, 206, 0.85), #e6dccf ' + val + '%, #e6dccf)');

    });

    $('.range2').mouseup(function() {
        $('.volVal').html($(this).val() + "%");
        audio.volume = $(this).val() / 100;
        $('.range2').css('background', 'linear-gradient(to right, rgba(35, 100, 206, 0.85), #e6dccf ' + $(this).val() + '%, #e6dccf)');
    })
});



var audio = $("audio")[0];
var t = parseInt(audio.currentTime);
var flag = 1;
init();

function init() {
    $('.cur').text(timeToStr(t));
    $('audio').on('canplaythrough',function(){
        $('.max').html(timeToStr(audio.duration));
    })

}

function nextSong() {
    if (index >= 4) {
        index = 0;
    }
    index++;
    $("audio").attr("src", "audio/" + index + ".mp3");
    $("audio").attr("autoplay", "autoplay");
    playAndPause();
    headChange();
    init();
}

function lastSong() {
    if (index <= 1) {
        index = 5;
    }
    index--;
    $("audio").attr("src", "audio/" + index + ".mp3");
    $("audio").attr("autoplay", "autoplay");
    playAndPause();
    headChange();
    init();
}


//var time1;
function playAndPause() {
    if(audio.paused){
        $("#play").removeClass("icon-play").addClass("icon-pause");
        $("#cd").css("animation-play-state","running");
        $(".hook").removeClass("hookright").addClass("hookleft");
        audio.play();
        /*time1 = setInterval(function () {
            t = parseInt(audio.currentTime)
            $(".range").attr({'max': audio.duration});
            $('.max').html(timeToStr(audio.duration));
            $(".range").val(t);
            $('.cur').text(timeToStr(t));
        }, 1000);*/
    } else {
        audio.pause();
        $("#play").removeClass("icon-pause").addClass("icon-play");
        $("#cd").css("animation-play-state","paused");
        $(".hook").removeClass("hookleft").addClass("hookright");

    }
}
function headChange() {
    if (index == 1) {
        $("#headChange").css("display", "none");
        $("#headChange").html("Style").fadeIn();
        $(".author").css("display", "none");
        $(".author").fadeIn();
    } else if (index == 2) {
        $("#headChange").css("display", "none");
        $("#headChange").html("Blank Space").fadeIn();
        $(".author").css("display", "none");
        $(".author").fadeIn();
    } else if (index == 3) {
        $("#headChange").css("display", "none");
        $("#headChange").html("Wildest Dreams").fadeIn();
        $(".author").css("display", "none");
        $(".author").fadeIn();
    } else if (index == 4) {
        $("#headChange").css("display", "none");
        $("#headChange").html("This Love").fadeIn();
        $(".author").css("display", "none");
        $(".author").fadeIn();
    }
    $(".bg").removeClass("highlight");
    $(".bg").eq(index - 1).addClass("highlight");
}

function timeToStr(time) {
    var m = 0,
        s = 0,
        _m = '00',
        _s = '00';
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    return _m + ":" + _s;
}

