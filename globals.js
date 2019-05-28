module.exports = {
	logfile : process.env.GAME_OUTPUT_LOG || "/var/log/server_log.txt",
	tcpport : process.env.GAMETCPPORT || 11234,
	host : process.env.GAMEHOST || 'game'
}