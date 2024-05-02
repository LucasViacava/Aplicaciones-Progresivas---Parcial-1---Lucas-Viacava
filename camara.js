import spinner from './spinner.js'

window.addEventListener('load', function() {
    const imageDataWithPrefix = localStorage.getItem('capturedImage')
    if (imageDataWithPrefix) {
        const imageData = imageDataWithPrefix.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, '')
        document.getElementById('displayImage').src = imageDataWithPrefix
        setUpEventListeners(imageData)
        spinner.hide()
    } else {
        setErrorModal('Error', 'Ocurrió un error')
        window.location.href = 'index.html'
    }
})

function setErrorModal(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
    })
}

function setUpEventListeners(imageData) {
    const cancelButton = document.getElementById('cancelButton')
    cancelButton.addEventListener('click', function() {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "La imagen será eliminada permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Eliminada",
                text: "La imagen ha sido eliminada.",
                icon: "success"
                });
                window.location.href = 'index.html'
            }
        });
    })

    const publishButton = document.getElementById('publishButton')
    publishButton.addEventListener('click', function() {
        try {
            spinner.show()
            const title = document.getElementById('imageTitle').value
            const createdDate = getFormattedDate(new Date())
    
            const payload = {
                photoBase64: imageData,
                title: title,
                createdDate: createdDate
            }
            postImage(payload)
        } catch (error) {
            spinner.hide()
            setErrorModal('Error', 'Ocurrió un error')
        }
    })
}

function getFormattedDate(date) {
    const day = ('0' + date.getDate()).slice(-2)
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

function postImage(data) {
    fetch('https://6626e283b625bf088c06d64e.mockapi.io/api/v1/photos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        localStorage.removeItem('capturedImage')
        spinner.hide()
        window.location.href = 'index.html'
    })
    .catch(error => {
        spinner.hide()
        setErrorModal('Error', 'Ocurrió un error')
        console.error('Paso algo che:', error)
    })
}