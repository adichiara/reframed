
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

/*
d3.csv('data.csv',function (data) {
	var columns = ['variable','aror','asd','maxdd']
  tabulate(data,columns)
})
*/

sourcefile = "https://docs.google.com/spreadsheets/d/1ndqoeQOd6j8kwB0Mmyyx5jWezekSis5PGhWIv7m279s/edit#gid=1206004629";

d3.csv(sourcefile,function (data) {
	var columns = ['game_num','order','url']
  tabulate(data,columns)
})



