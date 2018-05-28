// pusher
const pusher = new Pusher('2f87c4ea4419adfd896c', {
  appId: '531491',
  // secret: 'c5978bac240ea630a611',
  cluster: 'eu',
  encrypted: true
});

const channel = pusher.subscribe('counter');

channel.bind('vote', data => {
      let elem = document.querySelector(`#vote-${data.item}`),
          votes = parseInt(elem.innerText);
      elem.innerText = votes + 1;
    });

const voteButtons = document.getElementsByClassName("vote-button");

function voteItem() {
    let vote_id = this.getAttribute("data-vote");

    //ajax with js fetch api
    fetch(`/vote?item_id=${vote_id}`)
        .catch( e => { console.log(e); });
}


(function() {
      for (var i = 0; i < voteButtons.length; i++) {
        voteButtons[i].addEventListener('click', voteItem);
      }
    })();