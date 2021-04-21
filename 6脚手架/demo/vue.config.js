module.exports ={
  publicPath:process.env.NODE_ENV === 'production'
  ? '/cart/'
  : '/',
  devServer:{
    before(app){
      // app是express的实例
      app.get('/list',(req,res)=>{
        res.send('我直接好家伙')
      })
    },
    proxy: 'http://localhost:4000'
  }
}