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

	start({onIter, onFinish}) {
		this.absoluteTimeAtLastStart = Date.now();

		this.active = true;
		this.segmentIndex = 0;

		const timeoutCallback = () => {
			if (!this.active) return;

			while (this.timeElapsedIfActive > this.segmentEnds[this.segmentIndex]) {
				this.segmentIndex++;
			}

			if (this.timeElapsedIfActive >= this.duration) {
				this.stop();
				onFinish();
			} else {
				onIter();

				setTimeout(timeoutCallback);
			}
		};

		setTimeout(timeoutCallback);
	}

	pause() {
		this.active = false;
		this.timeElapsedAtLastPause = this.timeElapsedIfActive;
	}

	stop() {
		this.active = false;
		this.timeElapsedAtLastPause = 0;
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

	get timeElapsedInSegment() {
		const prevSegmentEnd = this.segmentEnds[this.segmentIndex - 1] ?? 0;
		return this.timeElapsedIfActive - prevSegmentEnd;
	}

	get segmentProgress() {
		const prevSegmentEnd = this.segmentEnds[this.segmentIndex - 1] ?? 0;

		const segmentDuration = this.segmentEnds[this.segmentIndex] - prevSegmentEnd;
		const timeElapsedInSegment = this.timeElapsedIfActive - prevSegmentEnd;
		return timeElapsedInSegment / segmentDuration;
	}
}