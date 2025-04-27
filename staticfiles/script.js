document.addEventListener('DOMContentLoaded', function () {
    const shorten = document.getElementById('shorten');
    const icon = document.getElementById('icon');
    const linkA = document.getElementById('linkA');
    const linkB = document.getElementById('linkB');
    const alertBox = document.getElementById("alertBox");
    const closebtn = document.getElementById("closebtn");
    const outer = document.getElementById("container");
    const popup = document.querySelector('.pop-up');
    const download = document.getElementById('download');
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
              .then(data => {
                linkB.value = data.linkB;
                generateQR(data.linkB);
                })
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

    function generateQR(link) {
        const container = document.getElementById('qrcode');
        container.innerHTML = ""; // clear previous QR
        new QRCode(container, {
          text: link,
          width: 200,
          height: 200,
        });
    }

    download.addEventListener('click', () => {
        const qrCanvas = document.querySelector('#qrcode canvas');
        if (!qrCanvas) {
            console.error('QR code not found!');
            return;
        }
        const dataURL = qrCanvas.toDataURL('image/png'); // Get base64 image
    
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'qrcode.png'; // File name
        a.click();
    });

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