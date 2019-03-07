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
    url: '',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log("the data is...", data)

    let
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
  return (`
    <div>
      <p><strong>$(this.name)</strong></p>
      <p>$(this.description)</p>
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
