<template>
	<div id="Hmusic">
		<div class="mode">
			<span>当前模式：</span>
			<el-input v-if="musicMode.mode=='binding'" placeholder="绑定页面" disabled style="width: 100px;"></el-input>
			<el-input v-if="musicMode.mode=='random'" placeholder="随机播放" disabled style="width: 100px;"></el-input>
			<el-input v-if="musicMode.mode=='userdefine'" placeholder="自己点歌" disabled style="width: 100px;"></el-input>
			<!-- binding -->
			<el-button type="primary" @click="binding()">绑定页面：只播放每个页面专属的歌曲</el-button>
			<!-- random -->
			<el-button type="primary" @click="random()">随机播放：随机播放列表中的歌曲</el-button>
			<!-- userdefine -->
			<el-button type="primary" @click="userdefine()">自己点歌：循环播放你自己选中的歌</el-button>
		</div>
		<div class="mode">
			<div>
				<ul v-for="i in musics" class="song">
					<li>
						<el-button type="primary" @click="chooseMusic(i.url)" style="width: 170px;">
							<div style="display: flex;justify-content: space-between;">
								<span>歌名:</span><span>{{i.page}}</span>
							</div>
						</el-button>
					</li>
				</ul>
			</div>
			<div>
				<ul v-for="i in MileyCyrus" class="song">
					<li>
						<el-button type="primary" @click="chooseMusic(i.url)" style="width: 190px;">
							<div style="display: flex;justify-content: space-between;">
								<span>歌名:</span><span>{{i.page}}</span>
							</div>
						</el-button>
					</li>
				</ul>
			</div>
			<div>
				<ul v-for="i in DuaLipa" class="song">
					<li>
						<el-button type="primary" @click="chooseMusic(i.url)" style="width: 190px;">
							<div style="display: flex;justify-content: space-between;">
								<span>歌名:</span><span>{{i.page}}</span>
							</div>
						</el-button>
					</li>
				</ul>
			</div>
			<div>
				<ul v-for="i in solos" class="song">
					<li>
						<el-button type="primary" @click="chooseMusic(i.url)" style="width: 200px;">
							<div style="display: flex;justify-content: space-between;">
								<span>歌名:</span><span>{{i.page}}</span>
							</div>
						</el-button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		inject: ['selectMusic'],
		props: ['musicMode'],
		mounted() {},
		data() {
			return {
				musics: [{
					page: 'Hhome',
					url: require("@/assets/bgms/Hhome.mp3")
				}, {
					page: 'Hindex',
					url: require("@/assets/bgms/Hindex.mp3")
				}, {
					page: 'Hlog',
					url: require("@/assets/bgms/Hlog.mp3")
				}, {
					page: 'Geightqueens',
					url: require("@/assets/bgms/Geightqueens.mp3")
				}, {
					page: 'Ggobang',
					url: require("@/assets/bgms/Ggobang.mp3")
				}, {
					page: 'Ggreedysnake',
					url: require("@/assets/bgms/Ggreedysnake.mp3")
				}, {
					page: 'Ghangman',
					url: require("@/assets/bgms/Ghangman.mp3")
				}, {
					page: 'Gjigsaw',
					url: require("@/assets/bgms/Gjigsaw.mp3")
				}, {
					page: 'Gminesweeper',
					url: require("@/assets/bgms/Gminesweeper.mp3")
				}, {
					page: 'Gpinball',
					url: require("@/assets/bgms/Gpinball.mp3")
				}, {
					page: 'Gspelling',
					url: require("@/assets/bgms/Gspelling.mp3")
				}, {
					page: 'Gsudoku',
					url: require("@/assets/bgms/Gsudoku.mp3")
				}, {
					page: 'Gtreasure',
					url: require("@/assets/bgms/Gtreasure.mp3")
				}],
				MileyCyrus: [{
					page: 'WTF Do I Know',
					url: 'http://music.163.com/song/media/outer/url?id=1497981566.mp3'
				}, {
					page: 'Plastic Hearts',
					url: 'http://music.163.com/song/media/outer/url?id=1497981567.mp3'
				}, {
					page: 'Angels Like You',
					url: 'http://music.163.com/song/media/outer/url?id=1497981568.mp3'
				}, {
					page: 'Prisoner',
					url: 'http://music.163.com/song/media/outer/url?id=1496283296.mp3'
				}, {
					page: 'Gimme What I Want',
					url: 'http://music.163.com/song/media/outer/url?id=1497981569.mp3'
				}, {
					page: 'Night Crawling',
					url: 'http://music.163.com/song/media/outer/url?id=1497984117.mp3'
				}, {
					page: 'Midnight Sky',
					url: 'http://music.163.com/song/media/outer/url?id=1497984118.mp3'
				}, {
					page: 'High',
					url: 'http://music.163.com/song/media/outer/url?id=1497981570.mp3'
				}, {
					page: 'Hate Me',
					url: 'http://music.163.com/song/media/outer/url?id=1497981571.mp3'
				}, {
					page: 'Bad Karma',
					url: 'http://music.163.com/song/media/outer/url?id=1497981572.mp3'
				}, {
					page: 'Never Be Me',
					url: 'http://music.163.com/song/media/outer/url?id=1497981573.mp3'
				}, {
					page: 'Golden G String',
					url: 'http://music.163.com/song/media/outer/url?id=1497981574.mp3'
				}, {
					page: "We Can't Stop",
					url: 'http://music.163.com/song/media/outer/url?id=26429346.mp3'
				}],
				DuaLipa: [{
					page: 'Genesis',
					url: 'http://music.163.com/song/media/outer/url?id=481537710.mp3'
				}, {
					page: 'Hotter Than Hell',
					url: 'http://music.163.com/song/media/outer/url?id=481537711.mp3'
				}, {
					page: 'No Goodbyes',
					url: 'http://music.163.com/song/media/outer/url?id=481535726.mp3'
				}, {
					page: 'Last Dance',
					url: 'http://music.163.com/song/media/outer/url?id=481535735.mp3'
				}, {
					page: 'Scared To Be Lonely',
					url: 'http://music.163.com/song/media/outer/url?id=456175020.mp3'
				}, {
					page: 'One Kiss',
					url: 'http://music.163.com/song/media/outer/url?id=549800783.mp3'
				}, {
					page: 'Be the One',
					url: 'http://music.163.com/song/media/outer/url?id=1442707016.mp3'
				}, {
					page: 'Blow Your Mind',
					url: 'http://music.163.com/song/media/outer/url?id=1442710180.mp3'
				}, {
					page: 'New Rules',
					url: 'http://music.163.com/song/media/outer/url?id=1431769395.mp3'
				}, {
					page: 'No Lie',
					url: 'http://music.163.com/song/media/outer/url?id=456370704.mp3'
				}, {
					page: 'IDGAF',
					url: 'http://music.163.com/song/media/outer/url?id=1444307588.mp3'
				}, {
					page: 'Physical',
					url: 'http://music.163.com/song/media/outer/url?id=1456129891.mp3'
				}, {
					page: "Levitating",
					url: 'http://music.163.com/song/media/outer/url?id=1446218812.mp3'
				}],
				solos: [{
					page: 'Wrecking Ball',
					url: 'http://music.163.com/song/media/outer/url?id=27697195.mp3'
				}, {
					page: 'Break My Heart Myself',
					url: 'http://music.163.com/song/media/outer/url?id=1842279568.mp3'
				}, {
					page: 'Sabotage',
					url: 'http://music.163.com/song/media/outer/url?id=1842279569.mp3'
				}, {
					page: 'In The Name Of Love',
					url: 'http://music.163.com/song/media/outer/url?id=423227295.mp3'
				}, {
					page: 'Without Me',
					url: 'http://music.163.com/song/media/outer/url?id=1494986424.mp3'
				}, {
					page: 'Castle',
					url: 'http://music.163.com/song/media/outer/url?id=34144930.mp3'
				}, {
					page: 'Lush Life',
					url: 'http://music.163.com/song/media/outer/url?id=32785200.mp3'
				}, {
					page: 'I Would Like',
					url: 'http://music.163.com/song/media/outer/url?id=440207445.mp3'
				}, {
					page: "Ain't My Fault",
					url: 'http://music.163.com/song/media/outer/url?id=428375694.mp3'
				}, {
					page: 'One Mississippi',
					url: 'http://music.163.com/song/media/outer/url?id=464647451.mp3'
				}, {
					page: 'Symphony',
					url: 'http://music.163.com/song/media/outer/url?id=464674427.mp3'
				}, {
					page: 'Thirsty',
					url: 'http://music.163.com/song/media/outer/url?id=433018422.mp3'
				}, {
					page: 'Sit Still, Look Pretty',
					url: 'http://music.163.com/song/media/outer/url?id=34532602.mp3'
				}]
			}
		},
		methods: {
			binding() {
				this.musicMode.mode = 'binding';
				Cookies.set('musicMode', 'binding');
			},
			random() {
				this.musicMode.mode = 'random';
				Cookies.set('musicMode', 'random');
			},
			userdefine() {
				this.musicMode.mode = 'userdefine';
				Cookies.set('musicMode', 'userdefine');
			},
			chooseMusic(newMusic) {
				this.userdefine();
				this.selectMusic(newMusic);
			}
		}
	}
</script>

<style scoped>
	#Hmusic {
		height: max-content;
		width: 100%;
		background-image: url('../assets/backgrounds/stars.gif');
		/* background:
			linear-gradient(217deg, rgba(255, 85, 127, 0.8) 0%, rgba(255, 0, 0, 0.0) 30%),
			linear-gradient(127deg, rgba(145, 255, 139, 0.8) 0%, rgba(0, 255, 0, 0.1) 50%),
			linear-gradient(336deg, rgba(167, 151, 255, 0.8) 0%, rgba(0, 0, 255, 0.0) 50%); */
		color: #cbcbcb;
	}

	.unlimit {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
	}

	.mode {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}

	.song {
		display: flex;
		flex-direction: column;
	}
</style>
