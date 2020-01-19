game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // load a level
        me.levelDirector.loadLevel("level_1")

        // Add our cipher to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        // Position x and y need to be negative integers relative to bottom right
        this.cipher = new game.cipher.Container(750, 650);
        me.game.world.addChild(this.cipher);

	this.spawnEntities("caesar");
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the cipher from the game world
        me.game.world.removeChild(this.cipher);
    },

    "spawnEntities": function(level_type) {
	var groundY = 700;

	if(level_type === "caesar") {
	    console.log("entities spawned");
	    var lever = me.pool.pull("InteractEntity", 400, groundY, game.getCaesarLever(2));
	    me.game.world.addChild(lever);
	}
    }
});

game.getVigenereLever = function(i) {
    return function() {
	game.data.current_string[i] = addToChar(game.data.curent_string[i], 1);
    };
};

game.getCaesarLever = function(i) {
    return function() {
	game.data.current_string = caesarCipher(game.data.current_string, i);
    };
};
