document.addEventListener('DOMContentLoaded', function () {
    const shorten = document.getElementById('shorten');
    const icon = document.getElementById('icon');
    const linkA = document.getElementById('linkA');
    const linkB = document.getElementById('linkB');
    const alertBox = document.getElementById("alertBox");
    const closebtn = document.getElementById("closebtn");
    const outer = document.getElementById("container");
    const popup = document.querySelector('.pop-up');
    const copy = document.getElementById('copy');
    const ok = document.getElementById('ok');

    linkA.addEventListener('input', () => {
        if (linkA.value !== ''){
            shorten.style.display = 'block';
            shorten.style.pointerEvents = 'auto';
            icon.style.color = "#59007A";
        }
        else{
            shorten.style.display = 'none';
            shorten.style.pointerEvents = 'none'; 
        }
    });

    shorten.addEventListener('click', (event) => {
        event.preventDefault();
        closeAlert();
        var url = linkA.value;
        if (url.includes('.')){
            fetch('', {
                method: 'POST',
                headers: {
                  'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({
                  linkA: linkA.value,
                }) // Convert data to JSON string
              })
              .then(response => response.json()) // Parse JSON response
              .then(data => linkB.value = data.linkB)
              .catch(error => console.error('Error:', error));
            outer.classList.add('blur');
            popup.style.display = 'block';
        }
        else{
            showAlert();
        }
    });

    closebtn.addEventListener('click', () => {closeAlert()})

    function showAlert() {
        alertBox.style.display = "block";
    }

    function closeAlert() {
        alertBox.style.display = "none";
    }

    copy.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(linkB.value);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    })
    
    ok.addEventListener('click', () => {
        popup.style.display = "none";
        outer.classList.remove('blur');
    })
})