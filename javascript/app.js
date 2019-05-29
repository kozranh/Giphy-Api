
var btns = ["dog", "cat", "rabbit"];
var state = [false, false, false,false,false,false, false, false,false,false];

var API_KEY = 'FNTUpz2gOtBb7sgEURDYj6YJT0UkNtEV'
var domain = 'http://api.giphy.com'
var path = '/v1/gifs/search'
var endpoint = domain+path+'?api_key='+API_KEY
var limit = '&limit=10'
var gifRes;

function loadButtons(){
  document.getElementById("buttons").innerHTML = '';
  for (var i=0;i<btns.length;i++) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "<b>"+btns[i]+"</b>";
    btn.addEventListener("click", buttonClickListener(btns[i]), false)
    document.getElementById("buttons").appendChild(btn);
  }  
}

function onAddTopicClicked(){
  var name = document.getElementById("topic").value.trim()
  document.getElementById("topic").value = ""
  if(name == ""){
    return;
  }
  btns.push(name)
  loadButtons()
}

function buttonClickListener(s){
  return function(){
    onButtonClick(s)
  }
}

function onButtonClick(searchString){
  var url = endpoint+'&q='+searchString+limit;
  requestGifs(url)
}


function requestGifs(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      gifRes = JSON.parse(this.responseText)
      loadGifs(gifRes);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send(); 
}

function loadGifs(json){
  state = [false, false, false,false,false,false, false, false,false,false];
  for(var i=0;i<json.data.length;i++){
    document.getElementById(""+i).src = json.data[i].images.fixed_height_small_still.url;
  }
}

function onImgClicked(index){
  var obj = gifRes.data[index];
  if(state[index]){
    // set still
    document.getElementById(""+index).src = obj.images.fixed_height_small_still.url;
  } else {
    // set anim
    document.getElementById(""+index).src = obj.images.fixed_height_small.url;
  }
  state[index]=!state[index]
}