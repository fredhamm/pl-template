  $(document).ready(function() {

		loadMoreArticles()

///

		$(".navbar-toggle").on("click", function () {

	    	$(this).toggleClass("active");
			  					
			  					});

////

  $("input.label_better").label_better({
    position: "top", // This will let you define the position where the label will appear when the user clicked on the input fields. Acceptable options are "top", "bottom", "left" and "right". Default value is "top".
    animationTime: 500, // This will let you control the animation speed when the label appear. This option accepts value in milliseconds. The default value is 500.
    easing: "ease-in-out", // This option will let you define the CSS easing you would like to see animating the label. The option accepts all default CSS easing such as "linear", "ease" etc. Another extra option is you can use is "bounce". The default value is "ease-in-out".
    offset: 30, // You can add more spacing between the input and the label. This option accepts value in pixels (without the unit). The default value is 20.
    hidePlaceholderOnFocus: true // The default placeholder text will hide on focus
  });

   $('.flicker-example').flickerplate();

                
								});

///////// Mustache way

var currentPage = 0;

  $('#Next').on('click',function() {
  	currentPage++;
	loadMoreArticles()
									});

  $('#Prev').on('click',function() {
  	if(currentPage > 1) {
  		currentPage--;
  		loadMoreArticles()
  						}  
									});


function loadMoreArticles(){

$.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20141201&page='+ currentPage +'&end_date=20150108&sort=newest&api-key=d2eb8fef0d3b7f3917086ce5354b4a0b%3A12%3A70461662', function(dataz) {
    var template = "{{#response}}" + 
   	"{{#docs}}" +
    "<div class='panel panel-default animated fadeInUp'>" +
    "<div class='panel-body'>" +    
    "<h4>{{subsection_name}}</h4>" +
	"<h3>{{headline.main}}</h3>" +
	"<h6>{{byline.original}}</h6>" +
	"<h6>{{pub_date}}</h6>" +
	"<p>{{snippet}}</p>" +
	"<a href='{{web_url}}'>Read full article</a>"+
    "</div></div>" +
	"{{/docs}}" +
	"{{/response}}";

	//console.log(dataz)



	

    var html = Mustache.to_html(template, dataz);
    $('#sampleArea').html(html);
});

 }



//////// Ajax way

$.ajax({
type: "GET",
url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20141201&end_date=20141218&sort=newest&api-key=d2eb8fef0d3b7f3917086ce5354b4a0b%3A12%3A70461662",
async: false,

dataType: "json",
success: function(data){
var docs = data.response.docs
var htmlString = ""


for (var i in docs) {
	var currentObject = docs[i];
	var datezz = currentObject.pub_date
	var articleDate = new Date(datezz);

if (failCheck(currentObject)) {
		htmlString += "<div class='panel panel-default slide-bottom'><div class='panel-body'>"

	if (failCheck(currentObject.subsection_name)) {
		htmlString += "<h4>"+currentObject.subsection_name+"</h4>"
	} 		

	if (failCheck(currentObject.headline.main)) {
		htmlString += "<h3>"+currentObject.headline.main+"</h3>"
	}

	if (failCheck(currentObject.byline && failCheck(currentObject.byline.original))) {
		htmlString += "<h6>"+currentObject.byline.original+"</h6>"
	}

	if (failCheck(currentObject.pub_date)){
		htmlString += "<h6>"+articleDate+"</h6>"
	}

	if (failCheck(currentObject.snippet)) {
		htmlString += "<p>"+currentObject.snippet+"</p>"
	}

	if (failCheck(currentObject.web_url)) {
		htmlString += "<a href='"+currentObject.web_url+"'>Read full article</a>"
	}										
	

	htmlString += "</div></div>"
};


}
	$("#datatest").html(htmlString);

	//console.log(currentObject.pub_date);
	//var datexx = currentObject.pub_date
	//var datezz = new Date(JSON.parse(JSON.stringify(new datexx())));
	//var formattedDate = date.format("dd-MM-yyyy");

	//var dateStr = JSON.parse(datexx);  
	//var date = new Date(datexx);
	//console.log(date);

	//console.log(datexx);

}

});

function failCheck (string) {
if (string != null) {
	return true;
} else {
	return false;

};
}



// var currentObject.pub_date = JSON.parse(json);  
// console.log(dateStr); // 2014-01-01T23:28:56.782Z
        
// var date = new Date(dateStr);
// console.log(date);  // Wed Jan 01 2014 13:28:56 GMT-1000 (Hawaiian Standard Time)         

// var counter = 1;

// $('#seemore').on('click',function() {

// $.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20141201&page='+ counter +'&end_date=20150108&sort=newest&api-key=d2eb8fef0d3b7f3917086ce5354b4a0b%3A12%3A70461662', function(dataz) {
//     var template = "{{#response}}" + 
//    	"{{#docs}}" +
//     "<div class='panel panel-default slide-bottom'>" +
//     "<div class='panel-body'>" +    
//     "<h4>{{subsection_name}}</h4>" +
// 	"<h3>{{headline.main}}</h3>" +
// 	"<h6>{{byline.original}}</h6>" +
// 	"<h6>{{pub_date}}</h6>" +
// 	"<p>{{snippet}}</p>" +
// 	"<a href='{{web_url}}'>Read full article</a>"+
//     "</div></div>" +
// 	"{{/docs}}" +
// 	"{{/response}}";

//     var html = Mustache.to_html(template, dataz);
//     $('#sampleArea').html(html);
// });


// counter++;
// });


   // var template = "<h1>{{web_url}} {{lastName}}</h1><h4>Age: <strong>{{age}}</strong></h4>";
//     <h1>{{#response}} {{#docs}} {{web_url}} {{/docs}} {{/response}}</h1>




