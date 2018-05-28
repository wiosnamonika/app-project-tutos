$(function() {

    var ul = $("#holiday-dates");
    var holidayUrl = 'https://holidayapi.com/v1/holidays?country=PL&year=2016&key=807ef576-d255-4254-bd76-4d501ab316f6';

    function instertHolidays(holidays, days) {
        var i=0;
        for (var key in holidays) {
            console.log(holidays[key][0].name+' '+holidays[key][0].date);
            console.log(holidays[key]);
            var li = $('<li>', { class: "day"});
            var span = $('<span>');
            span.text(holidays[key][0].name+' '+holidays[key][0].date);
            li.append(span);
            ul.append(li);
            i++;
            if (i>=days)    {
                break;
            }
        }
    }

    function loadHolidayDays(days) {
        $.ajax({
            url: holidayUrl,
            dataType: 'json'
        }).done(function(response) {
            console.log(response.holidays);//moze byc cokolwiek.holidays kropka wchodzi do kolenej wlasxiwosxi obiektu
            instertHolidays(response.holidays, days);
        }).fail(function(error){
            console.log(error);
        })

    }
        loadHolidayDays(5);
});
