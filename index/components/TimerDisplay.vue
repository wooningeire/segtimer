<template>
	<time-display>
		{{timer.timeRemaining}}
	</time-display>
</template>

<script>
import {Timer} from "../timing.js";

export default {
	name: "timerdisplay",

	props: {
		timer: Timer,
	},

	mounted() {
		const updateTimeDisplay = now => {
			this.$el.textContent = this.timer.timeRemaining;
			requestAnimationFrame(updateTimeDisplay);
		};
		requestAnimationFrame(updateTimeDisplay);
	},
};
</script>