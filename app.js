const express = require('express');
const path = require('path');
const livereload = require('livereload');

const LiveReloadServer = livereload.createServer();
const connectLivereload = require('connect-livereload');
const app = express();
const port = 3000;



const mainRouter = require('./routers/main');


app.set('views',path.join(__dirname,'views')); 
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public')));
LiveReloadServer.watch(path.join(__dirname,'public'));

app.use(connectLivereload());
app.use('/', mainRouter);

LiveReloadServer.server.once('connection',()=> {
    setTimeout(() => {
        LiveReloadServer.refresh('/')
    },50);
})
app.listen(port,() => console.log(`servidor levantado en http://localhost:${port}`));