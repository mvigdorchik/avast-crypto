/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // max walking & jumping speed
        this.body.setMaxVelocity(10, 15);
        this.body.setFriction(5, 0);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7]);

        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand", [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");
    },


    /**
     * update the entity
     */
    update: function (dt) {

	this.try_interact_one = me.input.isKeyPressed('interact_one');
	this.try_interact_two = me.input.isKeyPressed('interact_two');

        if (me.input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed('right')) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.body.force.x = 0;
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('jump')) {

            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y
            }
        } else {
            this.body.force.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision: function (response, other) {
        // Make all other objects solid
	if (response.b.name === "lever")
	{
	    // Frame delay to ensure switch doesnt snap right back
	    if (this.frame_delay > 0)
		this.frame_delay++;
	    if (this.try_interact_one) {
		response.b.interactActionOne();
		response.b.renderable.setCurrentAnimation("left");
		this.frame_delay = 1;
	    }
	    else if (this.try_interact_two) {
		response.b.interactActionTwo();
		response.b.renderable.setCurrentAnimation("right");
		this.frame_delay = 1;
	    }
	    else if (this.frame_delay === 3)
	    {
		response.b.renderable.setCurrentAnimation("center");
		this.frame_delay = 0;
	    }
	    return false;
	}

	
        return true;
    }
});

game.InteractEntity = me.CollectableEntity.extend({

    /**
     * constructor
     */
    init: function (x, y, interactFunctionOne, interactFunctionTwo) {
        // call the constructor
	var updated_settings = {};
	updated_settings.image = "switch";
	updated_settings.width = 70;
	updated_settings.height = 70;
	updated_settings.framewidth = 70;
	updated_settings.x = x;
	updated_settings.y = y;
	updated_settings.z = 2;
	updated_settings.Visible = true;
        this._super(me.CollectableEntity, 'init', [x, y, updated_settings]);

	this.name = "lever";
	this.interactActionOne = interactFunctionOne;
	this.interactActionTwo = interactFunctionTwo;


        this.renderable.addAnimation("center", [0]);
        this.renderable.addAnimation("right", [1]);
        this.renderable.addAnimation("left", [2]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("center");
    },


    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision: function (response, other) {
        // These are background objects so no need to adjust velocities
        return false;
    },

    // interactAction: function() {
    // 	game.data.current_string = atbashCipher(game.data.current_string);

    // 	return true;
    // }
});

game.ExitEntity = me.CollectableEntity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);

        this.name = "exit";

        this.settings = settings;

        this.renderable.addAnimation("closed", [0]);

        this.renderable.setCurrentAnimation("closed")
    },


    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision: function (response, other) {
        // These are background objects so no need to adjust velocities
        return false;
    },

});
