

var source_url = "https://docs.google.com/spreadsheets/d/1ndqoeQOd6j8kwB0Mmyyx5jWezekSis5PGhWIv7m279s/gviz/tq?tqx=out:csv&sheet=Rishi";


// load data from url
var dataset = await d3.dsv(",", source_url, (d) => {
  return {
    game_num : +d.game_num, 
    order : +d.order,
    url: d.url
  };
});

console.log(dataset);
