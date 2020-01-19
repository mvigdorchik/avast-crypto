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

        this.try_interact = me.input.isKeyPressed('interact');

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
        if (response.b.name === "lever") {
            if (this.try_interact) {
                response.b.interactAction();
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
    init: function (x, y, settings) {
        // call the constructor
	var updated_settings = settings;
	updated_settings.image = "switchLeft";
	updated_settings.width = 70;
	updated_settings.height = 70;
	updated_settings.framewidth = 70;
	updated_settings.x = x;
	updated_settings.y = y;
	updated_settings.z = 2;
	updated_settings.Visible = true;
	console.log(settings);
        this._super(me.CollectableEntity, 'init', [x, y, updated_settings]);

        this.name = "lever";

        this.settings = settings;
    },


    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision: function (response, other) {
        // These are background objects so no need to adjust velocities
        return false;
    },

    interactAction: function () {
        console.log(atbashCipher(game.data.current_string));
        game.data.current_string = atbashCipher(game.data.current_string);

        return true;
    }
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
