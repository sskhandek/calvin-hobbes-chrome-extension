
// Fetch Comic
const url = "http://www.gocomics.com/calvinandhobbes";
const obj = localStorage.getItem('calvinandhobbes_url');
const currDate = new Date();
if (obj) {
    $('#comic').attr('src', obj);
}

$.ajax({
    url: url,
    method: 'GET',
    crossDomain: true
}).then((responseData) => {
  html = $.parseHTML(responseData);
  $.each(html, (i, el) => {
      if (el.className === 'amu-container-global') {
          const comicSrc = el.getElementsByClassName("item-comic-image")[0].children[0].src
          if (!obj || comicSrc !== obj) {
              localStorage.setItem('calvinandhobbes_url', comicSrc);
              $('#comic').attr('src', comicSrc);
          }
      }
  });
});

// Get the time
function setDate() {
    const now = new Date();
    $('#date').html(now.toLocaleDateString());
}
setDate();
