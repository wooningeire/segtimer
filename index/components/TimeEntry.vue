<template>
	<time-entry contenteditable>
		<numeral- class="min">00</numeral->
		<numeral- class="s">00</numeral->
		<numeral- class="ms">00</numeral->
	</time-entry>
</template>

<script>
export default {
	name: "timeentry",

	props: {
		modelValue: {
			type: Number,
			default: 0,		
		},
	},

	watch: {
		modelValue() {
			this.updateDisplay();
		},
	},

	methods: {
		updateDisplay() {
			const nMinutes = Math.floor(this.modelValue / 1000 / 60);
			const nSeconds = Math.floor(this.modelValue / 1000 % 60);
			const nMilliseconds = Math.floor(this.modelValue % 1000);

			this.$el.querySelector(".min").textContent = nMinutes.toString().padStart(2, "0");
			this.$el.querySelector(".s").textContent = nSeconds.toString().padStart(2, "0");
			this.$el.querySelector(".ms").textContent = nMilliseconds.toString().padStart(3, "0");
		},
	},

	mounted() {
		this.updateDisplay();
	},
};
</script>

<style scoped>
.ms {
	font-size: .5em;
}

.s::before {
	content: ":";
	opacity: .5;
}

.ms::before {
	content: ".";
	opacity: .5;
}
</style>