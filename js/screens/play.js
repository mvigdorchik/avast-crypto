game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // load a level
        me.levelDirector.loadLevel("level_" + game.level);

        game.lever_list = [];

        game.data.goal_string = game.getRandomPassword();
        game.spawnEntities(game.level);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the cipher from the game world
        me.game.world.removeChild(game.cipher_text);
        me.game.world.removeChild(game.exit);
        var lever;
        for (lever of game.lever_list)
            me.game.world.removeChild(lever);
    },

});
game.spawnEntities = function (level_type) {
    var groundY = 700;

    var lever;


    switch (level_type) {
    case "intro":
	// Force the intro into a complete state from the start
	game.data.current_string = game.data.goal_string;
        game.signText = new game.Textbox.Container(1380, 100, "You're tasked with testing the security of Crypto castle...");
        me.game.world.addChild(game.signText);
	
        game.sign2Text = new game.Textbox.Container(1280, 100, "To pass each level you'll need to crack the cipher...");
        me.game.world.addChild(game.sign2Text);

	game.exit = me.pool.pull("ExitEntity", 1300, groundY-140);
	me.game.world.addChild(game.exit);
	// Draw text off screen so cleanup doesnt complain
        game.cipher_text = new game.cipher.Container(10000, 10000);
        me.game.world.addChild(game.cipher_text);
	break;
    case "caesar":
	console.log("caesar level");
        game.data.current_string = caesarCipher(game.data.goal_string, Math.ceil(Math.random() * 14));
        game.data.start_string = game.data.current_string;

        lever = me.pool.pull("InteractEntity", 670, groundY, game.getCaesarLever(-1), game.getCaesarLever(1));
        me.game.world.addChild(lever);

	game.exit = me.pool.pull("ExitEntity", 1300, groundY-70);
	me.game.world.addChild(game.exit);
        game.signText = new game.Textbox.Container(800, 100, "Can you break a Caesar cipher?");
        me.game.world.addChild(game.signText);

        game.cipher_text = new game.cipher.Container(895, 540);
        me.game.world.addChild(game.cipher_text);
	break;

    case "vigenere":
        console.log("vigenere level");
        game.data.current_string = vigenereCipher(game.data.goal_string, game.data.key_string);
        game.data.start_string = game.data.current_string;

        for (var i = 0; i < game.data.current_string.length; i++) {
            lever = me.pool.pull("InteractEntity", 400 + 140 * i, groundY, game.getVigenereLever(i, -1), game.getVigenereLever(i, 1));
            me.game.world.addChild(lever);
        }

	game.exit = me.pool.pull("ExitEntity", 1300, groundY-70);
	me.game.world.addChild(game.exit);
        game.lever_list.push(lever);
        game.signText = new game.Textbox.Container(800, 100, "Vigenere is a little harder...");
        me.game.world.addChild(game.signText);

        game.cipher_text = new game.cipher.Container(750, 650);
        me.game.world.addChild(game.cipher_text);
	break;

    case "atbash":
        console.log("atbash level");
        game.data.current_string = atbashCipher(game.data.goal_string);
        game.data.start_string = game.data.current_string;

        for (var i = 0; i < game.data.current_string.length; i++) {
            lever = me.pool.pull("InteractEntity", 400 + 140 * i, groundY, game.getVigenereLever(i, -1), game.getVigenereLever(i, 1));
            me.game.world.addChild(lever);
        }

        game.lever_list.push(lever);
        game.signText = new game.Textbox.Container(800, 100, "Atbash has a nice symmetric quality to it");
        me.game.world.addChild(game.signText);

        game.cipher_text = new game.cipher.Container(750, 650);
        me.game.world.addChild(game.cipher_text);
	game.exit = me.pool.pull("ExitEntity", 1300, groundY-70);
	me.game.world.addChild(game.exit);
	break;
    }
};

game.getVigenereLever = function (j, n) {
    return function () {
        var result = '';
        for (var i = 0; i < game.data.current_string.length; i++) {
            if (i == j) {
                result += addToChar(game.data.current_string[i], n);
            } else {
                result += game.data.current_string[i];
            }
        }

        game.data.current_string = result;
    };
};

game.getCaesarLever = function (i) {
    return function () {
        game.data.current_string = caesarCipher(game.data.current_string, i);
    };
};

game.getRandomPassword = function () {
    return passwords[Math.floor(Math.random() * passwords.length)];
};

game.getNextLevel = function () {
    switch(game.level) {
    case "intro":
	game.level = "caesar";
	break;
    case "caesar":
	game.level = "atbash";
	break;
    case "atbash":
	game.level = "vigenere";
	break;
    case "vigenere":
	game.level = "vigenere";
	break;
    default:
	game.level = "caesar";
    }

    return game.level;
};
