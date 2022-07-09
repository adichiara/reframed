

var source_url = "https://docs.google.com/spreadsheets/d/1ndqoeQOd6j8kwB0Mmyyx5jWezekSis5PGhWIv7m279s/gviz/tq?tqx=out:csv&sheet=Rishi";


var dataset;
d3.csv(source_url, function(error, data) {
  console.log(error)

  dataset = error;

});

