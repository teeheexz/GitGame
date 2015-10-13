// To use the sound on a web page with its current parameters (and without the slider box):
require.config({
    paths: {"jsaSound": "http://animatedsoundworks.com:8001"}
});


require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;

        //game background
        var bgRect = paper.rect(0,0,pWidth,pHeight);
        bgRect.attr({"fill": "url(http://media02.hongkiat.com/planet-earth-space-wallpapers/western_hemisphere.jpg)"});

        var counter = 0;
        //to start game using start button
        var startButton = paper.circle(300, 200, 80);
        var startText = paper.text(300, 200, 'START');
        startText.attr({'font-size': "15px", 'font-weight': "bold"});
        startButton.attr({
            'fill': "url(http://www.psdgraphics.com/wp-content/uploads/2011/09/metal-plate-rivets.jpg)", 
            'stroke': "black", 
            'stroke-width': 1
        });

        //hide button and text when game begins
        startButton.hide();
        startText.hide();

        var ready = function(){
        	//show start button again when i want to
            startButton.show();
        	startText.show();
            //hiding the target when start button is shown
            target.hide();
            //ask the player to select which level of difficulty they want 
            alert("Set your preferred difficulty level for the game! Good Luck!");
        };

        var start = function() {
        	console.log("The game is starting");
        	//hide start button when game is starting 
            startButton.hide();
        	startText.hide();
            //upon clicking the start button, the target will appear.
            target.show();
        	counter = 0;
            //this is to stop the game (in 10 secs)
            setTimeout(gameStop, 10000);
            //this is to start the game by calling moveTarget
            moveTarget();
        }

        startButton.node.addEventListener('click', start);

        //------------------------------------------------------------------------

        //set the different difficulty levels 
        
        var difficultyLevel = document.getElementById("difficultyLevel")
        var selectButton = document.getElementById("selectButton")
        var easyLevel = "easy";
        var mediumLevel = "medium";
        var difficultLevel = "difficult";
      
        //difficulty level for the game is being set according to the speed of the target   
        //'if' statement to set the keywords for user to key into the text box, so that each keyword keyed in leads to a different level of the game 
        selectButton.addEventListener('click', function() {
            if (difficultyLevel.value === easyLevel){
            console.log("You have chosen Easy level.")
                target.xrate=8;
                target.yrate=8;
          }

            if (difficultyLevel.value === mediumLevel){
            console.log("You have chosen Medium level.")
                target.xrate=16;
                target.yrate=16;
          }

            if (difficultyLevel.value === difficultLevel){
            console.log("You have chosen Difficult level.")
                target.xrate=25;
                target.yrate=25;
          }
      	});

        //------------------------------------------------------------------------

        //the target object is set as a circle
        var target = paper.circle(100,100,60);
        target.attr({
        	'fill': "url(http://www.gifs.cc/aliens/alien-in-spaceship.gif)"
        })

        target.xpos=pWidth/2;
        target.ypos=pHeight/2;
        target.xrate=10;
        target.yrate=10;

        var moveTarget = function(){
        	//Update target.xpos and target.ypos by adding target.xrate and target.yrate
            target.xpos += target.xrate; //Same as target.xpos = target.xpos + target.xrate
            target.ypos += target.yrate;
            //Use target.xpos and target.ypos to update target position
            target.attr({'cx': target.xpos, 'cy': target.ypos});

            //Keep target in paper
            if (target.xpos > pWidth) {target.xrate = -target.xrate;}
            if (target.ypos > pHeight) {target.yrate = -target.yrate;}
            if (target.xpos < 0) { target.xrate = -target.xrate;}
            if (target.ypos < 0) { target.yrate = -target.yrate;};
        }


        setInterval(moveTarget,100);

        //setting the game to run for a fixed amount of time no matter how many successful clicks are made
        var gameStop = function (){
            confirm("Congratulations, you've clicked a total of " + counter + " times! Good job! :)");
            target.attr({
                cx: -100,
                cy: -100
            })
            ready();
        }

        function enableClick(){
            clickMusic.autoplay = true;
            clickMusic.load();
        }

        var clickMusic = new Audio("resources/heeh.mp3");
        target.node.addEventListener('click', function(){
            counter++;
            enableClick();
            console.log("your click count is now " + counter);
        });

        ready(); // Put the start button on the screen 

        var backgroundMusic = new Audio("resources/alien.wav");
        backgroundMusic.play();
        backgroundMusic.loop = true





    }
);