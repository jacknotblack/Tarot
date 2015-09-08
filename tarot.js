function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var element = document.getElementById("bootcard");

$("#get_c_num").submit(function(event)
{
  var num=$("#c_number").val();
  $(element).empty();
  var carddrawed=[];
  for (i=1;i<=num;i++){
    var div = document.createElement("div");
    $(div).addClass("col-xs-4 col-sm-3 col-md-2  col-lg-1 cardpic");
    var a = document.createElement("a");
    a.href="#";
    a.class="thumbnail";
    var img = document.createElement("img");
      //draw random card >78 means reversed
      var rand;
      do{rand=getRandomInt(1,156)}
      //verify duplication
      while($.inArray(rand,carddrawed)!=-1)
        if (rand > 78){
          carddrawed.push(rand);
          rand-=78;
          $(div).addClass("reversed");
        } else {
          carddrawed.push(rand+78);
        }
        carddrawed.push(rand);
  //      alert(carddrawed);
        img.src = "./Tarotpic/("+rand+").jpg"
        $(img).css("vertical-align","middle");
        $(a).css("vertical-align","middle");
        a.appendChild(img);
        div.appendChild(a);
        element.appendChild(div);
      }
      return false;
    });



