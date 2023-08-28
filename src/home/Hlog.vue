<template>
	<div id="Hlog">
		<div class="tittle">2021 更新日志</div>
		<ul class="finite">
			<li class="content"><span><span class="color">前言：网站的诞生</span>
					我在小学电脑课上第一次接触网站开发，目前U盘里还存着09年的作品。在那个手撸HTML的时代，我的网站只有一些文字图片、页面跳转，不能联网访问。
					但是我很羡慕那些能够随时登录的网站，是一个展示自己的窗口，最好来一些炫酷的特效。
					直到大学选了软件工程专业才更多的接触真正意义上的编程。一直开发的都是本地应用，无论是RPGMaker的游戏还是安卓应用都只能先下载到本地安装之后运行。
					正好最近注册了云服务器，我希望把自己的东西发布到网站上，所有人不需要下载好应用再打开，而是随时随地有网就能访问。
					网站式的应用天生就是有局限性的。页面不能太大，否则迟迟加载不出来。内容主要以文字为主，如果要有交互，那应该是些什么呢？
					最早的互联网主要是论坛，在那里分享各自的见闻，发表观点评论。
					10年之后是博客、知乎、微信文章，精品内容占据了上风。
					现在则是短视频的天下，抖音视频、斗鱼直播、bilibili。
					但是我的小网站是不能支持视频的，带宽根本不够，加载图片都费劲。所以我能选择的只有文字交互和动图特效交互。仅仅是这样也足够了！我可以做一些体积很小的交互，就像windows自带的扫雷、蜘蛛纸牌。还可以发挥自己的创作才能，写类似于最近流行的剧本杀，把剧情做成网站交互，以前我在作家联盟的时候体验过，现在找不到那个网站了，体验类似于lifeline。还有网站背景的粒子特效、爱心特效都可以有。
					另外就是加上我自己创作的诗词，不过我手写的笔记本好像找不到了。再定期选一些我感兴趣的新闻放上来。这样整个网站的内容就定下来了。
					千里之行始于足下，从购买服务器那天开始，我就搭建了这个网站的框架，设计语言是参考了steam，网页布局是沿用我原来写的“环境应急管理系统”，我之前原创的拉姆养成计划和我欲成仙的项目还没有加进来，以后可以整合进来。
					程序员就是一点点积累技术，在新的项目中用上以前写的东西，代码复用、设计复用，最终达成自己理想的目标。
				</span></li>
			<li class="content">
				<span class="color">网站后续更新：(以下排序不分先后)欢迎各位在反馈区提出宝贵的意见，您的意见开发者一定会重视</span>
				<div v-for="i in target">
					<span>
						{{i}}
					</span>
				</div>
			</li>
			<li class="content"><span>
					2021-06-14 筹备网站建设，比较阿里云、腾讯云、华为云服务器
				</span></li>
			<li class="content"><span>
					2021-06-15 注册资金400元，用于购买域名、云服务器、DNS解析、云盘，有效时长1年
				</span></li>
			<li class="content"><span>
					<span class="color">2021-06-16 成功注册域名rockyrori.cn</span>
					购买618阿里云服务器
				</span></li>
			<li class="content"><span>
					2021-06-17 设置centOS操作系统、配置安全组规则、挂载云盘、配置域名解析规则、创建快照、镜像
				</span></li>
			<li class="content"><span>
					2021-06-18 搭建Nginx网络、饥荒私人服务器、删除按量付费的云盘、快照服务
				</span></li>
			<li class="content"><span>
					2021-06-19 创建vue-cli项目，npm配置网页前端组件，header、aside、footer、content分离
					绑定点击事件，点击任意位置出现爱心图标
				</span></li>
			<li class="content"><span>
					2021-06-20 阿里云电话审核，要求变更网站名称及服务内容，驳回备案初审
				</span></li>
			<li class="content"><span>
					2021-06-21 效仿steam网页，选定前端风格为黑色
					新建初始栏目-诗词-古文-交互
					首页轮播“一方诗社”执笔逐梦，共绘小康优秀获奖作品
					古文栏目添加5篇文章，推广个人网站给家人
					父母“不要涉及违法的内容就好”
				</span></li>
			<li class="content"><span>
					2021-06-22 新增“贪吃蛇”，绑定键盘按键上下左右移动
					新增“接宝藏”，全部为可接取物品，没有雷区
					新增“接弹球”，移动速度太快，掌握技巧前很难接到球
				</span></li>
			<li class="content"><span>
					2021-06-23 新增“五子棋”，没有联机对战，自己左右手互搏
					修复路由到当前页面浏览器报错的bug，父节点增加reload()，通过开关页面状态重新跳转到当前页面
					向子节点注入inject: ['reload']，绑定重新开始按钮为刷新页面事件
					秦景轩“你自己写的吗？还不错”
				</span></li>
			<li class="content"><span>
					2021-06-24 修复账号和文章为纯图片的bug，改为固定标题，内容滚动展示
					新增“欣赏”模块，展示纯图片资源
				</span></li>
			<li class="content"><span>
					2021-06-25 新增教程模块，按顺序完成PowerDesigner、DataGrip、MyBatisPlus教程
					修改教程为在线PDF展示，得到了潘必垚的赞
				</span></li>
			<li class="content"><span class="color">
					2021-06-26 通过阿里云备案初审，提交通信管理局备案
				</span></li>
			<li class="content"><span>
					2021-06-29 支持PDF导出为本地文件，岳霄腾评“我也想参与”，陆正昊评“呦，这前端风格不错”
				</span></li>
			<li class="content"><span>
					<span class="color">2021-06-30
						通过通信管理局审批，网站正式拿到ICP备案，桂ICP备2021005488号</span>
					确保教程的页数在规定范围内且无限滚动，教程左侧菜单栏与教程同高度
				</span></li>
			<li class="content"><span>
					2021-07-01 新增“字母机”，得到了朱鸿基的好评“100多分了，比我在steam上花钱买的还好玩”
				</span></li>
			<li class="content"><span class="color">
					2021-07-02 ps:今天是我生日 想推广个人网站，得到别人的认可
				</span></li>
			<li class="content"><span>
					2021-07-02 新增“吊死鬼”，得到了唐小荃的好评“好久没玩过hangman了”
					曾雨阳“不难啊，我对着字母出现频率一下子就通关了，按键有bug快修”
					袁雨晨“海哥快适配手机”
				</span></li>
			<li class="content"><span>
					2021-07-03 新增“扫地雷”，新增“猜数字”
					王淑一“前一阵我天天玩qq小程序的扫雷”
					葛霖升“贪吃蛇是按时间推移变快还是进食次数？”
				</span></li>
			<li class="content"><span>
					2021-07-04 新增“八皇后”，新增“九宫格”
					孙正阳“特朗普个人网站不如海星快乐屋”
					孟潇航“比野马科技好”
				</span></li>
			<li class="content"><span>
					2021-07-05 优化目录结构，新增“更新日志”，更改左侧菜单排列样式
					新增“索引”，完善教程提示
				</span></li>
			<li class="content"><span>
					2021-07-05 通过日志记录网站变化，不再急于推广，等到网站稳定、不需要频繁更新，再面向好友
				</span></li>
			<li class="content"><span>
					<span class="color">2021-07-06 正式启动网站后端及数据库服务</span>
					即将允许游客注册账号并登录，即将允许已注册用户发表评论</span></li>
			<li class="content"><span>
					2021-07-07 测试数据库连接，成功开通用户反馈
				</span></li>
			<li class="content"><span>
					2021-07-08 内测数据库连接状态，内测用户注册、登录、评论是否正常
				</span></li>
			<li class="content"><span><span class="color">
						2021-07-09
						通过内测，网站功能完成</span>
					注册“全国互联网安全管理服务平台”账号，正式提交全国联网备案申请
					加入BGM
				</span></li>
			<li class="content"><span>
					2021-07-10 修改网站颜色,交互内容自适应电脑屏幕大小，统一背景主题
					修复扫雷刷新后难度复原的bug，修复音乐不连续暂停的bug
				</span></li>
			<li class="content"><span>
					2021-07-12 NPMS搭建好了模板，可以开始干活了
					邀请过来5位新用户
					感谢“岳霄腾”专业玩家细心挑剔
					感谢“朱鸿基”产品经理加新需求
					感谢“刘沛林”,发现HTTPS、www.映射出错
				</span></li>
			<li class="content"><span>
					2021-07-13 新增自选背景音乐模式，支持绑定页面、随机播放、单曲循环三种模式
					主页增加用户、评论、反馈统计
					添加网站到收藏夹
					PDF绑定方向键翻页
					修改网页顶部菜单栏布局和映射
				</span></li>
				<li class="content"><span>
						2021-07-14
					</span></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				target: [
					'1.允许用户修改个人数据，自定义头像等',
					'2.为不同场景添加对应的BGM(已完成)',
					'3.自适应手机端屏幕大小',
					'4.反馈区增加验证码(已完成)',
					'5.诗词古文添加评论区',
					'6.完成交互区排行榜功能',
					'7.左侧菜单栏不再固定弹出，改为浮动点击弹出，给主屏幕让出更多空间',
					'8.右侧评论区改为浮点弹出，允许展开详细信息',
					'9.使用cookie信息自动登录，无需用户每次登录',
					'10.自动拉取用户反馈列表，显示在日志栏(不合适，有些反馈不适合公开显示)',
					'11.添加互动功能，允许用户给评论区留言信息点赞、评论(直接按照贴吧楼上楼下喊话)',
					'12.用户上线后收到数字红点提示，查看其他用户的点赞回复信息(取消)',
					'13.添加精选新闻专区，同步我个人的微信公众号',
					'14.类似漫野奇谭文字冒险专区，人工智能写作互动小说',
					'15.实时统计注册用户及浏览量展示到页面和主页'
				]
			}
		}
	}
</script>

<style scoped>
	#Hlog {
		height: calc(100vh - 80px);
		/* background-color: #f0efe2; */
		background-image: url('../assets/backgrounds/stars.gif');
	}

	.tittle {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		font-weight: bold;
		word-spacing: 2em;
		color: rgba(0, 239, 191, 0.8);
	}

	.finite {
		height: calc(100vh - 150px);
		overflow: auto;
	}

	.content {
		word-spacing: 2em;
		margin-top: 1em;
	}

	.color {
		color: rgba(0, 239, 191, 0.8);
	}

	span {
		color: #868686;
	}

	span:hover {
		color: #cccccc;
	}
</style>
