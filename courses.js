const data = require('./data.json')
const fs = require('fs')

module.exports = {

  all(req,res) {
    return res.send({courses: data.courses})
  },

  create(req,res) {
    console.log("I am here")
    console.log(req.body)
    const keys = Object.keys(req.body)
    console.log(keys)

    let {
      name,
      author,
      price
    } = req.body

    const lastCourse = data.courses[data.courses.length - 1]
    let id

    if(lastCourse) {
      id = lastCourse.id + 1
    } else {
      id = 1
    }

    data.courses.push({
      name, 
      author,
      price
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('error')
      }
      return res.send(data)
    })
  }
}