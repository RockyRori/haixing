<!-- 八皇后 -->
<template>
	<div id="Geightqueens">
		<div class="title">
			<div id="tittle">八皇后</div>
			<el-button type="primary" @click="reload">重来</el-button>
		</div>
		<div class="grid">
			<div class="row" v-for="(row, r_index) in grids" :key="r_index">
				<div class="cell" v-for="(cell, c_index) in row" :key="cell.key" @click.stop="select(r_index, c_index)">
					<div v-if="cell.ok">💆‍️</div>
				</div>
			</div>
		</div>
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
	export default {
		inject: ['reload'],
		watch: {
			queens(newValue, oldValue) {
				if (newValue == 8) {
					this.gameOver = true;
				}
			}
		},
		inject: ['reload'],
		mounted() {
			let _this = this;
			document.onkeydown = function(e) {
				let key = window.event.keyCode;
				if (key === 13) {
					_this.reload();
				}
			};
		},
		data() {
			return {
				grids: new Array(8).fill(1).map((_, r) => {
					return new Array(8).fill(1).map((_, c) => {
						return {
							key: `key-${r*8 + c}`,
							ok: false
						}
					})
				}),
				queens: 0,
				score: 20,
				gameOver: false
			}
		},
		methods: {
			select(rindex, cindex) {
				if (this.validate(rindex, cindex)) {
					this.grids[rindex][cindex].ok = !this.grids[rindex][cindex].ok;
					this.queens++;
				} else {
					this.$message({
						showClose: true,
						type: 'info',
						center: true,
						duration: 1000,
						message: '该位置无法放置皇后'
					});
				}
			},
			validate(rindex, cindex) {
				//横
				for (let i = 0; i < this.grids[rindex].length; i++) {
					if (this.grids[rindex][i].ok) {
						return false;
					}
				}
				//竖
				for (let i = 0; i < this.grids.length; i++) {
					if (this.grids[i][cindex].ok) {
						return false;
					}
				}
				//撇
				for (let i = 0; i < this.grids[0].length; i++) {
					let y = rindex + cindex - i;
					if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
						return false;
					}
					y
				}
				//捺
				for (let i = 0; i < this.grids[0].length; i++) {
					let y = rindex - cindex + i;
					if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style scoped>
	#Geightqueens {
		height: calc(100vh - 80px);
		width: 100%;
		background-image: url('../assets/backgrounds/极光.jpg');
		background-size: 100% 100%;
		/* background:
			linear-gradient(217deg, rgba(255, 85, 127, 0.8) 0%, rgba(255, 0, 0, 0.0) 30%),
			linear-gradient(127deg, rgba(145, 255, 139, 0.8) 0%, rgba(0, 255, 0, 0.1) 50%),
			linear-gradient(336deg, rgba(167, 151, 255, 0.8) 0%, rgba(0, 0, 255, 0.0) 50%); */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#tittle {
		color: #0094ca;
		font-size: 36px;
		text-align: center;
	}

	.grid {
		width: 400px;
		margin: 0 auto;
	}

	.cell {
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: #999;
		float: left;
		cursor: pointer;
	}

	.cell:nth-child(2n) {
		background: #efefef;
	}

	.row {
		height: 50px;
		width: 400px;
	}

	.row:nth-child(2n) .cell:nth-child(2n) {
		background: #999;
	}

	.row:nth-child(2n) .cell:nth-child(2n-1) {
		background: #efefef;
	}

	.title {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: 60%;
		height: 55px;
		font-size: 30px;
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
