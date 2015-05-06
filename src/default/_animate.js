
	_animate: function (context,destX, destY, duration, easingFn) {
		var that = context,
			parent = this;
		this.startX = context.x;
		this.startY = context.y;
		this.destX = destX;
		this.destY = destY;
		this.duration = duration;
		this.startTime = utils.getTime();
		this.destTime = this.startTime + this.duration;

		this.step = function() {
			if(parent.cancel){
				return;
			}
			var now = utils.getTime(),
			newX, newY,
			easing;

			if ( now >= parent.destTime ) {
				this.isAnimating = false;
				that._translate(parent.destX, parent.destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - parent.startTime ) / parent.duration;
			easing = easingFn(now);
			newX = ( parent.destX - parent.startX ) * easing + parent.startX;
			newY = ( parent.destY - parent.startY ) * easing + parent.startY;
			that._translate(newX, newY);

			if ( parent.isAnimating ) {
				rAF(parent.step);
			}
		};

		this.isAnimating = true;
		this.cancel= false;
	},
