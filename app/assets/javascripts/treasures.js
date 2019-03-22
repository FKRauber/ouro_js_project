$(function() {
  console.log("treasures.js loaded")
  attachListeners();
  // listenForClick()
  // listenForNewFormClick()
  // listenForNextClick()
});

function attachListeners() {
  $('button#ajax-theory-data').on('click', () => getTreasures())
}

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

function listenForNextClick() {
  $('button#ajax-next-treasure').on('click', function(event) {
    event.preventDefault()
    getNextTreasure()
  })
}

function getTreasures() {
  $.ajax({
    url: 'http://localhost:3000/treasures',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log("the data is...", data)

    // var id = $(this).data("id");
    // $.get("/theories/" + id + ".json", function(json) {
    //   let theoryText = "<p>" + json['theory.name'] + "</p>"
    //   $(id).html(theoryText);
    // });

    for (var i = 0; i < data.length; i++) {
      let myTreasure = new Treasure(data[0])
      let myTreasureHTML = myTreasure.postHTML()
      $('div#ajax-treasures').html(myTreasureHTML)
      document.getElementById('ajax-treasures').innerHTML = myTreasureHTML
    }

  })
}

function getNextTreasure() {
  $.ajax({
    url: 'http://localhost:3000/treasures',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log("the data is...", data)
    var nextId = parseInt($("#ajax-next-treasure").attr("data-id")) + 1;
    debugger;
    $.get("/treasures/" + nextId + ".json", function(data) {
      $("#ajax-next-treasure").attr("data-id", data["id"]);
    });
  });
}

class Treasure {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.theories = obj.theories
  }

  static newTreasureForm() {
    $.ajax({
      url: 'http://localhost:3000/treasures',
      method: 'post',
      dataType: 'json'
    }).done(function(data) {
      return (`
        <strong>New Treasure Form</strong>
        <form>
          <input id="treasure-title" type="text" name="title" placeholder="Name"></input><br>
          <input type="text" name="description" placeholder="Description"></input><br>
          <input type="submit" />
        </form>
      `)
    });
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
