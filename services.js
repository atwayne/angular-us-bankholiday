var services = angular.module('services', ['ngResource']);
services.factory('Workdays', function () {
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    var getByWeekDay = function (date, index, weekday) {
        var list = [];
        var start = new Date(date.getFullYear(), date.getMonth(), 1);
        var currentMonth = date.getMonth();
        while (start.getMonth() === currentMonth) {
            if (start.getDay() === weekday) {
                list.push(start);
            }
            start = start.addDays(1);
        }

        return getByIndex(list, index);
    };

    // NOT zero based
    var getByIndex = function (array, index) {
        var length = array.length;
        if (index == 0)
            return array[0];

        if (index > 0) {
            index = (index - 1) % length;
            return array[index];
        }

        index = (index % length) + length;
        return array[index];
    };

    var holidays = [
        //  Weekend
        function (date) { return date.getDay() == 6 || date.getDay() == 0 },

        //  New Year's Day
        function (date) { return date.getMonth() == 1 - 1 && date.getDate() == 1; },
        // Independence Day
        function (date) { return date.getMonth() == 7 - 1 && date.getDate() == 4; },
        // Veterans Day
        function (date) { return date.getMonth() == 11 - 1 && date.getDate() == 11; },
        // Christmas
        function (date) { return date.getMonth() == 12 - 1 && date.getDate() == 25; },

        // Birthday of Martin Luther King, Jr.
        function (date) {
            if (date.getMonth() != 1 - 1) return false;
            var holiday = getByWeekDay(date, 3, 1);
            return date.getDate() === holiday.getDate();
        },
        // Washington's Birthday
        function (date) {
            if (date.getMonth() != 2 - 1) return false;
            var holiday = getByWeekDay(date, 3, 1);
            return date.getDate() === holiday.getDate();
        },
        // Memorial Day
        function (date) {
            if (date.getMonth() != 5 - 1) return false;
            var holiday = getByWeekDay(date, -1, 1);
            return date.getDate() === holiday.getDate();
        },
        // Labor Day
        function (date) {
            if (date.getMonth() != 9 - 1) return false;
            var holiday = getByWeekDay(date, 1, 1);
            return date.getDate() === holiday.getDate();
        },
        // Columbus Day
        function (date) {
            if (date.getMonth() != 10 - 1) return false;
            var holiday = getByWeekDay(date, 2, 1);
            return date.getDate() === holiday.getDate();
        },
        // Thanksgiving Day
        function (date) {
            if (date.getMonth() != 11 - 1) return false;
            var holiday = getByWeekDay(date, 4, 4);
            return date.getDate() === holiday.getDate();
        }
    ];

    var isBankHoliday = function (date) {
        var result = false;
        var match = _.find(holidays, function (fun) { return fun(date); });
        return match != undefined;
    };

    var getPreviousBankDay = function (date) {
        var start = date.addDays(-1);
        while (isBankHoliday(start)) {
            start = start.addDays(-1);
        }
        return start;
    };

    var getDateString = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10)
            month = '0' + month;

        if (day < 10)
            day = '0' + day;

        return '' + year + month + day;
    };
    return {
        getPreviousBankDay: getPreviousBankDay,
        getDateString: getDateString
    };
});