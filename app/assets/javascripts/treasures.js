$(() => {
  console.log("treasures.js loaded")
  bindClickHandlers();
});

const bindClickHandlers = () => {
  // TREASURES INDEX
  $('.all_treasures').on('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, "treasures");
    console.log('default prevented at all_treasures');

    getTreasures();
  });

  // SHOW TREASURE - FROM INDEX
  $(document).on('click', ".show_link", function(e) {
    // above assigns parent as show_link is not in DOM until we click it
    e.preventDefault();
    console.log('default prevented at show_link');
    let id = $(this).attr('data_id');
    fetch(`/treasures/${id}.json`)
      .then(res => res.json())
        .then(treasure => {
          $('#app-container').html('')
          let newTreasure = new Treasure(treasure)
          let treasureHTML = newTreasure.formatShow();
          $('#app-container').append(treasureHTML);
        });
  });

  // NEXT TREASURE - FROM SHOW
  $(document).on('click', '.next_treasure', function() {
    let id = $(this).attr('data_id');
    fetch(`treasures/${id}/next`)
  });

  // NEW TREASURE FORM - FROM INDEX
  $(document).on('click', '#new_treasure_form_btn', function(e) {
    e.preventDefault();
    console.log('default prevented at new_treasure_form_btn');
    $('#app-container').append(newTreasureForm());
  });
}

function newTreasureForm() {
    $.ajax({
      url: 'http://localhost:3000/treasures',
      method: 'post',
      dataType: 'json',
      data: $('treasures#_form').serialize()
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

    });
  }

const getTreasures = () => {
  fetch(`/treasures.json`)
    .then(res => res.json())
      .then(treasures => {
        $('#app-container').html('')
        treasures.forEach(treasure => {
          let newTreasure = new Treasure(treasure)
          let treasureHTML = newTreasure.formatIndex();
          $('#app-container').append(treasureHTML);
        });
        var b = $('<br><br><button id="new_treasure_form_btn" type="button" name="button" style="white-space: nowrap;">New Treasure</button>');
        $('#app-container').append(b);
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
    <a href="/treasures/${this.id}" class="show_link" data_id="${this.id}">${this.name}</a><br><br><br>
    `
  return treasureHTML;
}

Treasure.prototype.formatShow = function() {
  let treasureTheories = this.theories.map(theory => {
    return (`
      <br>
      <p><strong>${theory.name}</strong></p>
      <p>${theory.description}</p>
      <p>Issues: ${theory.issues}</p>
      <p>Successful? ${theory.success}</p>
      <p>Proven on ${theory.prove_date}</p>
      <br>
    `)
  }).join('')
  let treasureHTML = `
    <h3>${this.name}</h3>
    <p>${this.description}</p>
    <p>${treasureTheories}</p>
    <button class="next_treasure">Next</button>
    `
  return treasureHTML;
}

function newTreasureForm() {
  return (`
    <br><br>
    <form>
      <input id="treasure-title" type="text" name="title" placeholder="Name"></input><br>
      <input type="text" name="description" placeholder="Description"></input><br><br>
      <input type="submit" />
    </form>
  `)
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
