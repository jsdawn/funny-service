module.exports = {
  apps: [
    {
      name: 'funny-service', // 进程名称
      script: './src/app.js', // 入口文件相当于node index.js
      watch: true,
      exp_backoff_restart_delay: 100
    }
  ]
};
