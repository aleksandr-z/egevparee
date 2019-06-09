$(document).ready(function(){
    $("#tabspricesbtns").on('click', 'li a', function(e){
        e.preventDefault();
        var tabId = $(this).attr('href');
        $("#tabspricesbtns li a").removeClass("active");
        $('#tabspricesbtns .dropdown-toggle').html(this.innerText+' <span class="caret" style="display: inline-block;"></span>');
        $(this).addClass("active");
        $('#tabsprices > div').hide(0);
        $(tabId).show();
    });
})