const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const comecarOuPausarBotao = document.querySelector('#start-pause');
const comecarOuPausarTexto = document.querySelector('#start-pause span');
const comecarOuPausarIcone = document.querySelector('.app__card-primary-butto-icon');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const somBeep = new Audio('sons/beep.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const temporizador = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true;


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 600
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTemporizador()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `imagens/${contexto}.png`)
    switch(contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
                break;
                 
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
                break;

        default:
            break;
    }
}

const comecarOuPausar = () => {
    if(intervaloId){
        pararTemporizador()
        somPause.play()
        comecarOuPausarIcone.setAttribute('src', 'imagens/play_arrow.png')
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    somPlay.play()
    comecarOuPausarTexto.textContent = 'Pausar'
    comecarOuPausarIcone.setAttribute('src', 'imagens/pause.png')
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        pararTemporizador()
        somBeep.play()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTemporizador();
}

comecarOuPausarBotao.addEventListener('click', comecarOuPausar)

function pararTemporizador() {
    clearInterval(intervaloId) 
    intervaloId = null
    comecarOuPausarTexto.textContent = 'Começar'
}

function mostrarTemporizador() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoDecorridoEmMinutos = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoDecorridoEmMinutos}`
}

mostrarTemporizador()


