module.exports = {
  devServer: {
    port: 8081
    ,proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring 서버 주소
        changeOrigin: true,
      },
    }
  }
}
