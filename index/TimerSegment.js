export default class TimerSegment {
	duration;
	label;

	constructor(duration=0, label="") {
		this.duration = duration;
		this.label = label;
	}
}