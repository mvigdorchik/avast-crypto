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
        this.cipher = new game.cipher.Container(710, 535);
        me.game.world.addChild(this.cipher);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the cipher from the game world
        me.game.world.removeChild(this.cipher);
    }
});
