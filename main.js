
// Fetch Comic

const url = "http://www.gocomics.com/calvinandhobbes";
$.ajax({
    url: url,
    method: 'GET',
    crossDomain: true
}).then((responseData) => {
  html = $.parseHTML(responseData);
  $.each(html, (i, el) => {
      if(el.className === 'amu-container-global') {
          const comicSrc = el.getElementsByClassName("item-comic-image")[0].children[0].src
          $('#comic').attr('src', comicSrc);
      }
  });
});

// Get the time
function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const fullTime = `${hours}:${minutes}:${("0" + seconds).slice(-2)}`;
    $('#hours').html(("0" + hours).slice(-2));
    $('#minutes').html(("0" + minutes).slice(-2));
    $('#seconds').html(("0" + seconds).slice(-2));
    $('#date').html(now.toDateString());
}

setDate();
setInterval(setDate, 1000);
