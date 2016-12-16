$(document).ready(function () {
    var animating = false;
    var w = parseInt($('#contents-wrapper').outerWidth());
    var currentTab = $('#about');
    $('.bottombg:eq(0)').css({ left: 0 });
    $('.bottombg:gt(0)').css({ left: w });
    $('#message,#email,#name').focus(function () {
        if ($(this).val() == $(this).attr('title')) {
            $(this).val('');
        }
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val($(this).attr('title'));
        }
    });
    var tabs = $('.top a,.bottom a').click(function () {
        if (animating) return false;
        if (!animating) {
            animating = true;
            var id = $(this).attr('href').replace('#', '');
            var nextTab = $($(this).attr('href'));
            if (currentTab.attr('id') == id) return false;
            tabs.removeClass('active');
            if (id == 'about') {
                $('.top a:eq(0)').addClass('active');
                $('.bottom a:eq(0)').addClass('active');
            }
            else if (id == 'work') {
                $('.top a:eq(1)').addClass('active');
                $('.bottom a:eq(1)').addClass('active');
            }
            else if (id == 'contact') {
                $('.top a:eq(2)').addClass('active');
                $('.bottom a:eq(2)').addClass('active');
            }
            currentTab.stop(false, false).animate({ left: w }, 1000, function () {
                animating = false;
                currentTab.css({ left: w });
            });
            nextTab.stop(false, false).animate({ left: 0 }, 1000, function () {
                currentTab = nextTab;
            });
        }
        return false;
    });

    //setup pagination here
    var currentPage = $('#work div[id^=page]:eq(0)');
    var pw = currentPage.outerWidth();
    var ph = currentPage.outerHeight();

    $('#work div[id^=page]').css('position', 'absolute');
    $('#work div[id^=page]:gt(0)').css({ left: -pw });

    var allPages = $('.page a').click(function () {
        allPages.removeClass('current');
        $(this).addClass('current');
        var nextPage = $($(this).attr('href'));
        currentPage.animate({ left: pw }, 1000, function () {
            currentPage.css({ left: -pw });
        });

        nextPage.animate({ left: 0 }, 1000, function () {
            currentPage = nextPage;
        });
        return false;
    });
    //initialize portfolio gallery here
    $(".work-thum a[rel^='prettyPhoto']").prettyPhoto({ theme: 'facebook' });

    function sendEmail() {


        return false;
    }
    $('#send-message').click(function () {
        if (validateForm()) {
            $(this).find('img').show();
            sendEmail();
        }
        return false;
    });

    function validateForm() {
        var mail = $('#email');
        var name = $('#name');
        var message = $('#message');

        if (mail.val().length > 0 && mail.val() != mail.attr('title')) {
            if (validEmail(mail.val()))
                mail.removeClass('error');
            else
                mail.addClass('error');
        }
        else {
            mail.addClass('error');
        }
        if (name.val().length > 0 && name.val() != name.attr('title')) {
            name.removeClass('error');
        }
        else {
            name.addClass('error');
        }
        if (message.val().length > 0 && message.val() != message.attr('title')) {
            message.removeClass('error');
        }
        else {
            message.addClass('error');
        }

        return !(mail.hasClass('error') || name.hasClass('error') || message.hasClass('error'));
    }
    function validEmail(e) {
        var pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(e).search(pattern) != -1;
    }

});