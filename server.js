const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var cors = require('cors');
const fs = require('fs');
const path = require("path")

app.prepare().then(() => {
  const server =  express();
  server.use(cors());
  server.use("/public/uploads", express.static(__dirname + "/public/uploads"));
  
  // delete file
  server.delete('/media/:filename', (req,res) => {
    const filePath = path.join(__dirname, `/public/wp-content/uploads/${req.params.filename.split('+++').join('/')}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    res.status(200).send({message:'file deleted!'})
  })

  // rest of the routes
  server.all('*', (req, res) => {
    return handle(req, res)
  })
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

})