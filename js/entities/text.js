
game.Textbox = game.Textbox || {};

game.Textbox.Container = me.Container.extend({

    init: function (x, y, content, active) {
        this._super(me.Container, 'init');
        this.isPersistent = true;
        this.floating = true;
        this.name = "Textbox";
        this.addChild(new game.Textbox.text(x, y, content));
        this.text = this.getChildByName("text")[0];
        this.text.alpha = 0.0; // Set invisible initially
    },
    setVisible: function () {
        this.text.alpha = 1.0;
    },
    setInvisible: function () {
        this.text.alpha = 0.0;
    }
});

game.Textbox.text = me.Renderable.extend({
    init: function (x, y, content) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
        this.font.textAlign = "left";
        this.font.textBaseline = "bottom";
        this.text = content;
        this.name = "text";
    },
    draw: function (renderer) {
        // this.pos.x, this.pos.y are the relative position from the top left
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y);
    },
});