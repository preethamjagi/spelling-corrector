var d = "https://sg.api.textgears.com/spelling?"
var key = "key=aiAu8Y3OaN0Pokab&text="
var t = "&language=en-GB"
var more;
var inter = count();

function putit(i, j){
    var text = more.response.errors[i].better[j];
    var err = more.response.errors[i].bad;
    var mod = '\\b'+err+'\\b';
	var p = document.getElementById("demo").innerHTML;
    p = p.replace(new RegExp(mod, "i"), 
    		'<div style="display: inline-block; background-color: whitesmoke;">'+text+'</div>')
	document.getElementById("demo").innerHTML = p;
    var e = document.getElementById("memo");
    var first = e.firstElementChild;
    while (first) {
        first.remove();
        first = e.firstElementChild;
    }
}

function listing(i){
	var lnth = more.response.errors[i].better.length;
    for (let j = 0; j < lnth ; j++){
    	var text = more.response.errors[i].better[j];
    	var node = document.createElement("li");
  		var textnode = document.createTextNode(text);
        var att = document.createAttribute("onclick");
        var att2 = document.createAttribute("style");
        att.value = "putit("+i+","+j+")";
        att2.value = "cursor: pointer";
  		node.appendChild(textnode);
        node.setAttributeNode(att);
        node.setAttributeNode(att2);
  		document.getElementById("memo").appendChild(node);
    }
}

function count(){
    return function(data){
    var res = document.getElementById("finp").value;
    var along = data.response.errors;
    for (let i = 0; i < along.length ; i++) {
    	var bad = along[i].bad;
        var bab = '\\b'+bad+'\\b';
    	res = res.replace(new RegExp(bab, "i"), '<div style="display: inline-block; cursor: pointer; background-color: #fdfd96;" onclick="listing('+i+')">'+bad+'</div>')
        }
    return res;
    }
}

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  var res = document.getElementById("finp").value.split(' ').join('+');
  var url = d+key+res+t;
  xhttp.onload = function() {
  	more = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = inter(more);
  }
  xhttp.open("GET", url);
  xhttp.send();
}
