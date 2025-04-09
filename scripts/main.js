// Fetch Comic
const currDate = new Date();
const url = `https://www.gocomics.com/calvinandhobbes/${currDate.getFullYear()}/${currDate.getMonth() +
    1}/${currDate.getDate()}`;
console.log(url);
const obj = localStorage.getItem('calvinandhobbes_url');
if (obj) {
    $('#comic').attr('src', obj);
}

$.ajax({
    url: url,
    method: 'GET',
    crossDomain: true
}).then(
    responseData => {
        const html = $.parseHTML(responseData);
        let comicSrc = null;

        $(html).each((i, el) => {
            if (el.nodeType === 1) { // Element node
                const $img = $(el).find('section[class^="ShowComicViewer"] img[data-sentry-component="SiteImage"]');
                if ($img.length) {
                    comicSrc = $img.attr('src');
                    return false; // Break loop early
                }
            }
        });

        if (comicSrc) {
            const obj = localStorage.getItem('calvinandhobbes_url');
            if (!obj || comicSrc !== obj) {
                localStorage.setItem('calvinandhobbes_url', comicSrc);
                $('#comic').attr('src', comicSrc);
            }
        } else {
            console.error('Comic image not found.');
        }
    },
    err => {
        console.log(err);
    }
);

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
    'background-size': 'cover'
});
