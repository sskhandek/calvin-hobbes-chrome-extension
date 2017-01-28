
// Fetch Comic
const url = "http://www.gocomics.com/calvinandhobbes";
var obj = localStorage.getItem('calvinandhobbes_url');
var currDate = new Date();
if (obj) {
    obj = JSON.parse(obj);
    if (obj.date == currDate.getDate()) {
        $('#comic').attr('src', obj.src);
    }
} else {
    $.ajax({
        url: url,
        method: 'GET',
        crossDomain: true
    }).then((responseData) => {
      html = $.parseHTML(responseData);
      $.each(html, (i, el) => {
          if(el.className === 'amu-container-global') {
              const comicSrc = el.getElementsByClassName("item-comic-image")[0].children[0].src
              localStorage.setItem('calvinandhobbes_url', JSON.stringify({src: comicSrc, date: currDate.getDate()}));
              $('#comic').attr('src', comicSrc);
          }
      });
    });

}

// Get the time
function setDate() {
    const now = new Date();
    $('#date').html(now.toLocaleDateString());
}
setDate();
