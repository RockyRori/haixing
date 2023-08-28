<template>
	<div class="hidden">
		<router-view v-if="isRouterAlive" style="width: 100vw;" :waiting="waiting" :musicMode="musicMode"></router-view>
		<video id="music" style="height: 0px;width: 0px;" :src="music.url" ref="music"></video>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	export default {
		created() {
			if (Cookies.get('musicMode') == undefined) {
				Cookies.set('musicMode', 'binding');
				this.musicMode.mode = 'binding';
			}
		},
		mounted() {
			this.$message({
				showClose: true,
				type: 'success',
				duration: 5000,
				message: 'Ctrl+D 添加到收藏夹'
			});
			let that = this;
			that.$refs.music.addEventListener('ended', function() {
				if (that.musicMode.mode == 'random') {
					let now = Math.floor(Math.random() * that.musics.length);
					that.selectMusic(that.musics[now].url);
				} else {
					that.playMusic();
				}
			});
			if (Cookies.get('waiting') == 'false' || Cookies.get('waiting') == undefined) {
				this.selectMusic(this.music.url);
			}
		},
		provide() {
			return {
				reload: this.reload,
				getTime: this.getTime,
				playMusic: this.playMusic,
				pauseMusic: this.pauseMusic,
				selectMusic: this.selectMusic
			}
		},
		data() {
			return {
				waiting: 'true',
				isRouterAlive: true,
				musicMode: {
					mode: Cookies.get('musicMode')
				},
				music: {
					url: require("@/assets/bgms/default.mp3")
				},
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
				}, {
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
				}, {
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
				}, {
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
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true;
				})
			},
			getTime() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth();
				month += 1;
				month = this.format(month);
				let day = date.getDate();
				day = this.format(day);
				let hour = date.getHours();
				hour = this.format(hour);
				let minute = date.getMinutes();
				minute = this.format(minute);
				let second = date.getSeconds();
				second = this.format(second);
				let millisecond = date.getMilliseconds();
				if (millisecond < 100) {
					if (millisecond < 10) {
						millisecond = '0' + millisecond;
					}
					millisecond = '0' + millisecond;
				}
				let time = year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second + '-' + millisecond;
				return time;
				console.log(time);
			},
			format(value) {
				if (value < 10 || value.length == 1)
					return '0' + value;
				return value;
			},
			playMusic() {
				this.$refs.music.play();
				this.waiting = 'false';
				Cookies.set('waiting', 'false');
			},
			pauseMusic() {
				this.$refs.music.pause();
				this.waiting = 'true';
				Cookies.set('waiting', 'true');
			},
			selectMusic(newMusic) {
				this.music.url = newMusic;
				let that = this;
				if (that.waiting == 'false' || Cookies.get('waiting') == undefined) {
					setTimeout(function() {
						that.playMusic();
					}, 500);
					setTimeout(function() {
						that.playMusic();
					}, 2000);
				}
			}
		}
	}
</script>

<style scoped>
	.hidden {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
