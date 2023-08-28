<!-- 单词拼写大战 -->
<template>
	<div id="Gspelling">
		<canvas id="type"></canvas>
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
	const _MAX_TARGET = 3; // 画面中一次最多出现的目标
	const _TARGET_CONFIG = {
		// 靶子的固定参数
		speed: 0.4,
		radius: 28
	};
	const _DICTIONARY = [
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
	];
	export default {
		inject: ['reload'],
		name: "TypeGame",
		data() {
			return {
				basespeed: 0.05,
				ctx: null,
				clientWidth: 0,
				clientHeight: 0,
				bulletArr: [], // 屏幕中的子弹
				targetArr: [], // 存放当前目标
				targetImg: null,
				planeImg: null,
				currentIndex: -1,
				wordsPool: [],
				score: 0,
				gameOver: false,
			};
		},
		mounted() {
			let canvas = document.getElementById('type');
			canvas.width = window.innerWidth * 0.65;
			canvas.height = window.innerHeight * 0.85;
			let _this = this;
			_this.wordsPool = _DICTIONARY.concat([]);
			let container = document.getElementById("type");
			_this.clientWidth = container.width;
			_this.clientHeight = container.height;
			_this.ctx = container.getContext("2d");
			_this.targetImg = new Image();
			_this.targetImg.src = require("@/assets/img/thunder/target.png");

			_this.planeImg = new Image();
			_this.planeImg.src = require("@/assets/img/thunder/plane.png");

			document.onkeydown = function(e) {
				let key = window.event.keyCode;
				if (key >= 65 && key <= 90) {
					_this.handleKeyPress(String.fromCharCode(key).toLowerCase());
				}
				if (key === 13) {
					_this.reload();
				}
			};

			_this.targetImg.onload = function() {
				_this.generateTarget();
				(function animloop() {
					if (!_this.gameOver) {
						_this.drawAll();
					} else {
						// _this.drawGameOver();
					}
					window.requestAnimationFrame(animloop);
				})();
			};
		},
		methods: {
			drawGameOver() {
				let _this = this;
				//保存上下文对象的状态
				_this.ctx.save();
				_this.ctx.font = "36px Arial";
				_this.ctx.strokeStyle = _this.colors[0];
				_this.ctx.lineWidth = 2;
				//光晕
				_this.ctx.shadowColor = "#FFFFE0";
				let txt = "游戏结束，得分：" + _this.score;
				let width = _this.ctx.measureText(txt).width;
				for (let i = 60; i > 3; i -= 2) {
					_this.ctx.shadowBlur = i;
					_this.ctx.strokeText(txt, _this.clientWidth / 2 - width / 2, 300);
				}
				_this.ctx.restore();
				_this.colors.reverse();
			},
			drawAll() {
				let _this = this;
				_this.ctx.clearRect(0, 0, _this.clientWidth, _this.clientHeight);
				_this.drawPlane(0);
				_this.drawBullet();
				_this.drawTarget();
				_this.drawScore();
			},
			drawPlane() {
				let _this = this;
				_this.ctx.save();
				_this.ctx.drawImage(
					_this.planeImg,
					_this.clientWidth / 2 - 20,
					_this.clientHeight - 20 - 40,
					100,
					100
				);
				_this.ctx.restore();
			},
			generateWord(number) {
				// 从池子里随机挑选一个词，不与已显示的词重复
				let arr = [];
				for (let i = 0; i < number; i++) {
					let random = Math.floor(Math.random() * this.wordsPool.length);
					arr.push(this.wordsPool[random]);
					this.wordsPool.splice(random, 1);
				}
				return arr;
			},
			generateTarget() {
				// 随机生成目标
				let _this = this;
				let length = _this.targetArr.length;
				//加速
				_this.basespeed += 0.1;
				if (length < _MAX_TARGET) {
					let txtArr = _this.generateWord(_MAX_TARGET - length);
					for (let i = 0; i < _MAX_TARGET - length; i++) {
						_this.targetArr.push({
							x: _this.getRandomInt(
								_TARGET_CONFIG.radius,
								_this.clientWidth - _TARGET_CONFIG.radius
							),
							y: _TARGET_CONFIG.radius * 2,
							txt: txtArr[i],
							typeIndex: -1,
							hitIndex: -1,
							dx: (_TARGET_CONFIG.speed * Math.random().toFixed(1)),
							dy: (_TARGET_CONFIG.speed * Math.random().toFixed(1) + _this.basespeed),

							rotate: 0
						});
					}
				}
			},
			getRandomInt(n, m) {
				return Math.floor(Math.random() * (m - n + 1)) + n;
			},
			drawText(txt, x, y, color) {
				let _this = this;
				_this.ctx.fillStyle = color;
				_this.ctx.fillText(txt, x, y);
			},
			drawScore() {
				// 分数
				this.drawText("分数：" + this.score, 10, this.clientHeight - 10, "#55aaff");
			},
			drawTarget() {
				// 逐帧画目标
				let _this = this;
				_this.targetArr.forEach((item, index) => {
					_this.ctx.save();
					_this.ctx.translate(item.x, item.y); //设置旋转的中心点
					_this.ctx.beginPath();
					_this.ctx.font = "14px Arial";
					if (
						index === _this.currentIndex ||
						item.typeIndex === item.txt.length - 1
					) {
						_this.drawText(
							item.txt.substring(0, item.typeIndex + 1),
							-item.txt.length * 3,
							_TARGET_CONFIG.radius * 2,
							"gray"
						);
						let width = _this.ctx.measureText(
							item.txt.substring(0, item.typeIndex + 1)
						).width; // 获取已敲击文字宽度
						_this.drawText(
							item.txt.substring(item.typeIndex + 1, item.txt.length),
							-item.txt.length * 3 + width,
							_TARGET_CONFIG.radius * 2,
							"#15ffdc"
						);
					} else {
						_this.drawText(
							item.txt,
							-item.txt.length * 3,
							_TARGET_CONFIG.radius * 2,
							"#55ff7f"
						);
					}

					_this.ctx.closePath();
					_this.ctx.rotate((item.rotate * Math.PI) / 180);
					_this.ctx.drawImage(
						_this.targetImg,
						-1 * _TARGET_CONFIG.radius,
						-1 * _TARGET_CONFIG.radius,
						_TARGET_CONFIG.radius * 2,
						_TARGET_CONFIG.radius * 2
					);
					_this.ctx.restore();
					item.y += item.dy;
					item.x += item.dx;
					if (item.x < 0 || item.x > _this.clientWidth) {
						item.dx *= -1;
					}
					if (item.y > _this.clientHeight - _TARGET_CONFIG.radius * 2) {
						// 碰到底部了
						_this.gameOver = true;
					}
					// 旋转
					item.rotate++;
				});
			},
			handleKeyPress(key) {
				// 键盘按下,判断当前目标
				let _this = this;
				if (_this.currentIndex === -1) {
					// 当前没有在射击的目标
					let index = _this.targetArr.findIndex(item => {
						return item.txt.indexOf(key) === 0;
					});
					if (index !== -1) {
						_this.currentIndex = index;
						_this.targetArr[index].typeIndex = 0;
						_this.createBullet(index);
					}
				} else {
					// 已有目标正在被射击
					if (
						key ===
						_this.targetArr[_this.currentIndex].txt.split("")[
							_this.targetArr[_this.currentIndex].typeIndex + 1
						]
					) {
						// 获取到目标对象
						_this.targetArr[_this.currentIndex].typeIndex++;
						_this.createBullet(_this.currentIndex);

						if (
							_this.targetArr[_this.currentIndex].typeIndex ===
							_this.targetArr[_this.currentIndex].txt.length - 1
						) {
							// 这个目标已经别射击完毕
							_this.currentIndex = -1;
						}
					}
				}
			},
			// 发射一个子弹
			createBullet(index) {
				let _this = this;
				this.bulletArr.push({
					dx: 1,
					dy: 4,
					x: _this.clientWidth / 2,
					y: _this.clientHeight - 60,
					targetIndex: index
				});
			},
			firedTarget(item) {
				// 判断是否击中目标
				let _this = this;
				if (
					item.x > _this.targetArr[item.targetIndex].x - _TARGET_CONFIG.radius &&
					item.x < _this.targetArr[item.targetIndex].x + _TARGET_CONFIG.radius &&
					item.y > _this.targetArr[item.targetIndex].y - _TARGET_CONFIG.radius &&
					item.y < _this.targetArr[item.targetIndex].y + _TARGET_CONFIG.radius
				) {
					// 子弹击中了目标
					let arrIndex = item.targetIndex;
					_this.targetArr[arrIndex].hitIndex++;
					if (
						_this.targetArr[arrIndex].txt.length - 1 ===
						_this.targetArr[arrIndex].hitIndex
					) {
						// 所有子弹全部击中了目标
						let word = _this.targetArr[arrIndex].txt;
						_this.targetArr[arrIndex] = {
							// 生成新的目标
							x: _this.getRandomInt(
								_TARGET_CONFIG.radius,
								_this.clientWidth - _TARGET_CONFIG.radius
							),
							y: _TARGET_CONFIG.radius * 2,
							txt: _this.generateWord(1)[0],
							typeIndex: -1,
							hitIndex: -1,
							dx: (_TARGET_CONFIG.speed * Math.random().toFixed(1)) / 2,
							dy: _TARGET_CONFIG.speed * Math.random().toFixed(1),
							rotate: 0
						};
						_this.wordsPool.push(word); // 被击中的目标词重回池子里
						_this.score++;
					}
					return false;
				} else {
					return true;
				}
			},
			drawBullet() {
				// 逐帧画子弹
				let _this = this;
				// 判断子弹是否已经击中目标
				if (_this.bulletArr.length === 0) {
					return;
				}
				_this.bulletArr = _this.bulletArr.filter(_this.firedTarget);
				_this.bulletArr.forEach(item => {
					let targetX = _this.targetArr[item.targetIndex].x;
					let targetY = _this.targetArr[item.targetIndex].y;
					let k =
						(_this.clientHeight - 60 - targetY) /
						(_this.clientWidth / 2 - targetX); // 飞机头和目标的斜率
					let b = targetY - k * targetX; // 常量b
					item.y = item.y - 4; // y轴偏移一个单位
					item.x = (item.y - b) / k;
					for (let i = 0; i < 15; i++) {
						// 画出拖尾效果
						_this.ctx.beginPath();
						_this.ctx.arc(
							(item.y + i * 1.8 - b) / k,
							item.y + i * 1.8,
							4 - 0.2 * i,
							0,
							2 * Math.PI
						);
						_this.ctx.fillStyle = `rgba(193,255,255,${1 - 0.08 * i})`;
						_this.ctx.fill();
						_this.ctx.closePath();
					}
				});
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#Gspelling {
		width: 100%;
		height: calc(100vh - 80px);
		/* background: rgba(255, 255, 127, 0.3); */
		background-image: url('../assets/backgrounds/极光.jpg');
		background-size: 100% 100%;
	}

	#type {}

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

	.once-again-btn {
		background: #1f9a9a;
		border: none;
		color: #fff;
	}
</style>
