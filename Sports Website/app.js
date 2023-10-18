const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.use('/css',express.static(__dirname + '/public/css'))
app.use('/js',express.static(__dirname + '/public/js'))
app.use('/images',express.static(__dirname + '/public/images'))

app.set('views','./views')
app.set('view engine','ejs')

// app.get('', function(req, res) {
//     res.render('index',{text: 'This is EJS'})
// })

app.get('',function(req,res) {
    res.render('index');
})

app.get('/login',function(req,res) {
    res.render('login');
})

app.get('/signup', function(req,res) {
    res.render('signup');
})

app.get('/post',function(req,res) {
    res.render('post');
})


app.listen(port, () => console.log(`Listening to the port ${port}`));