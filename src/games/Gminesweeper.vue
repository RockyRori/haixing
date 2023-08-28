<!-- 扫雷 -->
<template>
	<div id="Gminesweeper">
		<div class="main" v-if="showGame">
			<!-- 游戏区 -->
			<div class="game">
				<div v-for="col in cols" :key="Math.random() + col" class="game-row">
					<span v-for="row in rows" :key="Math.random() + row" class="game-block"
						:class="[lattice[(col - 1) * rows + row - 1].isOpen ? 'open' : 'rest', lattice[(col - 1) * rows + row - 1].isMark ? 'mark' : 'rest']"
						@click.left="handleClickLattice(lattice[(col - 1) * rows + row - 1])"
						@click.right.prevent="handleSureMinePoint(lattice[(col - 1) * rows + row - 1])">
						<template v-if="over === 1">
							<span v-if="lattice[(col - 1) * rows + row - 1].isMine">💣</span>
							<span v-else>{{ lattice[(col - 1) * rows + row - 1].mineNum }}</span>
						</template>
						<template v-else>
							<span v-if="lattice[(col - 1) * rows + row - 1].isMark">❤</span>
							<span
								v-else-if="lattice[(col - 1) * rows + row - 1].isOpen">{{ lattice[(col - 1) * rows + row - 1].mineNum }}</span>
							<span v-else>`</span>
						</template>
					</span>
				</div>
			</div>
			<!-- 功能区 -->
			<div class="right">
				<div class="tool">本局耗时：{{time}} s</div>
				<div :class="['tool' ,isMarkStatus ? 'marked' : '' ]" @click="changeIsMarkStatus">手机切换标记</div>
				<div class="tool">剩余地雷：{{ minePosition.length }}</div>
				<div class="tool">本局得分：{{ score }}</div>
				<div class="tool" @click="showGame = !showGame">改变难度</div>
				<div class="tool" @click="init()">点击重来</div>
			</div>
		</div>

		<div class="select" v-else>
			<div>等级选择</div>
			<ul>
				<li class="level" v-for="(item, index) in level" :key="index" @click="handleChoseLevel(item.value)">
					<div>{{item.name}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		inject: ['reload'],
		name: "mineSweeping",
		components: {},
		data() {
			return {
				showGame: true,
				gameInfo: [6, 6, 5],
				// 格子横排数，格子纵排数，雷数
				level: [{
					name: '青铜',
					value: [9, 9, 10]
				}, {
					name: '黄金',
					value: [12, 9, 20]
				}, {
					name: '钻石',
					value: [12, 12, 30]
				}, {
					name: '星耀',
					value: [15, 12, 40]
				}, {
					name: '王者',
					value: [15, 15, 50]
				}],
				// 横排格子数
				rows: 0,
				// 纵排格子数
				cols: 0,
				// 格子总数
				latticeNum: 0,
				// 雷点位置（找出一个少一个）
				minePosition: [],
				// 雷点位置备个份
				minePositionBake: [],
				// 格子属性
				lattice: [{
					index: 0, // 格子索引
					mineNum: 0, // 周围雷数
					isMine: false, // 是否是雷
					isOpen: false, // 是否已经被点开
					isMark: false, // 是否被标记
				}],
				// 游戏是否结束： 0-未结束 1-点到雷了导致结束  2-雷点被标记完了
				over: 0,
				// 是否处于标记状态（该状态用于移动端替代PC端右键标记地雷事件）
				isMarkStatus: false,
				// 游戏计时
				time: 0,
				// 游戏计时器
				interval: null,
				opened: 0,
				wrongMark: 0,
				score: 0
			}
		},
		watch: {
			over(newVal) {
				switch (newVal) {
					case 1:
						this.$alert("BOOM，踩雷了，本局得分：" + this.score, "地雷爆炸", {
							confirmButtonText: "重来",
							callback: action => {
								this.reload();
							}
						});
						break;
					case 2:
						this.wrongMark = this.judgeWrongMark();
						if (this.wrongMark !== 0) {
							this.$alert("你把" + this.wrongMark + "个地雷标记错了，本局得分：" +
								this.score, "排雷失败", {
									confirmButtonText: "重来",
									callback: action => {
										this.reload();
									}
								});
						} else {
							this.openAllRest();
							this.$alert("找到了全部地雷，本局得分：" + this.score, "地雷清除", {
								confirmButtonText: "继续",
								callback: action => {
									this.reload();
								}
							});
						}
						break;
					default:
						break;
				}
				if (newVal) {
					window.clearInterval(this.interval);
				}
			},
			time(newVal) {
				this.score = this.opened * 2 + this.gameInfo[2] * 10 - this.wrongMark * 5 - Math.floor(newVal / 5);
			}
		},
		created() {
			if (Cookies.get('gameInfo') != undefined) {
				this.gameInfo = JSON.parse(Cookies.get('gameInfo'));
			}
		},
		mounted() {
			let _this = this;
			_this.init();
			document.onkeydown = function(e) {
				let key = window.event.keyCode;
				if (key === 13) {
					_this.init();
				}
			};
			this.$nextTick(() => {
				this.setTime();
			});
		},
		methods: {
			handleChoseLevel(level) {
				this.gameInfo = level;
				Cookies.set('gameInfo', this.gameInfo);
				this.init();
				this.showGame = true;
			},
			// 初始化格子盘隐藏数据
			init() {
				this.over = 0;
				this.rows = this.gameInfo[0];
				this.cols = this.gameInfo[1];
				this.latticeNum = this.rows * this.cols;
				// 获取雷点位置
				this.getMinePosition();
				// 给每个格子赋予正确的属性
				this.initLattice();
				this.time = 0;
			},
			// 游戏开始计时
			setTime() {
				this.interval = setInterval(() => {
					this.time++;
				}, 1000);
			},
			// 改变标记状态
			changeIsMarkStatus() {
				this.isMarkStatus = !this.isMarkStatus;
			},
			// 随机获取雷点位置
			getMinePosition() {
				// 定义一个数组装不重复的格点
				let mineArr = [];
				// 循环雷数生成不重复的雷点
				for (let n = 0; n < this.gameInfo[2]; n++) {
					const random = Math.floor(Math.random() * this.latticeNum);
					if (mineArr.indexOf(random) === -1) {
						mineArr.push(random);
					} else {
						n--;
					}
				}
				this.minePosition = mineArr;
				this.minePositionBake = [].concat(mineArr);
			},
			// 格子属性初始化
			initLattice() {
				let latticeArr = [];
				for (let n = 0; n < this.latticeNum; n++) {
					let lattice = {
						index: n,
						isOpen: false,
						mineNum: 0,
						isMark: false,
					};
					// n标记是否是雷
					lattice.isMine = this.minePosition.indexOf(n) > -1;
					// 如果不是雷，计算出格子周围8个点的雷数
					if (!lattice.isMine) {
						this.getMineNumAroundLattice(lattice, n);
					}
					latticeArr.push(lattice);
				}
				this.lattice = latticeArr;
			},
			// 打开所有剩下的格子
			openAllRest() {
				this.lattice.forEach(item => {
					item.isOpen = true;
				});
			},
			// 获取格子周围的雷数，
			getMineNumAroundLattice(lattice, index) {
				// 先获取格子周围的有效索引
				const latticeIndexArr = this.getLatticeIndex(index);
				// 循环索引，索引值在雷点数组中的，即为雷，当前格子的雷点数加1
				latticeIndexArr.forEach(i => {
					if (this.minePosition.indexOf(i) > -1) {
						lattice.mineNum++;
					}
				});
			},
			// 获取格子周围的有效索引
			getLatticeIndex(index) {
				// 0做索引不好算，按正常数字来算
				index++;
				// 存索引值的变量
				let latticeIndexArr = [];
				// 当前格子位于第几行
				const latticeRow = Math.ceil(index / this.rows);
				// 当前格子位于第几列（求余为0说明是最右边一列）
				const latticeCol = Math.ceil(index % this.rows) || this.rows;
				// const latticeCol = Math.ceil(index % this.rows) === 0 ? this.rows : Math.ceil(index % this.rows);
				// 第一行没有上一行，不需要计算减1的行值，最后一行没有下一行，不需要计算加1的行值
				for (let i = (latticeRow === 1 ? 0 : -1); i < (latticeRow === this.cols ? 1 : 2); i++) {
					// 第一列没有左列，不需要计算减1的列值，最后一列没有右列，不需要计算加1的列值
					for (let j = (latticeCol === 1 ? 0 : -1); j < (latticeCol === this.rows ? 1 : 2); j++) {
						// 索引值 = (当前行值 + （上一行【-1】/当前行【0】/下一行【+1】） - 1【1是索引从0开始，所以需要减去】) * 每行格子数 + 当前列值 + （上一列【-1】/当前列【0】/下一列【+1】）
						const latticeIndex = (latticeRow + i - 1) * this.rows + (latticeCol + j);
						// 初始值加了1，所以索引要减去1才对
						latticeIndexArr.push(latticeIndex - 1);
					}
				}
				return latticeIndexArr;
			},
			// 点了格子
			handleClickLattice(lattice) {
				// 如果置了标记状态，说明是手机端点雷的操作
				if (this.isMarkStatus) {
					this.handleSureMinePoint(lattice);
				} else {
					this.leftClick(lattice);
				}
			},
			// 左键点击
			leftClick(lattice) {
				if (this.over) {
					return false;
				}
				// 是雷，提前结束战斗
				if (!lattice.isOpen && lattice.isMine) {
					lattice.isOpen = true;
					this.over = 1;
				} else {
					// 是数字
					if (lattice.mineNum) {
						if (!lattice.isOpen && !lattice.isMark) {
							lattice.isOpen = true;
							this.opened++;
						}
					} else {
						// 是空白
						const latticeIndexArr = this.getLatticeIndex(lattice.index);
						this.showWhiteAround(lattice, latticeIndexArr);
					}
				}
			},
			// 右键确认是雷点
			handleSureMinePoint(lattice) {
				if (!lattice.isOpen) {
					lattice.isMark = true;
					lattice.isOpen = true;
					this.minePosition.splice(this.minePosition.indexOf(lattice.index), 1);
					this.judgeIsOver();
				} else {
					if (lattice.isMark) {
						lattice.isMark = false;
						lattice.isOpen = false;
						this.minePosition.push(lattice.index);
					}
				}
			},
			// 判断游戏是否结束
			judgeIsOver() {
				this.over = this.minePosition.length === 0 ? 2 : 0;
			},
			// 判断错误的标记
			judgeWrongMark() {
				let wrongMark = 0;
				this.minePositionBake.forEach(item => {
					if (!this.lattice[item].isMark) {
						wrongMark++;
					}
				});
				return wrongMark;
			},
			// 展示周围的空白标记，直至边缘（格子边缘或者数字）
			showWhiteAround(lattice, latticeIndexArr) {
				// 避免有重复的数据停不下来，去个重
				latticeIndexArr = [...new Set(latticeIndexArr)];
				for (let i = 0; i < latticeIndexArr.length; i++) {
					const item = latticeIndexArr[i];
					// 计算一个少一个，减少循环
					latticeIndexArr.splice(i, 1);
					i--;
					if (this.lattice[item].isOpen) {
						continue;
					}
					this.lattice[item].isOpen = true;
					this.opened++;
					if (!this.lattice[item].mineNum) {
						const arr = this.getLatticeIndex(this.lattice[item].index);
						this.showWhiteAround(this.lattice[item], latticeIndexArr.concat(arr));
					}
				}
			}
		}
	};
</script>

<style scoped>
	#Gminesweeper {
		height: calc(100vh - 80px);
		background-image: url('../assets/backgrounds/极光.jpg');
		background-size: 100% 100%;
		/* background: repeating-linear-gradient(to top, rgba(170, 170, 127, 0.6), rgba(170, 255, 255, 0.4)); */
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.main {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.select {
		border: 2px dashed #0b7777;
		border-radius: 5px;
		width: 50%;
		font-size: 24px;
		text-align: center;
		color: #0b7777;
	}

	.level {
		border: 1px dashed #0b7777;
		border-radius: 3px;
	}

	.level :hover {
		background-color: #00aa7f;
		color: #004800;
	}

	.right {
		width: 280px;
		height: 300px;
		font-size: 20px;
		text-align: center;
		color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	.tool {
		width: 100%;
		height: 36px;
		border-radius: 5px;
		background-color: #0b7777;
	}

	.right :hover {
		background-color: #00aa7f;
	}

	.game {
		width: 100%;
		height: 100%;
	}

	.game-row {
		width: max-content;
		margin: 2px;
	}

	.game-block {
		display: inline-block;
		background-color: #aaaaaa;
		width: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		color: #ffffff;
		text-align: center;
		cursor: pointer;
		margin: 2px;
	}

	.open {
		background-color: #bedcc9;
	}

	.mark {
		color: #ff557f;
	}

	.rest {
		font-size: 16px;
	}

	.marked {
		background-color: #ffaa00;
	}
</style>
