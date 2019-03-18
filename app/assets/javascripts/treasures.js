$(function() {
  console.log("treasures.js loaded")
  listenForClick()
  listenForNewFormClick()
});

function listenForClick() {
  $('button#ajax-theory-data').on('click', function(event) {
    event.preventDefault()
    getTreasures()
  })
}

function listenForNewFormClick() {
  $('button#ajax-new-treasure').on('click', function(event) {
    event.preventDefault()
    let newTreasureForm = Treasure.newTreasureForm()
    document.querySelector('div#ajax-new-treasure-form').innerHTML = newTreasureForm
  })
}

function getTreasures() {
  $.ajax({
    url: 'http://localhost:3000/treasures',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log("the data is...", data)
    for (var i = 0; i < data.length; i++) {
      let myTreasure = new Treasure(data[i])
      let myTreasureHTML = myTreasure.postHTML()
      $('div#ajax-treasures').html(myTreasureHTML)
      document.getElementById('ajax-treasures').innerHTML = myTreasureHTML
    }
  })
}


class Treasure {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.theories = obj.theories
  }

  static newTreasureForm() {
    return (`
      <strong>New Treasure Form</strong>
      <form>
        <input id="treasure-title" type="text" name="title" placeholder="Name"></input><br>
        <input type="text" name="description" placeholder="Description"></input><br>
        <input type="submit" />
      </form>
    `)
  }
}

Treasure.prototype.postHTML = function() {

  let treasureTheories = this.theories.map(theory => {
    return (`
      <p>${theory.name}</p>
    `)
  }).join('')

  return (`
    <div>
      <p><strong>${this.name}</strong></p>
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
