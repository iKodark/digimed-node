const port = 9000
module.exports = app => {
  app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`)
  })
}