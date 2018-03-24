// Fetch Comic
const url = 'http://www.gocomics.com/calvinandhobbes';
const obj = localStorage.getItem('calvinandhobbes_url');
const currDate = new Date();
if (obj) {
  $('#comic').attr('src', obj);
}

$.ajax({
  url: url,
  method: 'GET',
  crossDomain: true,
})
  .then(responseData => {
    html = $.parseHTML(responseData);
    $.each(html, (i, el) => {
      if (el.className && el.className.includes('amu-container-global')) {
        const comicSrc = el.getElementsByClassName('item-comic-image')[0]
          .children[0].src;
        if (!obj || comicSrc !== obj) {
          localStorage.setItem('calvinandhobbes_url', comicSrc);
          $('#comic').attr('src', comicSrc);
        }
      }
    });
  })
  .fail(err => {
    console(err);
  });

// Get the time
function setDate() {
  const now = new Date();
  $('#date').html(now.toLocaleDateString());
}
setDate();

// // Randomly set background image

let arr = ['background-1.png', 'background-2.png', 'background-3.png'];
let imageUrl = arr[Math.floor(Math.random() * 3)];
let i = 'url(../images/' + imageUrl + ')  no-repeat center center fixed';
$('#main').css({
  background: i,
  'background-size': 'cover',
});
