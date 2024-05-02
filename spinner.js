const spinner = {
    show: function() {
        let spinner = document.getElementById('spinner')
        let spinnerOverlay = document.getElementById('overlay')
        spinner.style.display = 'block'
        spinnerOverlay.style.display = 'block'
    },
    hide: function() {
        let spinner = document.getElementById('spinner')
        let spinnerOverlay = document.getElementById('overlay')
        spinner.style.display = 'none'
        spinnerOverlay.style.display = 'none'
    }
}

export default spinner