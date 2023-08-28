import Stomp from 'stompjs'

export default {
	name: 'messageNotice',
	data() {
		return {
			client: null
		}
	},
	created() {
		//初始化连接
		this.connect();
	},
	methods: {
		//webSocket连接成功后回调函数
		onConnected(frame) {
			console.log("Connected: " + frame);
			//绑定交换机exchange_pushmsg是交换机的名字rk_pushmsg是绑定的路由key
			var exchange = "DirectExchange";
			// var exchange = "/exchange/exchange_pushmsg/rk_pushmsg";
			//创建随机队列用上面的路由key绑定交换机,放入收到消息后的回调函数和失败的回调函数
			this.client.subscribe(exchange, this.responseCallback, this.onFailed);
			console.log(frame)
		},
		onFailed(frame) {
			console.log("Failed: " + frame);
		},
		responseCallback(frame) {
			console.log("得到的消息 msg=>" + frame.body);
			console.log(frame)
			//接收到服务器推送消息，向服务器定义的接收消息routekey路由rk_recivemsg发送确认消息
			var exchange = "DirectExchange";
			this.client.send(exchange, {
				"content-type": "text/plain"
			}, frame.body);
		},
		connect() {
			//这里填你rabbitMQ的连接ip地址直接替换localhost:15674就好其它的不用改
			this.client = Stomp.client("ws://47.107.117.199:61613/ws")
			//填写你rabbitMQ登录的用户名和密码
			var headers = {
				"login": "guest",
				"passcode": "guest",
				//虚拟主机，默认“/”
				"host": "/"
			};
			//创建连接,放入连接成功和失败回调函数
			this.client.connect(headers, this.onConnected, this.onFailed);
		},
	}
