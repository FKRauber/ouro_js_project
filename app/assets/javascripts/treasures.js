$(() => {
  console.log("treasures.js loaded")

  bindClickHandlers()
  attachListeners();
  // listenForNewFormClick()
  // listenForNextClick()
});

const bindClickHandlers = () => {
  $('.all_treasures').on('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, "treasures_list");
    console.log('default prevented at all_treasures');

    fetch(`/treasures.json`)
      .then(res => res.json())
        .then(treasures => {
          $('#app-container').html('')
          treasures.forEach(treasure => {
            let newTreasure = new Treasure(treasure)
            let treasureHTML = newTreasure.formatIndex();
            $('#app-container').append(treasureHTML);
          });
        });
  });
}

function attachListeners() {
  $('button#ajax-theory-data').on('click', () => getTreasures());
  $('button#ajax-new-treasure').on('click', () => newTreasureForm());
  $('button#ajax-next-treasure').on('click', () => getNextTreasure());
}

// function listenForNewFormClick() {
//   $('button#ajax-new-treasure').on('click', function(event) {
//     event.preventDefault()
//     newTreasureForm();
// **    document.querySelector('div#ajax-new-treasure-form').innerHTML = newTreasureForm
//   })
// }

// function listenForNextClick() {
//   $('button#ajax-next-treasure').on('click', function(event) {
//     event.preventDefault()
//     getNextTreasure()
//   })
// }

function getTreasures() {
  $.ajax({
    url: 'http://localhost:3000/treasures',
    method: 'get',
    dataType: 'json'
  }).done(function(data) {
    console.log("the data is...", data)

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

function newTreasureForm() {
    $.ajax({
      url: 'http://localhost:3000/treasures',
      method: 'post',
      dataType: 'json'
    }).done(function() {
      $('form').submit(function(event) {
        event.preventDefault();
        console.log("creating new treasure")

        var values = $(this).serialize();
        var posting = $.post('/treasures', values);
        posting.done(function(data){
          console.log("the data is...")
        });
      });
      // document.querySelector('div#ajax-new-treasure-form').innerHTML = newTreasureForm
      // console.log(newTreasureForm);

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

function Treasure(treasure) {
  this.id = treasure.id
  this.name = treasure.name
  this.description = treasure.description
  this.user_id = treasure.user_id
  this.theories = treasure.theories
}

Treasure.prototype.formatIndex = function() {
  let treasureHTML = `
    <a href="/treasures/${this.id}">${this.name}</a>
    `

  return treasureHTML;
}

//
//
//   let treasureTheories = this.theories.map(theory => {
//     return (`
//       <p>${theory.name}</p>
//     `)
//   }).join('')
//
//   return (`
//     <div>
//       <p><strong>${this.name}</strong></p>
//       <p>${treasureTheories}</p>
//     </div>
//   `)
// }
