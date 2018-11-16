var update = document.getElementById('update');

update.addEventListener('click', function () {
    let Darth = JSON.stringify({
        'id': '0202',
        'name': 'Darth Vader',
        'quote': 'I find your lack of faith disturbing.'
    });
    console.log("Darth: ", Darth);

    fetch('quotes', {
        method: 'put',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': '0202',
            'name': 'Darth Vader',
            'quote': 'I find your lack of faith disturbing.'
        })
    });
});



var del = document.getElementById('delete');

del.addEventListener('click', function () {
    fetch('quotes', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'darth'
        })
    })
        .then(res => {
            if (res.ok) return res.json();
        }).
        then(data => {
            console.log(data);
            window.location.reload();
        });
});

