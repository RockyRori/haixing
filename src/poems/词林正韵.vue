<template>
	<div id="background">
		<div class="tittle">词林正韵</div>
		<ul class="finite">
			<li>
				<p><span class="label">第一部</span></p>
				<a>平声 一东二冬 通用</a><br>
				<a>上声 一董二肿 去声 一送二宋 通用</a><br>
			</li>
			<li>
				<p><span class="label">第二部</span></p>
				<a>平声 三江七阳 通用</a><br>
				<a>上声 三讲二十二养 去声 三绛二十三漾 通用</a><br>
			</li>
			<li>
				<p><span class="label">第三部</span></p>
				<a>平声 四支五微八齐十灰(半) 通用</a><br>
				<a>上声 四纸五尾八荠十贿(半) 去声 四寘五未八霁九泰(半)十一队(半) 通用</a><br>
			</li>
			<li>
				<p><span class="label">第四部</span></p>
				<a>平声 六鱼七虞 通用</a><br>
				<a>上声 六语七麌 去声 六御七遇 通用</a><br>
			</li>
			<li>
				<p><span class="label">第五部</span></p>
				<a>平声 九佳(半)十灰(半) 通用</a><br>
				<a>上声 九蟹十贿(半) 去声 九泰(半)十卦(半)十一队(半) 通用</a><br>
			</li>
			<li>
				<p><span class="label">第六部</span></p>
				<a>平声 十一真十二文十三元(半) 通用</a><br>
				<a>上声 十一轸十二吻十三阮(半) 去声 十二震十三问十四愿(半) 通用</a><br>
			</li>
			<li>
				<p><span class="label">第七部</span></p>
				<a>平声 十三元(半)十四寒十五删一先 通用</a><br>
				<a>上声 十三阮(半)十四旱十五潸十六铣 去声 十四愿(半)十五翰十六谏十七霰 通用</a><br>
			</li>
			<li>
				<p><span class="label">第八部</span></p>
				<a>平声 二萧三肴四豪 通用</a><br>
				<a>上声 十七筱十八巧十九皓 去声 十八啸十九效二十号 通用</a><br>
			</li>
			<li>
				<p><span class="label">第九部</span></p>
				<a>平声 五歌 独用</a><br>
				<a>上声 二十哿 去声 二十一个 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十部</span></p>
				<a>平声 九佳(半)六麻 通用</a><br>
				<a>上声 二十一马 去声 十卦(半)二十二祃 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十一部</span></p>
				<a>平声 八庚九青十蒸 通用</a><br>
				<a>上声 二十三梗二十四迥 去声 二十四敬二十五径 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十二部</span></p>
				<a>平声 十一尤 独用</a><br>
				<a>上声 二十五有 去声 二十六宥 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十三部</span></p>
				<a>平声 十二侵 独用</a><br>
				<a>上声 二十六寝 去声 二十七沁 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十四部</span></p>
				<a>平声 十三覃十四盐十五咸 通用</a><br>
				<a>上声 二十七感二十八俭二十九豏 去声 二十八勘二十九艳三十陷 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十五部</span></p>
				<a>入声 一屋二沃 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十六部</span></p>
				<a>入声 三觉十药 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十七部</span></p>
				<a>入声 四质十一陌十二锡十三职十四缉 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十八部</span></p>
				<a>入声 五物六月七曷八黠九屑十六叶 通用</a><br>
			</li>
			<li>
				<p><span class="label">第十九部</span></p>
				<a>入声 十五合十七洽 通用</a><br>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	#background {
		background-color: #f0efe2;
	}

	.tittle {
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 24px;
	}

	.finite {
		height: calc(100vh - 150px);
		overflow: auto;
	}
	
	.label{
		color: #00aeef;
	}
	
	a{
		color: #003000;
	}
</style>
