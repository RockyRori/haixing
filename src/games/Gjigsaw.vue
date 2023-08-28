<!-- 拼图 -->
<template>
	<div id="Gjigsaw">
		<button class="btn-reset" @click="render()">重置游戏</button>
		<ul class="puzzle-wrap">
			<li :class="{'puzzle': true, 'puzzle-empty': !puzzle}" v-for="puzzle in puzzles"
				@click="moveFn(puzzles.indexOf(puzzle))">
				<button style="font-size: 24px;">{{puzzle}}</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.render();
			let _this = this;
			document.onkeydown = function(e) {
				if (window.event.keyCode == 13) {
					_this.render();
				}
			}
		},
		data() {
			return {
				puzzles: []
			}
		},
		methods: {
			// 重置渲染
			render() {
				let puzzleArr = [];
				// 生成包含1 ~ 15数字的数组
				for (let i = 1; i < 16; i++) {
					puzzleArr.push(i);
				}
				// 随机打乱数组
				puzzleArr = puzzleArr.sort(() => {
					return Math.random() - 0.5;
				});
				// 页面显示
				this.puzzles = puzzleArr;
				this.judge();
			},
			//计算逆序数
			judge() {
				let reverse = 0;
				for (let i = 0; i < 15; i++) {
					for (let j = i + 1; j < 15; j++) {
						if (this.puzzles[i] > this.puzzles[j]) {
							reverse++;
						}
					}
				}
				if (reverse % 2 == 0) {
					this.puzzles.push('');
				} else {
					this.render();
				}
			},
			// 点击方块
			moveFn(index) {
				// 获取点击位置及其上下左右的值
				let curNum = this.puzzles[index];
				let leftNum = this.puzzles[index - 1];
				let rightNum = this.puzzles[index + 1];
				let topNum = this.puzzles[index - 4];
				let bottomNum = this.puzzles[index + 4];
				// 和为空的位置交换数值
				if (leftNum === '' && index !== 4 && index !== 8 && index !== 12) {
					this.$set(this.puzzles, index - 1, curNum);
					this.$set(this.puzzles, index, '');
				} else if (rightNum === '' && index !== 3 && index !== 7 && index !== 11) {
					this.$set(this.puzzles, index + 1, curNum);
					this.$set(this.puzzles, index, '');
				} else if (topNum === '') {
					this.$set(this.puzzles, index - 4, curNum);
					this.$set(this.puzzles, index, '');
				} else if (bottomNum === '') {
					this.$set(this.puzzles, index + 4, curNum);
					this.$set(this.puzzles, index, '');
				}
				this.passFn();
			},
			// 校验是否过关
			passFn() {
				if (this.puzzles[15] === '') {
					const newPuzzles = this.puzzles.slice(0, 15);
					const isPass = newPuzzles.every((e, i) => e === i + 1);
					if (isPass) {
						alert('恭喜，闯关成功！');
					}
				}
			}
		},
		ready() {
			this.render();
		}
	}
</script>

<style scoped>
	#Gjigsaw {
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
		justify-content: space-evenly;
		align-items: center;
	}

	.puzzle-wrap {
		width: 408px;
		height: 408px;
		padding: 0;
		background: #ffffff;
		list-style: none;
	}

	.puzzle {
		float: left;
		width: 100px;
		height: 100px;
		font-size: 20px;
		background: #ff9900;
		text-align: center;
		line-height: 100px;
		border: 1px solid #ccc;
		box-shadow: 1px 1px 4px;
		text-shadow: 1px 1px 1px #B9B4B4;
		cursor: pointer;
	}

	.puzzle-empty {
		background: #cccccc;
		box-shadow: inset 2px 2px 18px;
	}

	.btn-reset {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 22px;
	}

	.btn-reset:hover {
		color: #ffffff;
		background-color: #ff9900;
	}
</style>
