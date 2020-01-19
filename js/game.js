/* Game namespace */
var game = {

    // an object where to store game information
    data: {
        start_string: "QBTTXPSE",

        current_string: "QBTTXPSE",

        goal_string: "Hello",

        key_string: "secret",

        padding: 0,
	rsa_public: [1, 2], //First element is n, second is e
	difficulty: 0,

	rsa_cipher : 2,
	rsa_d: 2,
	rsa_pq_primes: [1,1],
	rsa_pq_disp: [2,2],
	rsa_p: 2,
	rsa_q: 2,
	rsa_n: 4,
	rsa_result: 3,
	rsa_goal_n : 5,
	rsa_goal_result : -1
    },


    // Run on page load.
    "onload": function () {
        // Initialize the video.
        if (!me.video.init(1400, 1050, { wrapper: "screen", scale: "flex-width" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded": function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.MENU, new game.TitleScreen());

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        me.state.set(me.state.USER, new game.Transition());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("InteractEntity", game.InteractEntity);
        me.pool.register("ExitEntity", game.ExitEntity);
        me.pool.register("SignEntity", game.SignEntity);
        me.pool.register("Sign2Entity", game.Sign2Entity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");

        // map X, Up Arrow and Space for jump
        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

        me.input.bindKey(me.input.KEY.F, "interact_one", true);
        me.input.bindKey(me.input.KEY.G, "interact_two", true);

        // display the menu title
        me.state.change(me.state.MENU);
    }

};
