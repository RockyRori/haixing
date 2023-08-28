<template>
	<div id="Hindex">
		<div class="tittle">索引 INDEX</div>
		<ul class="finite">
			<li class="content"><span>
					<span class="el-icon-s-ticket">古文</span>&#12288;
					<router-link to="Afangshanzizhuan">方山子传</router-link>&#12288;
					<router-link to="Ataohuayuanji">桃花源记</router-link>&#12288;
					<router-link to="Ayangqiyuanwen">养气原文</router-link>&#12288;
					<router-link to="Ayueyanglouji">岳阳楼记</router-link>&#12288;
					<router-link to="Azuiwengtingji">醉翁亭记</router-link>&#12288;
				</span></li>
			<li class="content"><span>
					<span class="el-icon-s-ticket">交互</span>&#12288;
					<router-link to="Geightqueens">八皇后</router-link>&#12288;
					<router-link to="Ggobang">五子棋</router-link>&#12288;
					<router-link to="Ggreedysnake">贪吃蛇</router-link>&#12288;
					<router-link to="Ghangman">吊死鬼</router-link>&#12288;
					<router-link to="Gjigsaw">九宫格</router-link>&#12288;
					<router-link to="Gminesweeper">扫地雷</router-link>&#12288;
					<router-link to="Gpinball">接弹球</router-link>&#12288;
					<router-link to="Gspelling">字母机</router-link>&#12288;
					<router-link to="Gsudoku">填数字</router-link>&#12288;
					<router-link to="Gtreasure">接宝藏</router-link>&#12288;
				</span></li>
			<li class="content"><span>
					<span class="el-icon-s-ticket">欣赏</span>&#12288;
					<router-link to="Hpillar">光柱</router-link>&#12288;
					<router-link to="Hshrink">群星</router-link>&#12288;
					<router-link to="Hstars">流星</router-link>&#12288;
					<router-link to="Htransition">天际</router-link>&#12288;
				</span></li>
			<li class="content"><span>
					<span class="el-icon-s-ticket">诗词</span>&#12288;
					<router-link to="Pcilinzhengyun">词林正韵</router-link>&#12288;
					<router-link to="Pingshuijiuyun">平水旧韵</router-link>&#12288;
					<router-link to="Pzhonghuaxinyun">中华新韵</router-link>&#12288;
				</span></li>
			<li class="content"><span>
					<span class="el-icon-s-ticket">教程</span>&#12288;
					<router-link to="TPowerDesigner">PowerDesigner</router-link>&#12288;
					<router-link to="TDataGrip">DataGrip</router-link>&#12288;
					<router-link to="TMyBatisPlus">MybatisPlus</router-link>&#12288;
				</span></li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	#Hindex {
		height: calc(100vh - 80px);
		width: 100%;
		background-image: url('../assets/backgrounds/stars.gif');
		/* background:
			linear-gradient(217deg, rgba(255, 147, 147, 0.8) 10%, rgba(255, 0, 0, 0) 50%),
			linear-gradient(127deg, rgba(145, 255, 139, 0.8) 10%, rgba(0, 255, 0, 0) 50%),
			linear-gradient(336deg, rgba(167, 151, 255, 0.8) 10%, rgba(0, 0, 255, 0) 50%); */
	}

	.tittle {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		font-weight: bold;
		word-spacing: 2em;
		color: rgba(0, 0, 0, 1.0);
	}

	.finite {
		height: calc(100vh - 150px);
		overflow: auto;
	}

	.content {
		font-size: 22px;
		color: #e1e1e1;
		word-spacing: 2em;
		margin-top: 1em;
	}
	
	a:link,a:visited{
		color: rgba(0, 239, 191, 0.8);
	}
	
	a:hover,a:active{
		color: #00aeef;
	}
</style>
