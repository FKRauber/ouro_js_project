$(function() {
  console.log("treasures.js loaded")
  listenForClick()
});

function listenForClick() {
  $('button#theory-data').on('click', function(event) {
    event.preventDefault()
    getTheories()
  })
}

function getTheories() {
  $.ajax({
    url: 'http://localhost:3000/treasures',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log("the data is...", data)

    let myTreasure = new Treasure(data[0])
    debugger
    
    let myTreasureHTML = myTreasure.postHTML()
    $('div#ajax-treasures').html(myTreasureHTML)
    document.getElementById('ajax-treasures').innerHTML += myTreasureHTML
  })
}

class Treasure {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.theories = obj.theories
  }
}

Treasure.prototype.postHTML = function() {

  let treasureTheories = this.theories.map(theory => {
    if (success = true) {
      return (`
        <p>${theory.name}</p>
        <p style="color:red;"><i>Solved!</i></p>
      `)
    } else {
      return (`
        <p>${theory.name}</p>
        <p>Unsolved</p>
      `)
    }
  }).join('')

  return (`
    <div>
      <p>${treasureTheories}</p>
    </div>
  `)
}

class Theory {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.issues = obj.issues
    this.success = obj.success
    this.prove_date = obj.prove_date
  }
}
