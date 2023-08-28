<!-- 吊死鬼 -->
<template>
	<div id="Ghangman">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="280px"
			viewBox="0 0 350 275" preserveAspectRatio="xMidYMid meet">
			<line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 1" x1="100" y1="257" x2="100" y2="40"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 2" x1="100" y1="40" x2="230" y2="40"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 3" x1="100" y1="80" x2="130" y2="40"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 4" x1="230" y1="40" x2="230" y2="80"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<circle v-if="strikes > 5" cx="230" cy="90" style="fill:khaki;stroke:black;stroke-width:2px;" r="20" />
			<line v-if="strikes > 6" x1="230" y1="110" x2="230" y2="170"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 7" x1="230" y1="140" x2="250" y2="120"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 8" x1="230" y1="140" x2="210" y2="120"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 9" x1="230" y1="170" x2="250" y2="200"
				style="stroke:black;fill:none;stroke-width:2px;" />
			<line v-if="strikes > 10" x1="230" y1="170" x2="210" y2="200"
				style="stroke:black;fill:none;stroke-width:2px;" />
		</svg>
		<br />
		<el-button type="primary">第 {{turn}} 轮</el-button>
		<div>
			<div class="letter" v-for="letter in wordDisplayLetters">
				{{letter}}
			</div>
		</div>
		<template v-if="initialized">
			<div>
				<div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)"
					v-for="letter in possibleLetters1">
					{{letter}}
				</div>
			</div>
			<div>
				<div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)"
					v-for="letter in possibleLetters2">
					{{letter}}
				</div>
			</div>
			<div>
				<div @click="tryLetter(letter)" class="possibleLetter" :class="getStrikethroughClass(letter)"
					v-for="letter in possibleLetters3">
					{{letter}}
				</div>
			</div>
		</template>
		<el-button type="primary">当前得分：{{score}}</el-button>
		<el-button @click="initialize()" type="primary">重新开始</el-button>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		mounted() {
			let _this = this;
			document.onkeydown = function(e) {
				let key = window.event.keyCode;
				if (key >= 65 && key <= 90) {
					_this.tryLetter(String.fromCharCode(key).toLocaleLowerCase());
				}
			};
		},
		data: function() {
			return {
				strikes: 12,
				word: "HANGMAN",
				wordLetters: ['H', 'A', 'N', 'G', 'M', 'A', 'N'],
				wordDisplayLetters: ['H', 'A', 'N', 'G', 'M', 'A', 'N'],
				usedLetters: [],
				possibleLetters1: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
				possibleLetters2: ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
				possibleLetters3: ["u", "v", "w", "x", "y", "z"],
				initialized: false,
				turn: 1,
				score: 0,
				gameOn: true,
				wordBank:
					// [
					// 	"accumulate", "battery", "civilization", "desperate", "emergency",
					// 	"flexible", "gesture", "horrible", "influence", "jungle",
					// 	"knowledge", "lure", "magnify", "nominate", "organ",
					// 	"perceive", "quote", "rational", "semester", "theoretical",
					// 	"utmost", "various", "whisper", "youth", "zone",
					// ]
					[
						"abundance", "accessory", "accumulate",
						"bargain", "battery", "beforehand",
						"circumference", "civilization", "classification",
						"deprive", "desperate", "diagnose",
						"emergency", "empirical", "engagement",
						"financial", "flexible", "fluctuate",
						"gesture", "glitter", "government",
						"hire", "honest", "horrible",
						"influence", "inject", "inspire",
						"judge", "jungle", "justify",
						"kidney", "kneel", "knowledge",
						"logic", "lunar", "lure",
						"magazine", "magnet", "magnify",
						"noble", "nominate", "nourish",
						"offspring", "opera", "organ",
						"pearl", "penalty", "perceive",
						"question", "quiz", "quote",
						"race", "random", "rational",
						"semester", "servant", "simultaneous",
						"tempt", "theoretical", "tobacco",
						"urgent", "utilize", "utmost",
						"valley", "various", "velocity",
						"weird", "whisper", "withdraw",
						"xman", "xray", "xyz",
						"yard", "youth", "yield",
						"zip", "zone", "zeal",
					]
			}
		},
		methods: {
			initialize() {
				this.initialized = true;
				this.strikes = 0;
				this.word = this.getRandomWord();
				this.wordLetters = this.word.split('');
				this.wordDisplayLetters = Array(this.word.length);
				this.usedLetters = [];
				if (this.wordBank.length === 0) {
					this.safe();
				}
			},
			getRandomWord() {
				let index = Math.random() * (this.wordBank.length - 0);
				index = Math.floor(index);

				let word = this.wordBank[index];
				this.wordBank.splice(index, 1); // remove the word so it won't be repeated
				return word;
			},
			tryLetter(letter) {
				if (this.usedLetters.includes(letter)) {
					return;
				}
				this.usedLetters.push(letter)
				let match = false;
				for (let i = 0; i < this.wordDisplayLetters.length; i++) {
					if (letter === this.wordLetters[i]) {
						this.wordDisplayLetters.splice(i, 1, letter);
						match = true;
					}
				}
				if (!match) {
					this.strikes++;
					this.score--;
				}
				if (this.strikes === 12) {
					this.gameOver();
				}
				if (this.wordLetters.join('') === this.wordDisplayLetters.join('')) {
					this.score += this.word.length;
					this.turn += 1;
					this.next();
				}
			},
			getStrikethroughClass(letter) {
				if (this.usedLetters.includes(letter)) {
					return 'diagonal-strike';
				}
				return null;
			},
			next() {
				this.$alert("你猜中了，单词是" + this.word + "，当前得分：" + this.score, "猜对了", {
					confirmButtonText: "继续",
					callback: action => {
						this.initialize();
					}
				});
			},
			gameOver() {
				this.$alert("你猜错了，单词是" + this.word + "最终得分：" + this.score, "猜错了", {
					confirmButtonText: "重来",
					callback: action => {
						this.turn = 1;
						this.score = 0;
						this.initialize();
					}
				});
			},
			safe() {
				this.$alert("最终得分：" + this.score + "猜对单词数：" + (this.turn - 1), "成功解救了吊死鬼", {
					confirmButtonText: "胜利",
					callback: action => {
						this.reload();
					}
				});
			}
		}
	}
</script>

<style scoped>
	#Ghangman {
		text-align: center;
		color: #00efbf;
		background: #fcf4ff;
		position: relative;
		overflow: hidden;
		width: 100%;
		height: calc(100vh - 80px);
	}

	.letter {
		display: inline-block;
		border-bottom: 1px solid;
		margin: 0px 3px 0px 3px;
		font-size: 30px;
		min-width: 30px;
		vertical-align: bottom;
	}

	.possibleLetter {
		display: inline-block;
		margin: 10px 3px 0px 3px;
		font-size: 30px;
		min-width: 30px;
		cursor: pointer;
	}

	.diagonal-strike {
		background: linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, currentColor 50.5%, transparent 52.25%);
		color: dimgrey;
	}

	button {
		margin-top: 20px;
		padding: 6px 12px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 15px;
	}

	button:hover {
		background-color: #aaaaff;
		border-color: #adadad;
	}
</style>
