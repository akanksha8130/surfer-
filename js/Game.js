class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale=0.7
    car2 = createSprite(100,300);
    car2.addImage("car2",car2_img);
    car3 = createSprite(100,500);
    car3.addImage("car3",car3_img);
    car4 = createSprite(100,700);
    car4.addImage("car4",car4_img);
    car4.scale=0.5
    cars = [car1, car2, car3, car4];
  }

  play(){

    form.hide();
    
    Player.getPlayerInfo();
 player. getCarsRank()

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, -displayWidth*4,0,displayWidth*5, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x ;
      var y=170;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y+ 200;
        //use data form the database to display the cars in y direction
        x = 50- allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
        fill ("yellow")
        ellipse(x,y,80,80)
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = displayHeight/2
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
   player.rank=player.rank+1
   Player.updateCarsRank(player.rank)

      
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
    
   
  
  }
}
