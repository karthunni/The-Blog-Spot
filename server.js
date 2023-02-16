const express = require ('express')
const mongoose = require ('mongoose')
const articleRouter = require('./routes/articles')
const Article = require ('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.set('strictQuery', false);
const uri = "mongodb+srv://cheifkart2015:oGkzffWtK14eD28h@cluster0.x1fuhwh.mongodb.net/?retryWrites=true&w=majority";
(async () => {
    try {
      await mongoose.connect(uri)
    } catch (err) {
      console.log('error: ' + err)
    }
  })()

    

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get ('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', {articles: articles })
})

app.use('/articles', articleRouter)
app.listen(1250) 
