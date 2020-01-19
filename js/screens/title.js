game.TitleScreen = me.ScreenObject.extend({
    /**
   * action to perform on state change
   */
    onResetEvent: function () {
        // title screen
        var backgroundImage = new me.Sprite(0, 0, {
            image: me.loader.getImage('title_screen'),
        }
        );

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

        // add to the world container
        me.game.world.addChild(backgroundImage, 1);

        // add a new renderable component with the text
        this.titleText = new game.titleText.Container(950, 200);
        me.game.world.addChild(this.titleText);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                me.audio.play("cling");
                me.state.change(me.state.PLAY);
            }
        });
    },

    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
        me.game.world.removeChild(this.titleText);
    }
});

game.titleText = game.titleText || {};

game.titleText.Container = me.Container.extend({

    init: function (x, y) {
        this._super(me.Container, 'init');
        this.isPersistent = true;
        this.floating = true;
        this.name = "titleText";
        this.addChild(new game.titleText.text(x, y));
    }
});

game.titleText.text = me.Renderable.extend({
    init: function (x, y) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";
        this.text = "WELCOME TO CRYPTO CASTLE"
    },
    draw: function (renderer) {
        // this.pos.x, this.pos.y are the relative position from the top left
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y);
    }

});