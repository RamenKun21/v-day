const gifStages = [
     "https://media1.tenor.com/m/MKkJWYigjycAAAAC/cute-cat-cat-cute.gif",    // 0 normal
    "https://media1.tenor.com/m/ZsGv52SY0OAAAAAC/zuh-cat.gif",  // 1 confused
    "https://media1.tenor.com/m/YWRLnlD8TxIAAAAC/cat-please.gif",             // 2 pleading
    "https://media1.tenor.com/m/67hJkk5s-H4AAAAC/crying-crying-cat.gif",             // 3 sad
    "https://media1.tenor.com/m/I6WG5aQzlWcAAAAC/very-sad-cat-sad-cat.gif",       // 4 sadder
    "https://media1.tenor.com/m/0QkZnCmGFX0AAAAC/banana-cat-banana-cat-crying.gif",             // 5 devastated
    "https://media1.tenor.com/m/oObwAjW2IIoAAAAd/cat-cute-cat.gif",               // 6 very devastated
    "https://media1.tenor.com/m/oObwAjW2IIoAAAAd/cat-cute-cat.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "Pag Sure Ba 🤔",
    "Please Mi Amor... 🥺",
    "Pwease??? Napo 🙏💔",
    "I wanna make a future with you though... 😔",
    "Mag cry na gd koo! 😭",
    "ERKEY!! Can't catch me anyway 😝"
]

const yesTeasePokes = [
    "TRY DAW ANG NO 🤭",
    "Gusto gd ko ba 🤭",
    "You'll never know if you don't no 👀",
    "Huey alam ko mn na gusto mo 'ko pero sayang effort ko sa no button bala 🤭"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`

    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
