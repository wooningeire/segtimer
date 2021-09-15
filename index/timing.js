export class TimerSegment {
	duration;
	label;

	constructor(duration=1000, label="") {
		this.duration = duration;
		this.label = label;
	}
}

// probably should not be a class
export class Timer {
	absoluteTimeAtLastStart = 0;
	timeElapsedAtLastPause = 0;
	
	duration;
	segmentEnds = [];
	segmentIndex = 0;

	active = false;

	constructor(duration) {
		this.duration = duration;
	}

	start(onFinish) {
		this.absoluteTimeAtLastStart = Date.now();

		this.active = true;

		const timeoutCallback = () => {
			if (!this.active) return;

			while (this.timeElapsedIfActive > this.segmentEnds[this.segmentIndex]) {
				this.segmentIndex++;
			}

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