$(() => {
  console.log("treasures.js loaded")
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $('.all_treasures').on('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, "treasures_list");
    console.log('default prevented at all_treasures');

    getTreasures();
  });
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
  $(document).on('click', 'next_treasure', function() {
    let id = $(this).attr('data_id');
    fetch(`treasures/${id}/next`)
  })
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
      });
}


// function newTreasureForm() {
//     $.ajax({
//       url: 'http://localhost:3000/treasures',
//       method: 'post',
//       dataType: 'json'
//     }).done(function() {
//       $('form').submit(function(event) {
//         event.preventDefault();
//         console.log("creating new treasure")
//
//         var values = $(this).serialize();
//         var posting = $.post('/treasures', values);
//         posting.done(function(data){
//           console.log("the data is...")
//         });
//       });
//       // document.querySelector('div#ajax-new-treasure-form').innerHTML = newTreasureForm
//       // console.log(newTreasureForm);
//
//       return (`
//         <strong>New Treasure Form</strong>
//         <form>
//           <input id="treasure-title" type="text" name="title" placeholder="Name"></input><br>
//           <input type="text" name="description" placeholder="Description"></input><br>
//           <input type="submit" />
//         </form>
//       `)
//     });
//   }

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
  let treasureHTML = `
    <h3>${this.name}</h3>
    <button class="next_treasure">Next</button>
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
