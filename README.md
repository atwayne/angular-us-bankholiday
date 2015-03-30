# angular-us-bankholiday
An angular service to detect what day is bank holiday in US


# Usage:
<pre>
app.controller('AppCtrl', function ($scope, Workdays) {
    var previousBankDay = Workdays.getPreviousBankDay(new Date());
    $scope.bizDate = Workdays.getDateString(previousBankDay);
});
</pre>
# Dependency
  underscore.js
