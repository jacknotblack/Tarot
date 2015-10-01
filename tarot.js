function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var element = document.getElementById("bootcard");

$("#get_c_num").submit(function(event)
{
  var num=$("#c_number").val();
  $(element).empty();
  var carddrawed=[];
  //////////////////////////////
  var model1=new Model({type:"tarot",seq:[1,79]});
  var cardinfos=model1.getcardinfo();
  //////////////////////////////
  for (i=1;i<=num;i++){
    var div = document.createElement("div");
    $(div).addClass("col-xs-4 col-sm-3 col-md-2");
    var a = document.createElement("a");
    a.href="#";
    $(a).addClass("thumbnail");
    var img = document.createElement("img");
      //draw random card >78 means reversed
    var rand;
    do{rand=getRandomInt(1,156)}
      //verify duplication
    while($.inArray(rand,carddrawed)!=-1)
    if (rand > 78){
          carddrawed.push(rand);
          rand-=78;
          $(img).addClass("reversed");
      } else {
          carddrawed.push(rand+78);
    }
    carddrawed.push(rand);
  //      alert(carddrawed);
    $(img).addClass("cardpic");
    img.src = "./Tarotpic/("+rand+").jpg";
    var caption = document.createElement("div");
    $(caption).addClass("caption");
    var label = document.createElement("h3");
    var descr = document.createElement("p");
    if(i<=cardinfos.length){ 
    label.innerHTML=cardinfos[i-1].name+"("+cardinfos[i-1].position+")";
    descr.innerHTML=cardinfos[i-1].description+"<br>測試中圖文不符";
    }
    else{label.innerHTML="Card"+rand;}
     
      caption.appendChild(label);
      caption.appendChild(descr);
        a.appendChild(img);
        a.appendChild(caption);
        div.appendChild(a);
        element.appendChild(div);
        //bootstrap culumn fix
        if(i%3==0){
          var fix=document.createElement("div");
          $(fix).addClass("clearfix visible-xs-block");
          element.appendChild(fix);
        }
        if(i%4==0){
          var fix=document.createElement("div");
          $(fix).addClass("clearfix visible-sm-block");
          element.appendChild(fix);
        }
        if(i%6==0){
          var fix=document.createElement("div");
          $(fix).addClass("clearfix visible-md-block");
          element.appendChild(fix);
          $(fix).addClass("clearfix visible-lg-block");
          element.appendChild(fix);
        }
      //  if(i%12==0){
       //   var fix=document.createElement("div");
       //   $(fix).addClass("clearfix visible-lg-block");
       //   element.appendChild(fix);
       // }
      }
      return false;
    });


//draw param:type / number return: array of cards

//controller: get the info of drawn cards

function Model(cards){
  var cardinfo;
  this._cards=cards;
  this._cardtype=this._cards.type;
  this._seq=this._cards.seq;
}

Model.prototype={
  getcardinfo:function(){
 //   alert(this._seq.length);
    for(i = 0; i < this._seq.length; i++) {
       //send request to DB
    }
    return jsontest;
  },

}

//var model1=new Model({type:"tarot",seq:[1,79]});
//model1.getcardinfo();


var jsontest =
[
{
    "_id" : 1,
    "name" : "愚者",
    "position" : "正位",
    "description" : "the fool is cute"
},
{
    "_id" : 79,
    "name" : "愚者",
    "position" : "逆位",
    "description" : "the fool is still cute"
},
{
    "_id" : 80,
    "name" : "魔術師",
    "position" : "逆位",
    "description" : "the magician is awesome"
},
{
    "_id" : 2,
    "name" : "魔術師",
    "position" : "正位",
    "description" : "the magician is extremely cool"
}
];