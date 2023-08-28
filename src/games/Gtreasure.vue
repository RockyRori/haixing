<!-- 喜从天降 -->
<template>
	<div id="Gtreasure">
		<canvas id="caishen"></canvas>
		<div class="container" v-if="gameOver">
			<div class="dialog">
				<p class="once-again">本轮分数：{{score}}分</p>
				<p class="once-again">真好玩！</p>
				<p class="once-again">再来一次~~</p>
				<el-button class="once-again-btn" @click="reload">开始</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	const TreasureNames = [
		"yuanbao",
		"tongqian",
		"jintiao",
		"hongshuijing",
		"lanzuanshi",
		"fudai"
	];
	let animationId = null;
	let countDownInit = 0;
	const MaxNum = 5;
	export default {
		inject: ['reload'],
		name: "CaiShen",
		data() {
			return {
				score: 0,
				ctx: null,
				caishenImg: null,
				clientWidth: 0,
				clientHeight: 0,
				channelWidth: 0,
				caishen: {
					x: 0,
					y: 0,
					speed: 8,
					dx: 0
				},
				progress: 0,
				countDown: 30,
				timeTag: Date.now(),
				timeTag2: Date.now(),
				treasureArr: [],
				gameOver: false,
				treasureObj: {
					tongqian: {
						score: 2,
						src: null
					},
					fudai: {
						score: 5,
						src: null
					},
					jintiao: {
						score: 10,
						src: null
					},
					yuanbao: {
						score: 16,
						src: null
					},
					hongshuijing: {
						score: 20,
						src: null
					},
					lanzuanshi: {
						score: 28,
						src: null
					}
				}
			};
		},
		mounted() {
			let canvas = document.getElementById('caishen');
			canvas.width = window.innerWidth * 0.65;
			canvas.height = window.innerHeight * 0.85;
			let _this = this;
			let container = document.getElementById("caishen");
			_this.ctx = container.getContext("2d");
			_this.clientWidth = container.width;
			_this.clientHeight = container.height;
			_this.channelWidth = Math.floor(_this.clientWidth / 5);
			_this.caishenImg = new Image();
			_this.caishenImg.src = require("@/assets/img/caishen/caishen.png");

			_this.initTreasures();
			countDownInit = _this.countDown;
			_this.caishen.x = _this.clientWidth / 2 - 60;
			_this.caishen.y = _this.clientHeight - 120;
			document.onkeydown = function(e) {
				let key = window.event.keyCode;
				switch (key) {
					case 13:
						_this.reload();
						break;
					case 37:
						_this.caishen.dx = -_this.caishen.speed;
						break;
					case 39:
						_this.caishen.dx = _this.caishen.speed;
						break;
				}
			};
			document.onkeyup = function(e) {
				_this.caishen.dx = 0;
			};
			_this.caishenImg.onload = function() {
				(function animloop() {
					_this.ctx.clearRect(0, 0, _this.clientWidth, _this.clientHeight);
					_this.loop();
					animationId = window.requestAnimationFrame(animloop);
					if (_this.countDown === 0) {
						_this.gameOver = true;
						window.cancelAnimationFrame(animationId);
					}
					if (Date.now() - _this.timeTag >= 1000) {
						_this.countDown--;
						_this.timeTag = Date.now();
					}
				})();
			};
		},
		methods: {
			initTreasures() {
				let _this = this;
				Object.keys(_this.treasureObj).forEach(key => {
					_this.treasureObj[key].src = new Image();
					_this.treasureObj[
						key
					].src.src = require(`@/assets/img/caishen/${key}.png`);
				});
				for (let i = 0; i < MaxNum; i++) {
					let random = Math.floor(Math.random() * TreasureNames.length);
					_this.treasureArr.push({
						x: _this.channelWidth * (1 / 2 + i) - 30,
						y: _this.getRandomArbitrary(0, 20),
						name: TreasureNames[random],
						speed: _this.getRandomArbitrary(2, 4)
					});
				}
			},
			loop() {
				let _this = this;
				_this.drawCountDown();
				_this.drawCaishen();
				_this.moveCaishen();
				_this.generateTreasure();
				_this.drawTreasure();
				_this.drawScore();
			},
			drawCaishen() {
				let _this = this;
				_this.ctx.save();
				_this.ctx.drawImage(
					_this.caishenImg,
					_this.caishen.x,
					_this.caishen.y,
					120,
					120
				);
				_this.ctx.restore();
			},
			moveCaishen() {
				this.caishen.x += this.caishen.dx;
				if (this.caishen.x > this.clientWidth - 120) {
					this.caishen.x = this.clientWidth - 120;
				} else if (this.caishen.x < 0) {
					this.caishen.x = 0;
				}
			},
			drawScore() {
				let _this = this;
				_this.ctx.beginPath();
				_this.ctx.fillStyle = "#fff";
				_this.ctx.textAlign = "center";
				_this.ctx.textBaseline = "middle";
				_this.ctx.fillText(_this.score + "分", 30, _this.clientHeight - 10);
				_this.ctx.closePath();
			},
			drawCountDown() {
				// 画进度环
				let _this = this;
				_this.progress += Date.now() - _this.timeTag2;
				_this.timeTag2 = Date.now();
				_this.ctx.beginPath();
				_this.ctx.moveTo(50, 50);
				_this.ctx.arc(
					50,
					50,
					40,
					Math.PI * 1.5,
					Math.PI * (1.5 + 2 * (_this.progress / (countDownInit * 1000))),
					false
				);
				_this.ctx.closePath();
				_this.ctx.fillStyle = "yellow";
				_this.ctx.fill();

				// 画内填充圆
				_this.ctx.beginPath();
				_this.ctx.arc(50, 50, 30, 0, Math.PI * 2);
				_this.ctx.closePath();
				_this.ctx.fillStyle = "#fff";
				_this.ctx.fill();

				// 填充文字
				_this.ctx.font = "bold 16px Microsoft YaHei";
				_this.ctx.fillStyle = "#333";
				_this.ctx.textAlign = "center";
				_this.ctx.textBaseline = "middle";
				_this.ctx.moveTo(50, 50);
				_this.ctx.fillText(_this.countDown + "s", 50, 50);
			},
			filterTreasure(item) {
				let _this = this;
				if (
					item.x <= _this.caishen.x + 110 &&
					item.x >= _this.caishen.x &&
					item.y > _this.caishen.y
				) {
					// 判断和财神的触碰范围
					_this.score += _this.treasureObj[item.name].score;
					return false;
				}
				if (item.y >= _this.clientHeight) {
					return false;
				}
				return true;
			},
			drawTreasure() {
				let _this = this;
				_this.treasureArr = _this.treasureArr.filter(_this.filterTreasure);
				_this.treasureArr.forEach(item => {
					_this.ctx.drawImage(
						_this.treasureObj[item.name].src,
						item.x,
						item.y,
						60,
						60
					);
					item.y += item.speed;
				});
			},
			getRandomArbitrary(min, max) {
				return Math.random() * (max - min) + min;
			},
			generateTreasure() {
				let _this = this;
				if (_this.treasureArr.length < MaxNum) {
					let random = Math.floor(Math.random() * TreasureNames.length);
					let channel = _this.getRandomArbitrary(1, 5);
					_this.treasureArr.push({
						x: _this.channelWidth * (1 / 2 + (channel - 1)) - 30,
						y: 0,
						name: TreasureNames[random],
						speed: _this.getRandomArbitrary(2, 4)
					});
				}
			}
		}
	};
</script>

<style scoped>
	#Gtreasure {
		width: 100%;
		height: calc(100vh - 80px);
		background: repeating-linear-gradient(to top, rgba(255, 0, 0, 0.4), rgba(255, 170, 0, 0.6));
	}

	#caishen {
		background-image: url("../assets/img/caishen/tittle.png");
	}

	.container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
		text-align: center;
		font-size: 0;
		white-space: nowrap;
		overflow: auto;
	}

	.container:after {
		content: "";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.dialog {
		width: 400px;
		height: 300px;
		background: rgba(255, 255, 255, 0.5);
		box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
		display: inline-block;
		vertical-align: middle;
		text-align: left;
		font-size: 28px;
		color: #fff;
		font-weight: 600;
		border-radius: 10px;
		white-space: normal;
		text-align: center;
	}
</style>
