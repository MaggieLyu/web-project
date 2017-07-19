var data=null,//保存4*4个数据的二维数组
    RN=4,CN= 4,//保存最大行数RN,和列数CN
	score= 0,//保存游戏得分
	status= 0,//保存游戏状态编号
	//为游戏状态编号起名
	GAMEOVER=0,RUNNING= 1,PAUSE=2;

//启动游戏
 function start(){
	 //初始化游戏状态为运行中
	 status=RUNNING;
	 score=0;
 	// 初始化data为RN行CN列个0元素的二维数组
 	//创建二维数组压入data中
 	data=[];
 	//创建4*4个数据0；
 	//遍历行和列
 	for(var r=0;r<RN;r++){
 		//先创建空数组
 		data.push([]);
 		for(var c=0;c<CN;c++){
 			data[r][c]=0;//data[r].push(0)
 		}
 	}
 	/*生成2个随机数*/
 	randomNum();randomNum();
 	//启动就更新页面
 	updateView();
 	//console.log(data.join("\n"));
	document.onkeydown=function(e){
		//alert(e.keyCode);
		switch(e.keyCode){
			case 37://向左键
				moveLeft();
				break;
			case 38://向上键
				moveUp();
				break;
			case 39://向右键
				moveRight();
				break;
			case 40://向下键
				moveDown();
				break;
		}
	}
 }

 //随机生成一个数
 function randomNum(){
 	while(true){
 	// 0~RN-1之间随机生成一个行r
 	var r=parseInt(Math.random()*RN);
 	// 0~CN-1之间随机生成一个列c
 	var c=parseInt(Math.random()*CN);
 	if(data[r][c]==0){
 	data[r][c]=Math.random()<0.5?2:4;
 	break;//退出循环
 	}
   }
 }

 //更新页面数据
 function updateView(){
 	// 遍历data
 	for(var r=0;r<RN;r++){
 		for(var c=0;c<CN;c++){
 			// 用id查找对应的div
 			var div=document.getElementById("c"+r+c);
 			// 如果data中r行c列为0
 			if(data[r][c]==0){
 				// 清空div的内容，保留cell属性样式
 				div.innerHTML="";
 				div.className="";
 			}else{
 				// 否则设置div的内容为data中r行c列
 			div.innerHTML=data[r][c];
 			div.className="cell n"+data[r][c];
 			}
 		}
 	}
	 //找到id为score的span,设置其内容为score
	 document.getElementById("score").innerHTML=score;
	 var div=document.getElementById("gameover");
	 if(status==GAMEOVER){
		 //显示div为gameover的div
		 div.style.display="block";
		 document.getElementById('final').innerHTML=score;
	 }else{
		 div.style.display="none";
	 }
 }

//左移所有行
function moveLeft(){
	//有变化才有移动,为数组拍照保存在before
	var before=String(data);
	//遍历data中每一行
	for(var r=0;r<RN;r++) {
		//左移第R行
		moveLeftInRow(r);
	}//遍历结束
	//如果本次移动修改了数组
	//为数组data拍照保存在after
	var after=String(data);
	//如果before!=after
	if(before!=after){
		//随机生成2或4
		randomNum();
		if(isGameOver())
		status=GAMEOVER;
		//更新页面
		updateView();
	}
}

//上移所有行
function moveUp(){
 var before=String(data);
 for(var c=0;c<CN;c++){
 	moveUpInCol(c);
 }
 var after=String(data);
 if(before!=after){
 	randomNum();
	 if(isGameOver())
		 status=GAMEOVER;
 	updateView();
 }
}

//右移所有行
function moveRight(){
//为数组拍照保存在before
var before=String(data);
//遍历data中每一行
for(var r=0;r<RN;r++){
	moveRightInRow(r);
}
//如果本次移动修改了数组
//为数组data拍照保存在after
var after=String(data);
if(before!=after){
	randomNum();
	if(isGameOver())
		status=GAMEOVER;
	updateView();
	}
}

//下移所有行
function moveDown(){
	var before=String(data);
	for(var c=0;c<CN;c++){
		moveDownIncol(c);
	}
	var after=String(data);
	if(before!=after){
		randomNum();
		if(isGameOver())
			status=GAMEOVER;
		updateView();
	}
}

//专门左移动第r行
function moveLeftInRow(r){
	//c从0开始,开始遍历data中r行每个格,到<CN-1结束
	for(var c=0;c<CN-1;c++){
	//查找c位置右侧下一个不为0位置nextc
		var nextc=getNextInRow(r,c);
		//如果找到
		if(nextc!=-1){
			//如果c位置的值为0
			if(data[r][c]==0){
				//将nextc位置的值赋值给c位置
				data[r][c]=data[r][nextc];
				//将nextc位置的值置为0
				data[r][nextc]=0;
				//c留在原地
				c--;}
				//否则如果C位置的值等于nextc位置的值
			else if(data[r][c]==data[r][nextc]){
				//将c位置的值*2
				data[r][c]*=2;
				score+=data[r][c];
				//将nextc位置的值置为0
				data[r][nextc]=0;
			}
			//否则(没找到)，就退出循环
		}else{
			break;
		}
	}
}
//专门负责查找r行c列右侧下一个不为0的位置
function getNextInRow(r,c){
	//nextc从c+1开始，到<CN
	for(var nextc=c+1;nextc<CN;nextc++){
		//如果data中r行nextc位置的值不为0
			//就返回nextc
		if(data[r][nextc]!=0){
			return nextc;//return既能返回内容，又能停止函数。
		}
	}
	return -1;//返回-1
}

//专门上移第c列
function moveUpInCol(c){
	for(var r=0;r<RN-1;r++){
		var nextr=getNextInCol(r,c);
		if(nextr!=-1){
			if(data[r][c]==0){
				data[r][c]=data[nextr][c];
				data[nextr][c]=0;
				r--;
			}else if(data[r][c]==data[nextr][c]){
				data[r][c]*=2;
				score+=data[r][c];
				data[nextr][c]=0;
			}
		}else{
			break;
		}
	}
}
//专门负责查找c列下册不为0的位置
function getNextInCol(r,c){
	for(var nextr=r+1;nextr<RN;nextr++){
		if(data[nextr][c]!=0){
			return nextr;
		}
	}
	return -1;
}
//专门右移动第r行
function moveRightInRow(r){
	//C从CN/开始遍历data中第r行每个格，到C>0结束
	for(var c=CN-1;c>0;c--){
		var prevc=getPrevInRow(r,c);
		if(prevc!=-1){
			if(data[r][c]==0){
				data[r][c]=data[r][prevc];
				data[r][prevc]=0;
				//C留在原位
				c++;
			}else if(data[r][c]==data[r][prevc]){
				data[r][c]*=2;
				score+=data[r][c];
				data[r][prevc]=0;
			}
			}else{
			break;
		}
	}
}

//专门负责查找r行左侧下一个不为0的位置
function getPrevInRow(r,c){
	for(var prevc=c-1;prevc>=0;prevc--){
		if(data[r][prevc]!=0){
			return prevc;
		}
	}
	return -1;
}

//专门下移第c列
function moveDownIncol(c){
	for(var r=RN-1;r>0;r--){
		var prevr=getPrevInCol(r,c);
		if(prevr!=-1){
			if(data[r][c]==0){
				data[r][c]=data[prevr][c];
				data[prevr][c]=0;
				r++;
			}else if(data[r][c]==data[prevr][c]){
				data[r][c]*=2;
				score+=data[r][c];
				data[prevr][c]=0;
			}
		}else{
			break;
		}
	}
}
//专门负责查找c列上一行不为0的位置
function getPrevInCol(r,c){
	for(var prevr=r-1;prevr>=0;prevr--){
		if(data[prevr][c]!=0){
			return prevr;
		}
	}
	return -1;
}

//判断游戏是否结束
function isGameOver(){
	//遍历data
	for(var r=0;r<RN;r++){
		for(var c=0;c<CN;c++){
			if(data[r][c]==0)return false;
			if(c<CN-1&&data[r][c]==data[r][c+1])
			return false;
			if(r<RN-1&&data[r][c]==data[r+1][c])
			return false;
		}
	}
	return true;
}
start();