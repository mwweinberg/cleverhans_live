var introPageText = "Guten Tag! I am Herr Doktor von Osten. My clever horse Hans would like to calculate for you!"
var inputPageText = "Bitte pick your numbers so that Hans can calulate for you!"

var calc1 = 1
var calc2 = 2
var calcOut

//variables to hold the text value of the calc numbers
var calc1Text;
var calc2Text;


//holds all of the game options
var gameOptions = {
    canvasWidth : 640,
    canvasHeight : 480,
    tweenSpeed: 2000

}

// loads after the DOM has loaded
window.onload = function() {
    //creates the configuration file
    var gameConfig = {
        width: gameOptions.canvasWidth,
        height: gameOptions.canvasHeight,
        backgroundColor: 0xecf0f1,
        //creates the phaser scenes
        scene: [bootGame, introPage, inputPage, mathPage]
    }
    //instantiates a new phaser game called game, calls config file
    game = new Phaser.Game(gameConfig);
    //locks keyboard/mouse control to this window
    window.focus();
    //calls the resizeGame function
    resizeGame();
    //calls the resizeGame function again every time the window is resized
    window.addEventListener("resize", resizeGame);

}

//creates a child of the Phaser.Scene class
class bootGame extends Phaser.Scene{
    //this is the key that identifies the scene
    //'super accesses the Phaser.Scene class constructor() function
    constructor(){
        super("BootGame");
    }
    preload(){
        this.load.image("osten_und_hans", "assets/images/Osten_und_Hans.jpg");
        this.load.image("restart", "assets/images/restart.png");
        this.load.image("osten_face", "assets/images/Osten_face.jpg");
        this.load.image("osten_face_right", "assets/images/Osten_face_right.jpg");
        this.load.image("plus_image", "assets/images/plus.png");
        this.load.image("minus_image", "assets/images/minus.png");
        this.load.image("to_hans", "assets/images/tohans.png");
        this.load.image("add_hans", "assets/images/addhans.png");
        this.load.image("sub_hans", "assets/images/subhans.png");
        this.load.image("again_hans", "assets/images/againhans.png");
        this.load.image("hans_crowd", "assets/images/hans_crowd.jpg");
        this.load.image("hans_teach", "assets/images/hans-teach.jpg");
        this.load.spritesheet('horse_idle', "assets/images/Horse_Idle.png", {frameWidth: 60, frameHeight: 33});


    }
    //create() functions are automatically executed when the scene is called
    create(){
        console.log("game is booting...");
        //calls the  next scene
        this.scene.start("IntroPage");
    }
}

//first page
class introPage extends Phaser.Scene{
    constructor(){
        super("IntroPage");
    }
    create(){
        console.log("introPage creating");
        //adds the image using a variable so that it can be accessed using the tween function
        //setAlpha(0) adds it invisibly so that it can be faded in
        const ostenHans = this.add.image(402, 240, "osten_und_hans").setAlpha(0);

        //tween to fade in the image
        this.tweens.add({
            //target of the tween
            targets: ostenHans,
            //moving alpha of the image to 1
            alpha: 1,
            //sets the pace of the transition
            duration: gameOptions.tweenSpeed,
            //this allows you to trigger functions within onComplete
            //I don't know why
            callbackScope: this,
            //function that runs once the tween has completed
            onComplete: function(){
                console.log("tween complete");
                this.addText();
                this.addToHansButton();

            }
        });
    }

    addText(){
        var welcomeText = this.add.text(10,0, introPageText, {fontFamily: 'GermaniaOne-Regular'});
        welcomeText.setStyle({
            color: 'white',
            fontSize: 20,
            wordWrap: {width: 250}
        });

    }

    addToHansButton(){
        var toHansButton = this.add.image(500, 400, "to_hans");
        toHansButton.setInteractive();
        toHansButton.on("pointerdown", function(){
           console.log("click");
           this.scene.start("InputPage");
        }, this);
    }



}

//second page
class inputPage extends Phaser.Scene {
    constructor(){
        super("InputPage");
    }
    create(){
        console.log("input page loaded");
        //loads the background image with some opacity
        this.add.image((gameOptions.canvasWidth/2), (gameOptions.canvasHeight/2), "hans_crowd").setAlpha(.3);
        //adds the face image
        this.add.image(50, 50, "osten_face_right");
        //adds the text at the top by first creating a variable
        var ostenText = this.add.text(150, 50, inputPageText);
        //and then setting the style on the variable
        ostenText.setStyle({
            color: 'black',
            fontSize: 30,
            fontFamily: 'GermaniaOne-Regular',
            wordWrap: {width: 400}
        });

        //this is another way to create the text
        // this.make.text({
        //     x: 250,
        //     y: 50,
        //     text: inputPageText,
        //     style: {
        //         color: 'blue',
        //         wordWrap: {width: 50}
        //     }
        // });

        //variable to hold the text elements of dislpaying calc1
        calc1Text = this.add.text((gameOptions.canvasWidth * .25), 220, calc1);
        calc1Text.setStyle({
            color: 'black',
            fontFamily: 'GermaniaOne-Regular',
            fontSize: 80
        });
        //and calc2
        calc2Text = this.add.text((gameOptions.canvasWidth * .75), 220, calc2);
        calc2Text.setStyle({
            color: 'black',
            fontFamily: 'GermaniaOne-Regular',
            fontSize: 80
        });

        //add the buttons
        this.addPlusCalc1();
        this.addMinusCalc1();
        this.addPlusCalc2();
        this.addMinusCalc2();
        this.addAddButton();
        this.addMinusButton();

    }


    //adds the plus icon
    //increments the value of calc1 by adding 1
    addPlusCalc1(){
        //variable for the plus icon
        var plusCalc1 = this.add.image((gameOptions.canvasWidth * .1), 225, "plus_image");
        //rescales the button size 50%
        plusCalc1.setScale(.5);
        //makes the plus icon interactive
        plusCalc1.setInteractive();
        //when the plus icon is pressed
        plusCalc1.on("pointerdown", function(){
            //print something
            console.log("plusCalc1");
            //increment calc1 by 1
            calc1 = calc1 +1;
            //trigger addCalc1Text to write the new number
            calc1Text.setText(calc1);
            //**this.addCalc1Text();
            //print something
            console.log("calc1 = " + calc1);
            //TODO: redraw calc1 after incrementing it
        }, this);
    }

    addMinusCalc1(){
        var minusCalc1 = this.add.image((gameOptions.canvasWidth * .1), 325, "minus_image");
        minusCalc1.setScale(.5);
        minusCalc1.setInteractive();
        minusCalc1.on("pointerdown", function(){
            calc1 = calc1 - 1;
            calc1Text.setText(calc1);
        }, this);
    }

    addPlusCalc2(){
        var plusCalc2 = this.add.image((gameOptions.canvasWidth * .9), 225, "plus_image");
        plusCalc2.setScale(.5);
        plusCalc2.setInteractive();
        plusCalc2.on("pointerdown", function(){
            calc2 = calc2 + 1;
            calc2Text.setText(calc2);
        }, this);
    }

    addMinusCalc2(){
        var minusCalc2 = this.add.image((gameOptions.canvasWidth * .9), 325, "minus_image");
        minusCalc2.setScale(.5);
        minusCalc2.setInteractive();
        minusCalc2.on("pointerdown", function(){
            calc2 = calc2 - 1;
            calc2Text.setText(calc2);
        }, this);
    }

    addAddButton(){
        var addButton = this.add.image(gameOptions.canvasWidth/2, 200, "add_hans");
        addButton.setScale(.5);
        addButton.setInteractive();
        addButton.on("pointerdown", function(){
            calcOut = calc1 + calc2;
            this.scene.start("MathPage");
        }, this);
    }

    addMinusButton(){
        var subButton = this.add.image(gameOptions.canvasWidth/2, 300, "sub_hans");
        subButton.setScale(.5);
        subButton.setInteractive();
        subButton.on("pointerdown", function(){
            calcOut = calc1 - calc2;
            this.scene.start("MathPage");
        }, this);
    }
}

class mathPage extends Phaser.Scene {
    constructor(){
        super("MathPage");
    }

    create(){

        //loads the background image with some opacity
        this.add.image((gameOptions.canvasWidth/2), (gameOptions.canvasHeight/2), "hans_teach").setAlpha(.3);

        //hans cannot express negative numbers
        //may need to be 1 so that the math below does not create -1
        if (calcOut < 0) {
            calcOut = 1
        }

        //troubleshooting code to print calcOut, can be deleted
        // var calcOutValue = this.add.text(200, 200, calcOut);
        // calcOutValue.setStyle({
        //     color: 'black'
        // });

        this.anims.create({
            key: 'horse',
            //you only want to use some of the frames from the spritesheet
            frames: this.anims.generateFrameNumbers('horse_idle', { frames: [0, 1, 2, 3, 4, 12]}),
            framerate: 6,
        });

        //adds the horse animation object
        const horse_image = this.add.sprite(gameOptions.canvasWidth/2, gameOptions.canvasHeight/2);
        //scales the animation object
        horse_image.setScale(6);
        //plays the animation object calcOut number of times
        //does repeat always do one extra? That's what the -1 is there to balance
        //frameRate controls the animation speed
        horse_image.play({key: 'horse', frameRate: 4, repeat: (calcOut - 1)});

        //adds the reset button
        this.addResetButton();

    }

    addResetButton(){
        var resetButton = this.add.image(500, 400, "again_hans");
        resetButton.setInteractive();
        resetButton.on("pointerdown", function(){
            this.scene.start("InputPage");
        }, this);
    }
}


//function to resize the canvas whenever the window is resized
function resizeGame() {
    //find the game's canvas
    var canvas = document.querySelector("canvas");
    //figure out current window size
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    //window size ratio
    var windowRatio = windowWidth / windowHeight;
    //window game ratio
    var gameRatio = game.config.width / game.config.height;
    //resize based on situation. In this case canvase can conver full width
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    //in this case cover full height
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
