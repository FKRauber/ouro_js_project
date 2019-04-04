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

  // SUBMIT TREASURE FORM - FROM INDEX
  $("#new_treasure").on('submit', function(e) {
    e.preventDefault();
    console.log("creating new treasure")
    const values = $(this).serialize()
    $.post("/treasures", values).done(function(data) {
      const newTreasure = new Treasure(data)
      const htmlToAdd = newTreasure.formatShow()
      $('#app-container').html(htmlToAdd)
    })
  });

  // SORT LIST ALPHABETICALLY
  $(document).on('click', '#list_sort_btn', function(e) {
    e.preventDefault();
    console.log('default prevented at sort_list_btn');
    $('#app-container').append(getSortedTreasures());
  });

}

const getTreasures = () => {
  fetch(`/treasures.json`)
    .then(res => res.json())
      .then(treasures => {
        debugger;

        $('#app-container').html('')
        treasures.forEach(treasure => {
          let newTreasure = new Treasure(treasure)
          let treasureHTML = newTreasure.formatIndex();
          $('#app-container').append(treasureHTML);
        });
        var l = $('<button id="list_sort_btn" type="button" name="button" style="white-space: nowrap;">Sort List</button>')
        $('#app-container').append(l);
      });
  }

function Treasure(treasure) {
  this.id = treasure.id
  this.name = treasure.name
  this.description = treasure.description
  this.theories = treasure.theories
  this.users = treasure.users
}

Treasure.prototype.formatIndex = function() {
  let treasureHTML = `
    <a href="/treasures/${this.id}" class="show_link" data_id="${this.id}">${this.name}</a>
    <p>${this.users[0].username}</p><br><br><br>
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

const getSortedTreasures = () => {
  fetch(`/treasures.json`)
    .then(res => res.json())
      .then(treasures => {
        $('#app-container').html('')
        treasures.sort(function(a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }).forEach(treasure => {
          let newTreasure = new Treasure(treasure)
          let treasureHTML = newTreasure.formatIndex();
          $('#app-container').append(treasureHTML);
        });
      });
  }
