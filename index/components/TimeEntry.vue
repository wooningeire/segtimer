<template>
	<time-entry :contentEditable="!showArtificialValue">
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

		artificialValue: {
			type: Number,
			defualt: 0,
		},

		showArtificialValue: {
			type: Boolean,
			defualt: false,
		},
	},

	watch: {
		modelValue() {
			if (this.showArtificialValue) return;
			this.updateDisplay(this.modelValue);
		},

		artificialValue() {
			if (!this.showArtificialValue) return;
			this.updateDisplay(this.artificialValue);
		},

		showArtificialValue() {
			if (this.showArtificialValue) {
				this.updateDisplay(this.artificialValue);
			} else {
				this.updateDisplay(this.modelValue);
			}
		},
	},

	methods: {
		updateDisplay(value=this.modelValue) {
			const nMinutes = Math.floor(value / 1000 / 60);
			const nSeconds = Math.floor(value / 1000 % 60);
			const nMilliseconds = Math.floor(value % 1000);

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