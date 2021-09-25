<template>
	<main>
		<segments-list>
			<SegmentDisplay v-for="segmentDescriptor of segmentDescriptors" :key="segmentDescriptor.key"
					:segmentDescriptor="segmentDescriptor"
					:currentSegment="currentSegment"
					:segmentProgress="segmentProgress"
					:timer="timer" />
		</segments-list>

		<div>
			<button @click="createSegment">Create segment</button>
			<button @click="startTimer">Start timer</button>
			<button @click="pauseTimer">Pause timer</button>
			
			<TimerDisplay :timer="timer" />
		</div>
	</main>
</template>

<script>
import SegmentDisplay from "./components/SegmentDisplay.vue";
import TimerDisplay from "./components/TimerDisplay.vue";
import {TimerSegment, Timer} from "./timing.js";

export default {
	name: "root",

	data: () => ({
		segmentDescriptors: [],
		segmentIdNext: 0,

		currentSegment: null,
		segmentProgress: 0,
		
		timer: new Timer(),
	}),

	methods: {
		createSegment() {
			this.segmentDescriptors.push({key: this.segmentIdNext, segment: new TimerSegment()});
			this.segmentIdNext++;
		},

		startTimer() {
			this.timer.duration = this.durationTotal;
			this.timer.segmentEnds = this.segmentDescriptors.reduce((offsets, {segment}, i) => offsets.concat((offsets[i - 1] ?? 0) + segment.duration), []);

			this.timer.start({
				onIter: () => {
					this.currentSegment = this.segmentDescriptors[this.timer.segmentIndex].segment;
					this.segmentProgress = this.timer.segmentProgress;
				},
				onFinish: () => console.log("done"),
			});
		},

		pauseTimer() {
			this.timer?.pause();
		},
	},

	computed: {
		durationTotal() {
			return this.segmentDescriptors.reduce((cumsum, {segment}) => cumsum + segment.duration, 0);
		},
	},

	components: {
		SegmentDisplay,
		TimerDisplay,
	},
};
</script>

<style scoped>
main {
	display: grid;
	grid-template-columns: 1fr 16em;
}

segmentDescriptors-list {
	display: flex;
	flex-flow: column;
}
</style>