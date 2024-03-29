const fs = require('fs')
const path = require('path')
const express = require('express')
const LRU = require('lru-cache')
const favicon = require('serve-favicon')
const { createBundleRenderer } = require('vue-server-renderer')
const compression = require('compression')
const microcache = require('route-cache')
const chalk = require('chalk')
const portfinder = require('portfinder')

const resolve = file => path.resolve(__dirname, file)
portfinder.basePort = 8080
const app = express()

async function start() {
  let availablePort = await portfinder.getPortPromise()
  let port = process.env.PORT || availablePort

  const isProd = process.env.NODE_ENV === 'production'
  const useMicroCache = process.env.MICRO_CACHE !== 'false'
  
  function createRenderer(bundle, options){
      return createBundleRenderer(bundle, Object.assign(options, {
          cache: LRU({
              max: 1000,
              maxAge: 1000 * 60 * 15
          }),
          basedir: resolve('./dist'),
          runInNewContext: false
      }))
  }
  
  let renderer
  let readyPromise
  const templatePath = resolve('./src/index.template.html')
  
  if(isProd){
      const template = fs.readFileSync(templatePath, 'utf-8')
      const bundle = require('./dist/vue-ssr-server-bundle.json')
      const clientManifest = require('./dist/vue-ssr-client-manifest.json')
      renderer = createRenderer(bundle, {
          template,
          clientManifest
      })
  }else{
      readyPromise = require('./build/setup-dev-server')(
          app,
          templatePath,
          (bundle, options) => {
              renderer = createRenderer(bundle, options)
          }
      )
  }
  
  const serve = (path, cache) => express.static(resolve(path), {
      maxAge: cache && isProd ? 1000 * 60 * 60 * 24 *30 : 0
    })
    
  app.use(compression({ threshold: 0 }))
  app.use(favicon('./public/favicon.ico'))
  app.use('/dist', serve('./dist', true))
  app.use('/public', serve('./public', true))
  app.use('/manifest.json', serve('./manifest.json', true))
  
  
  
  // 如果内容不是用户特定 (user-specific)
  //（即对于相同的 URL，总是为所有用户渲染相同的内容），
  // 我们可以利用名为 micro-caching 的缓存策略，
  // 来大幅度提高应用程序处理高流量的能力。
  app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))
  
  function render(req, res) {
    const s = Date.now()
  
    res.setHeader("Content-Type", "text/html")
  //   res.setHeader("Server", serverInfo)
  
    const handleError = err => {
      if(err.url) {
        res.redirect(err.url)
      } else if(err.code === 404) {
        res.status(404).send('404 | Page Not Found')
      } else {
        // Render Error Page or Redirect
        res.status(500).send('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      } 
    }
  
    const context = {
      title: 'My Vue SSR Title',  // default title
      meta: `
        <meta name="theme-color" content="#4285f4">
      `,
      url: req.url
    }
  
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
      if(err) {
        return handleError(err)
      }
      res.send(html)
      if(!isProd) {
        console.log(`whole request: ${Date.now() - s} ms`)
      }
    })
  }
  
  // 在服务器处理函数中，调用 render 函数
  app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
  })
  
  // const port = process.env.PORT || 8888
  // app.listen(port, () => {
  //   console.log(`server started at localhost:${port}`)
  // })
  
  // app.set('port', process.env.PORT || 8888)
  // let hostname = '0.0.0.0'
  // app.listen(app.get('port'), hostname, () => {
  //   console.log(`Server running at http://${hostname}:${app.get('port')}`)
  // })

  app.listen(port, () => {
    console.log(
      chalk.black.bgGreen('\n DONE'),
      chalk.cyan(`Server running at ${chalk.cyan(`http://localhost:${port}`)}`)
    )
  })
}

start()


