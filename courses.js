const data = require('./data.json')
const fs = require('fs')

module.exports = {

  all(req,res) {
    return res.send({courses: data.courses})
  },

  create(req,res) {
    console.log(req.body)
    //* req.body always come as an object. 
    //* The keys are the form names and the values what you typed.

    let {
      id,
      name,
      author,
      price
    } = req.body

    console.log('this are the keys:', name, author, price)

    data.courses.push({
      id,
      name, 
      author,
      price
    })

    console.log('data', data) 
    //* At this point you pushed to 'data' the new course, you have this in memory
    //* But you do not have it in actually data.json file.
    //* You will have it there when the below part executes too.

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('error')
      }
      return res.send(data.courses)
    })
  },

  update(req,res) {
    const {id} = req.body
    console.log('id', req.body)

    let index = 0

    /* It will take the array of objects (data.courses) and take one object
    per time, analysing if the id of that object is the same as the one you 
    just received. */
    const foundCourse = data.courses.find(function(course, foundIndex) {
      if(id == course.id) {
        index = foundIndex
        console.log(index)
        return index
      }
    })

    console.log('foundCourse', foundCourse)

    if(!foundCourse) {
      return res.status(404).send('not found')
    }

    data.courses[index] = {
      ...foundCourse,
      ...req.body
    }

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('error')
      }
      return res.send(data.courses[index])
    })
  },

  delete(req,res) {
    const {id} = req.body
    console.log(id, req.body)

    /* Filter will take this array of objects (data.courses) and will 
    give back an array with all courses that is not a match with the requested
    id on req.body */
    const filteredCourses = data.courses.filter(function(course) {
      return course.id != id
    })

    console.log('all courses left', filteredCourses)

    data.courses = filteredCourses

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
        return res.send('error')
      }

      return res.send('it was deleted')
    })
  }
}