export class TimerSegment {
	duration;
	label;

	constructor(duration=0, label="") {
		this.duration = duration;
		this.label = label;
	}
}

export class Timer {
	absoluteTimeAtLastStart = 0;
	timeElapsedAtLastPause = 0;
	
	duration;

	active = false;

	constructor(duration) {
		this.duration = duration;
	}

	start(onFinish) {
		this.absoluteTimeAtLastStart = Date.now();

		this.active = true;

		const timeoutCallback = () => {
			if (!this.active) return;

			if (this.timeElapsedIfActive >= this.duration) {
				this.active = false;
				this.timeElapsedAtLastPause = 0;
				onFinish();
			} else {
				setTimeout(timeoutCallback);
			}
		};

		setTimeout(timeoutCallback);
	}

	pause() {
		this.active = false;
		this.timeElapsedAtLastPause = this.timeElapsedIfActive;
	}

	get timeElapsedIfActive() {
		return this.timeElapsedAtLastPause + Date.now() - this.absoluteTimeAtLastStart;
	}

	get timeElapsed() {
		return Math.min(this.duration, this.active ? this.timeElapsedIfActive : this.timeElapsedAtLastPause);
	}

	get timeRemaining() {
		return this.duration - this.timeElapsed;
	}
}