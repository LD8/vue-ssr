const Vue = require('vue')
const fs = require('fs')

const server = require('express')()

server.get('/', (req, res) => {
  const vm = new Vue({
    data: {
      message: 'Hello Vue SSR',
    },
    template: `
      <div id='vm'>
        <h1>{{message}}</h1>
      </div>
    `,
  })

  const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8'),
  })

  renderer.renderToString(
    vm,
    {
      meta: `<meta name="Hello" content="This is a hello page">`,
      title: 'Hello SSR',
    },
    (err, html) => {
      if (err) {
        res.status(500).end('Internal Server Error...')
      }

      res.setHeader('Content-Type', 'text/html; charset=utf8')
      res.end(html)
    },
  )
})

server.listen(3000, () => console.log('Server is running on localhost:3000'))
