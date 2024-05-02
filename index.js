import spinner from './spinner.js'

document.addEventListener('DOMContentLoaded', () => {
    spinner.show()
    fetchImages()
    addEventListeners()
    aFewJokes()
})

function fetchImages() {
    fetch('https://6626e283b625bf088c06d64e.mockapi.io/api/v1/photos')
    .then(response => response.json())
    .then(data => {
        renderImages(data)
        spinner.hide()
    })
    .catch(error => {
        setErrorModal('Error', 'Ocurrió un error')
        console.error('Paso algo che:', error)
    })
}

function setErrorModal(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
    })
}

function renderImages(imageData) {
    const gallery = document.getElementById('gallery')
    if(imageData.length === 0) {
        const noImage = document.createElement('div')
        noImage.className = 'no-image'

        const message = document.createTextNode('No se encontraron posts :(')
        noImage.appendChild(message)
        const lineBreak = document.createElement('br')
        noImage.appendChild(lineBreak)
        const sadFace = document.createTextNode('Proba subiendo el primero!')
        noImage.appendChild(sadFace)
    
        gallery.appendChild(noImage)
        return
    }
    
    imageData.forEach(item => {
        const container = document.createElement('div')
        container.className = 'image-container'
        
        const img = document.createElement('img')
        img.src = 'data:image/jpeg;base64,' + item.photoBase64
        
        const title = document.createElement('div')
        title.className = 'image-title'
        title.textContent = item.title
        
        const date = document.createElement('div')
        date.className = 'image-date'
        date.textContent = item.createdDate

        container.appendChild(img)
        container.appendChild(title)
        container.appendChild(date)
        
        gallery.appendChild(container)
    })
}

function addEventListeners() {
    const cameraButton = document.getElementById('cameraButton')
    const cameraInput = document.getElementById('cameraInput')

    cameraButton.addEventListener('click', function() {
        cameraInput.click()
    })

    cameraInput.addEventListener('change', () => {
        if (cameraInput.files.length > 0) {
            const file = cameraInput.files[0]
            const imgBlob = URL.createObjectURL(file)
            const imgElement = new Image()
            imgElement.onload = function() {
                const maxWidth = 800
                const scale = maxWidth / imgElement.width
                const canvasWidth = maxWidth
                const canvasHeight = imgElement.height * scale

                const canvas = document.createElement('canvas')
                canvas.width = canvasWidth
                canvas.height = canvasHeight
                const ctx = canvas.getContext('2d')

                ctx.drawImage(imgElement, 0, 0, canvasWidth, canvasHeight)
                const dataUrl = canvas.toDataURL('image/webp')
                localStorage.setItem('capturedImage', dataUrl)
                window.location.href = 'camara.html'
                URL.revokeObjectURL(imgBlob)
            }
            imgElement.src = imgBlob
        }
    })
}

function aFewJokes() {
    console.log('JS is a serious programming language')
    console.log('also JS:')
    console.log('Math.min() > Math.max() :', Math.min() > Math.max(), '???')
    console.log('null == 0 :', null == 0)
    console.log('null > 0 :', null > 0)
    console.log('null >= 0 :', null >= 0, ":o")
    console.log('[10, 1, 3].sort() :', [10, 1, 3].sort())
    console.log('0.1 + 0.2 :', 0.1 + 0.2)
    console.log('NaN == NaN :', NaN == NaN)
    console.log('typeof NaN :', typeof NaN)
}