function MainViewModel(data) {
  var self = this;
  self.lineChartData = ko.observable({
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
    {
    fillColor : "rgba(220,220,220,0.5)",
    strokeColor : "rgba(220,220,220,1)",
    pointColor : "rgba(220,220,220,1)",
    pointStrokeColor : "#fff",
    data : [65,59,90,81,56,55,40]
    },
    {
    fillColor : "rgba(151,187,205,0.5)",
    strokeColor : "rgba(151,187,205,1)",
    pointColor : "rgba(151,187,205,1)",
    pointStrokeColor : "#fff",
    data : [28,48,40,19,96,27,100]
    }
    ]
  });
  self.initLine = function() {
    var ctx = $("#canvas").get(0).getContext("2d");
    var myLine = new Chart(ctx).Line( vm.lineChartData() );
  }
}

var vm = new MainViewModel();
ko.applyBindings(vm);
vm.initLine();
