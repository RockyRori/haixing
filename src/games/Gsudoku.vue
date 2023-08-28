<!-- 数独 -->
<template>
	<div id="Gsudoku">
		<div class="btnbox">
			<br /><br />
			<el-button :type="hard == 3 ? 'primary': ''" @click="change(3)">简单</el-button>
			<el-button :type="hard == 5 ? 'primary': ''" @click="change(5)">一般</el-button>
			<el-button :type="hard == 7 ? 'primary': ''" @click="change(7)">困难</el-button>
			<el-button @click="save">提交</el-button>
			<el-button @click="showAnswer">{{isShowAnswer? '隐藏答案': '显示答案'}}</el-button>
		</div>
		<div class="tableList">
			<el-row>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<div style="background: #ffffff;width: max-content;height: max-content;">
						<div class="table">
							<ul v-for="(row,index) in dataList" :key="index">
								<li v-for="(col, ind) in row" :key="ind">
									<span v-if="col.disabled">{{col.value}}</span>
									<input v-else type="tel" v-model="dataList[index][ind].value">
								</li>
							</ul>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="isShowAnswer">
					<div style="background: #ffffff;width: max-content;height: max-content;">
						<div class="table">
							<ul v-for="(row,index) in gridList" :key="index">
								<li v-for="(col, ind) in row" :key="ind">
									<span>{{gridList[index][ind]}}</span>
								</li>
							</ul>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				gridList: [],
				dataList: [],
				numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				hard: 3, //3代表每一行需要填写3个数字
				isShowAnswer: false,
			}
		},
		created() {
			this.createGridList(this.hard); //(3:简单;5:一般;7:困难)
		},
		methods: {
			createGridList(hard) { //创建3x3表格
				for (let i = 0; i < 9; i++) {
					this.gridList.push([]);
					for (let j = 0; j < 9; j++) {
						this.gridList[i].push(0);
					}
				}
				this.init1row(hard);
			},
			random1_9Arr(arr) { //数组1-9随机打乱
				arr.sort(() => {
					return Math.random() - 0.5;
				});
				return arr;
			},
			init1row(hard) {
				this.gridList[0] = this.random1_9Arr(this.numArr); //第一行赋值
				this.setAllValue(this.gridList, 1, 0, hard); //第二至九行赋值
			},
			setAllValue(arr, row, col, hard) {
				if (col == 9) {
					return this.setAllValue(arr, row + 1, 0, hard);
				}
				if (row == 9) {
					return true;
				}
				for (let i = row; i < 9; i++) {
					for (let j = col; j < 9; j++) {
						if (arr[i][j] != 0) {
							return this.setAllValue(arr, i, j + 1, hard);
						}
						for (let ch = 1; ch <= 9; ch++) {
							if (this.isValidNum(arr, i, j, ch)) {
								arr[i][j] = ch;
								if (this.setAllValue(arr, i, j + 1, hard)) {
									if (row == 8 && col == 8) {
										this.setDataList(JSON.parse(JSON.stringify(arr)), hard);
									}
									return true;
								} else {
									arr[i][j] = 0;
								}
							}
						}
						return false;
					}
				}
				return false;
			},
			isValidNum(arr, row, col, index) { // 判断 gridList[i][j] 是否可以填入index
				for (let i = 0; i < 9; i++) {
					// 判断行是否存在重复
					if (arr[row][i] == index) {
						return false;
					};
					// 判断列是否存在重复
					if (arr[i][col] == index) {
						return false;
					};
					// 判断 3 x 3 方框是否存在重复
					let _row = parseInt(row / 3) * 3 + parseInt(i / 3);
					let _col = parseInt(col / 3) * 3 + (i % 3);
					if (arr[_row][_col] == index) {
						return false;
					}
				}
				return true;
			},
			setDataList(arr, hard) {
				let list = this.random1Or0Arr(hard);
				for (let i = 0; i < arr.length; i++) {
					this.dataList[i] = [];
					for (let j = 0; j < arr[i].length; j++) {
						let random = list[i][j];
						this.dataList[i][j] = {
							disabled: random,
							value: random ? arr[i][j] : ''
						};
					}
				}
			},
			random1Or0Arr(hard) {
				let arr = [];
				for (let i = 0; i < 9; i++) {
					arr.push([]);
					let trueArr = [];
					for (let j = 0; j < 9; j++) {
						if (trueArr.length < hard) {
							arr[i].push(false);
							trueArr.push(1);
						} else {
							arr[i].push(true);
						}
						arr[i].sort(() => {
							return Math.random() > .5 ? -1 : 1;
						})
					}
				}
				return arr
			},
			change(hard) {
				this.hard = hard;
				this.gridList = [];
				this.dataList = [];
				this.createGridList(hard);
			},
			save() {
				let arr = [];
				for (let i = 0; i < 9; i++) {
					arr.push([]);
					for (let j = 0; j < 9; j++) {
						arr[i].push(Number(this.dataList[i][j].value))
					}
				}
				let count = 0;
				for (let i = 0; i < 9; i++) {
					if (arr[i].toString() == this.gridList[i].toString()) {
						count++;
					}
				}
				let msg = '';
				if (this.hard === 3) {
					msg = '模式：简单，';
				} else if (this.hard === 5) {
					msg = '模式：一般，';
				} else if (this.hard === 7) {
					msg = '模式：困难，';
				}
				if (count === 9) {
					this.$message({
						message: msg + '挑战成功',
						type: 'success'
					});
				} else {
					this.$message({
						message: msg + '挑战失败',
						type: 'error'
					});
				}
			},
			showAnswer() {
				this.isShowAnswer = !this.isShowAnswer;
			},
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
	}

	input {
		outline: none;
	}

	[v-cloak] {
		display: none;
	}

	#Gsudoku {
		height: calc(100vh - 80px);
		width: 100%;
		position: relative;
		background-image: url('../assets/backgrounds/极光.jpg');
		background-size: 100% 100%;
		/* background:
			linear-gradient(217deg, rgba(255, 85, 127, 0.8) 0%, rgba(255, 0, 0, 0.0) 30%),
			linear-gradient(127deg, rgba(145, 255, 139, 0.8) 0%, rgba(0, 255, 0, 0.1) 50%),
			linear-gradient(336deg, rgba(167, 151, 255, 0.8) 0%, rgba(0, 0, 255, 0.0) 50%); */
	}

	.btnbox {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 16px;
	}

	.tableList {
		text-align: center;
	}

	.item {
		float: left;
		width: 50%;
	}

	.table {
		display: inline-block;
		border: 1px solid #000000;
		box-sizing: border-box;
		background:
			linear-gradient(217deg, rgba(255, 85, 127, 0.8) 0%, rgba(255, 0, 0, 0.0) 30%),
			linear-gradient(127deg, rgba(145, 255, 139, 0.8) 0%, rgba(0, 255, 0, 0.1) 50%),
			linear-gradient(336deg, rgba(167, 151, 255, 0.8) 0%, rgba(0, 0, 255, 0.0) 50%);
	}

	.table ul {
		display: flex;
		width: 20rem;
		height: 2.5rem;
		box-sizing: border-box;
	}

	.table ul li {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		border-right: 1px dashed #cccccc;
		border-bottom: 1px dashed #cccccc;
		box-sizing: border-box;
	}

	.table ul:nth-child(3) li,
	.table ul:nth-child(6) li {
		border-bottom: 1px solid #000000;
	}

	.table ul:nth-child(9) li {
		border-bottom: none;
	}

	.table ul li:nth-child(9) {
		border-right: none;
	}

	.table ul li:nth-child(3),
	.table ul li:nth-child(6) {
		border-right: 1px solid #000000;
	}

	.table ul li span {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #0051dd;
		font-size: 20px;
		font-weight: bold;
	}

	.table ul li input {
		border: none;
		width: 30px;
		height: 30px;
		text-align: center;
		color: #cc00ff;
		font-size: 20px;
	}
</style>
