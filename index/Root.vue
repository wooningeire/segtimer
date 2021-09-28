<template>
	<main>
		<segments-list>
			<SegmentDisplay v-for="segmentDescriptor of segmentDescriptors" :key="segmentDescriptor.key"
					:segmentDescriptor="segmentDescriptor"
					:activeSegmentData="activeSegmentData"
					@remove="removeSegment" />
		</segments-list>

		<div>
			<button @click="createSegment">Create segment</button>
			<button @click="startTimer">Start timer</button>
			<button @click="pauseTimer">Pause timer</button>
			<button @click="stopTimer">Stop timer</button>
			
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

		activeSegmentData: {
			timerActive: false,
			segmentIndexes: null,
			segmentIndex: 0,
			timeElapsedInSegment: 0,
		},
		
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

			this.activeSegmentData.timerActive = true;
			this.activeSegmentData.segmentIndexes = new Map(this.segmentDescriptors.map(({key}, i) => [key, i]));

			this.timer.start({
				onIter: () => {
					// this.currentSegment = this.segmentDescriptors[this.timer.segmentIndex].segment;
					this.activeSegmentData.timeElapsedInSegment = this.timer.timeElapsedInSegment;
					this.activeSegmentData.segmentIndex = this.timer.segmentIndex;
					// this.segmentProgress = this.timer.segmentProgress;
				},
				onFinish: () => {
					this.activeSegmentData.timerActive = false;

					// this.currentSegment = null;
					this.activeSegmentData.timeElapsedInSegment = 0;
					this.activeSegmentData.segmentIndex = 0;
					// this.segmentProgress = 0;
				},
			});
		},

		pauseTimer() {
			this.timer?.pause();
		},

		stopTimer() {
			// todo implement onFinish
			this.timer?.stop();
		},

		removeSegment(segmentTarget) {
			this.segmentDescriptors.splice(this.segmentDescriptors.findIndex(({segment}) => segment === segmentTarget), 1);
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

segments-list {
	display: flex;
	flex-flow: column;
}
</style>