
var tabulate = function (data,columns) {
  var table = d3.select('body').append('table')
	var thead = table.append('thead')
	var tbody = table.append('tbody')

	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text(function (d) { return d })

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })

  return table;
}


source_url = "https://docs.google.com/spreadsheets/d/1ndqoeQOd6j8kwB0Mmyyx5jWezekSis5PGhWIv7m279s/gviz/tq?tqx=out:csv&sheet=Rishi";

var dataset;

d3.csv(source_url, convertData, function(data){
    dataset = data;
});

function convertData(d){
    d.game_num = +d.game_num;
    d.order = +d.order;
    return d;
}

var columns = ['game_num','order','url'];
tabulate(dataset, columns);





