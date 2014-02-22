function MainViewModel(data) {
  var self = this;
  var ctx = $("#canvas").get(0).getContext("2d");
  
  self.lineChartData = ko.observable();
  
  self.loadDataset = function(id) {
    $.get("/api/posts/"+id, function(data) {
      self.lineChartData(data); 
      var myLine = new Chart(ctx).Line( vm.lineChartData() );
          });
  }
  
}

var vm = new MainViewModel();
ko.applyBindings(vm);
vm.loadDataset(1);
