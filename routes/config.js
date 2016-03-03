var config = {
	standalone: true,
	env: 'devel',
	server: {
		cluster: {
			host: '127.0.0.1',
			port: 3000
		},
		standalone: {
			host: '10.1.1.69',
			port: 3000
		}
	},
	receiver: {
		cluster: {
			host: '127.0.0.1',
			port: 4000
		},
		standalone: {
			host: '10.1.1.69',
			port: 4000
		}
	},
	proxy: {
		cluster: {
			host: '10.1.1.69',
			port: 8000
		},
		standalone: {
			host: '10.1.1.69',
			port: 3000
		}
	},
	redis: {
		type: 'redis_cluster',	//redis || redis_cluster under modules folder
		host: '127.0.0.1',		//redis host
		port: 6379,
		cluster: [{				//cluster connection opts
			port: 6380,
			host: '10.1.1.128'
		}, {
			port: 6381,
			host: '10.1.1.128'
		}, {
			port: 6382,
			host: '10.1.1.128'
		}, {
			port: 6380,
			host: '10.1.1.148'
		}, {
			port: 6381,
			host: '10.1.1.148'
		}, {
			port: 6382,
			host: '10.1.1.148'
		}],
		key_prefix: 'hummingbird/dn/push/'
	},
	get: function(config_name){
		return config.standalone ? config[config_name].standalone : config[config_name].cluster;
	},
	getServer: function(){
		return config.standalone ? config.server.standalone : config.server.cluster;
	},
	getReceiver: function(){
		return config.standalone ? config.receiver.standalone : config.receiver.cluster;
	},
	getProxy: function(){
		return config.standalone ? config.proxy.standalone : config.proxy.cluster;
	}
}

module.exports = config;