var tarotControllers=angular.module("tarotControllers",[]);

tarotControllers.controller("CardListCtrl", ["$scope","Card","$routeParams","tarotResult","$http",
	function($scope,Card,$routeParams,tarotResult,$http) {

		var carddrawed=[];
		//returning an obj array of drawed cards info
		$scope.cards=function(cardNum){
			var cardsinfo=[];			
			var rand;
			//verify if the same card of both positions drawed, returning boolean if card or card reversed is in cards
			var checkdrawed=function(card,cards){
				var dupe=(card>78)?card-78:card+78;
				return (cards.indexOf(card)!==-1)||(cards.indexOf(dupe)!==-1);
				};

			//draw n random cards from 156 cards
			while(carddrawed.length!=cardNum){
				do{
					rand=function(){
						return Math.floor(Math.random() * (156 - 1 + 1)) + 1;
					}(rand);
				}
     			 //verify duplication
     			 while(checkdrawed(rand,carddrawed))
     			 	carddrawed.push(rand);
     			};
     		//get card info from tarot.json
     		Card.query(function(Cards){
     				for(j=0;j<carddrawed.length;j++){
     					for(i=0;i<Cards.length;i++){
     						if(Cards[i]["_id"]==carddrawed[j]){
     							cardsinfo.push(Cards[i]);
     							break;
     						}
     					}
     				}
     			});
     			return cardsinfo;
     		}($routeParams.cardNum);

     		//send XHR of drawed cards to server
     		$scope.resultSubmit=function(button){
     			var cardresult = carddrawed;
     			var asker = $routeParams.askerName;
    			var drawTime = new Date().getTime();
     			var drawrecord={
     				askerName: asker,
     				cardType: "tarot",
     				cards: cardresult,
     				time: drawTime,
     				comment: "<尚未解牌>"
     			};

     			
     			var response=tarotResult.save(drawrecord,function(){
     				$scope.resultUrl="http://1.34.137.108/tarot/tarot.html#/archive/"+ drawTime;
     				$scope.submitSucceed=true;
     			},function(){alert("failed~!")});
     		}
     		//set focus on clicked card or cancel focus if a card is set focus already
     		$scope.setfocus=function(card,cards){
     			cards.focus=(cards.focus===card)?null:card;
     		};
     	}
     	]);

tarotControllers.controller("CardDetailCtrl",["$scope","$routeParams","Card",
	function($scope,$routeParams,Card){
		Card.query(function(Cards){
			for(var i=0;i<Cards.length;i++){
				if(Cards[i]["_id"]==$routeParams.cardId){
					$scope.cardInfo=Cards[i];
					break;
				}
			}
		}
		);
		$scope.cardName=$routeParams.cardName;

	}]);



tarotControllers.controller("MenuCtrl",["$scope","Card",
	function($scope,Card){

		$scope.askerName="梁果凍";
		
		$scope.cardTypes=[
		{name:"Angels",number:[1,2,3]},
		{name:"Tarot",number:[1,3,5,7,9,12,15,22]}
		];

		//exclusive menu pop
		$scope.menupop=function(direction){
			$scope.menushow=($scope.menushow==direction)?'none':direction
		};
		$scope.delay=function() {
   // 		setTimeout( function() { window.location = '#/result/'+$scope.askerName+'/'+$scope.cardNum }, 500 );
   window.location = '#/result/'+$scope.askerName+'/'+$scope.cardNum;
		}

	}]);

tarotControllers.controller("ArchiveCtrl",["$scope","$routeParams","tarotResult","Card",
	function($scope,$routeParams,tarotResult,Card){
		//verify backstage mode
		if($routeParams.bs){$scope.isBackStage=true;}
		$scope.cards=[];
		//enable facebook plugin
		$scope.pluginOn = true;
		$scope.url=window.location.href+"/bs";

		//query draw record from server
		$scope.result=tarotResult.get({time:$routeParams.resultId},function(){
			$scope.oldComment=$scope.result.comment;
			moment.locale('zh-tw');
			$scope.time=moment($scope.result.time).format('LLL');
			Card.query(function(Cards){
     				for(j=0;j<$scope.result.cards.length;j++){
     					for(i=0;i<Cards.length;i++){
     						if(Cards[i]["_id"]==$scope.result.cards[j]){
     							$scope.cards.push(Cards[i]);
     							break;
     						}
     					}
     				}
     			});
		});

	//save result explain
	$scope.saveExplain=function(){
//		$scope.result.comment=$scope.resultExplain;
//		console.log($scope.result.comment);
		$scope.result.oldComment=$scope.result.comment;
		$scope.result.readByBack=true;
//		console.log($scope.result.oldComment);
		$scope.result.comment=$scope.oldComment;
		$scope.result.$update(function(){
			$scope.commentStored=true;
		})	
	};

	$scope.setfocus=function(card,cards){
     			cards.focus=(cards.focus===card)?null:card;
     };

	}
]);


tarotControllers.controller("BackStageCtrl",["$scope","tarotResult",
	function($scope,tarotResult){
	//switch view all/view unread
		$scope.filterUnread={readByBack : false};
		$scope.unreadStr="未讀";
		$scope.switchFilter=function(){
			$scope.filterUnread=($scope.unreadOnly)?{}:{readByBack : false};
			$scope.unreadOnly=!$scope.unreadOnly;
			$scope.unreadStr=($scope.unreadOnly)?"未讀":"全部"
		};
		
		$scope.records=tarotResult.query(function(){//callback
		});
		//parse time format
		$scope.timeFormatParse=function(time){
		moment.locale('zh-tw');
		var parsedTime=moment(time).fromNow();
			return parsedTime;
		};
	}]);




