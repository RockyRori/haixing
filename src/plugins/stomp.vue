<template>
	<div>
		this is stomp
	</div>
</template>

<script>
import mqtt from 'mqtt'

export default {
	mounted() {
		this.createConnection();
		this.doSubscribe();
		this.doPublish();
	},
  data() {
    return {
      connection: {
        host: 'www.rockyrori.cn',
        port: 15675,
        endpoint: '/ws',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_3be2c321',
        username: 'guest',
        password: 'guest',
      },
      subscription: {
        topic: 'DirectExchange',
        qos: 0,
      },
      publication: {
        topic: 'DirectExchange',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },

  methods: {
    // 创建连接
    createConnection() {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
				console.log(connectUrl);
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error);
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
		doSubscribe() {
		  const { topic, qos } = this.subscription
		  this.client.subscribe(topic, qos, (error, res) => {
		    if (error) {
		      console.log('Subscribe to topics error', error)
		      return
		    }
		    this.subscribeSuccess = true
		    console.log('Subscribe to topics res', res)
		     })
		},
		doPublish() {
		  const { topic, qos, payload } = this.publication
		  this.client.publish(topic, payload, qos, error => {
		    if (error) {
		      console.log('Publish error', error)
		    }
		  })
		}
  }
}
</script>

<style>

</style>
