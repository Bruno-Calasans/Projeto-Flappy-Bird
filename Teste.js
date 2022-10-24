

    // classe para lidar com o local onde o jogo acontecerá
    class Tela{

        constructor(id ,largura, altura){

            this.elemento = document.getElementById(id)

            this.menu = {
                elemento:  document.getElementById('menu'),
                pause: document.getElementById('play-pause'),
                restart: document.getElementById('restart'),
                controles: document.getElementById('controles')
            }
            
            // configuraçãoes iniciais da tela
            this.setLargura(largura)
            this.setAltura(altura)
        }

        // insere apenas um elemento na tela
        inserir(elemento){
            this.elemento.appendChild(elemento)
        }

        // inserindo mais de um elemento na tela
        inserirVários(array=[]){
            for(let elemento of array){
                this.inserir(elemento)
            }
        }

        // getters e setters
        get largura(){return Number(this.elemento.style.width.replace('px',''))}
        get altura(){return Number(this.elemento.style.height.replace('px',''))}

        setLargura(l){this.elemento.style.width = `${l}px`}
        setAltura(a){this.elemento.style.height = `${a}px`}
    }

    // classe para lidar com a pontução
    class Score{

        constructor(id){
            // configurações iniciais
            this.elementoScore = document.getElementById(id)
            this.elementoPontos = this.elementoScore.firstElementChild
        }

        // getters e setters
        get pontos(){return Number(this.elementoPontos.innerText)}
        setScore(valor){this.elementoPontos.innerText = valor}

        // manipulação de pontos
        aumentarScore(aumento=1){this.setScore(this.pontos + aumento)}
        diminuirScore(redução=1){this.setScore(this.pontos - redução)}

        resetar(){this.setScore(0)}
    }
    
    // classe para configurar e definir como o pássaro irá se movimentar
    class Bird{

            constructor(id, largura, altura, posLeft, posBottom, alturaMax){

                // configurações iniciais do objeto bird
                this.elemento = document.getElementById(id)
                this.setLargura(largura)
                this.setAltura(altura)
                this.setX(posLeft)
                this.setY(posBottom)

                // configurando limites do pássaro
                this.posMax = alturaMax - this.altura
                this.posMin = 0
                this.voando = false
                this.animando = false

                // guardando alguns parâmetros
                this.posXOriginal = posLeft
                this.posYOriginal = posBottom
            }

            // getters e setters
            get largura(){
                return Number(this.elemento.style.width.replace('px', ''))
            }
            setLargura(l){this.elemento.style.width = `${l}px`}
    
            get altura(){
                return Number(this.elemento.style.height.replace('px', ''))
            }
            setAltura(a){this.elemento.style.height = `${a}px`}
    
            // métodos relacionados com a posição do pássaro
            get posX(){
                return Number(this.elemento.style.left.replace('px', ''))
            }
            setX(x){this.elemento.style.left = `${x}px`}
    
            get posY(){
                return Number(this.elemento.style.bottom.replace('px', ''))
            }

            setY(y){this.elemento.style.bottom = `${y}px`}

            resetar(){
                this.setX(this.posXOriginal)
                this.setY(this.posYOriginal)
            }
    
            // métodos relacionados com o movimento do pássaro
            subir(deslocamento){
    
                let posAtual = this.posY

                if(posAtual + deslocamento <= this.posMax){
                    this.setY(posAtual + deslocamento)
    
                }else{
                    this.setY(this.posMax)
                }
                
            }
    
            descer(deslocamento){
    
                let posAtual = this.posY
                if(posAtual - deslocamento >= this.posMin){
                    this.setY(posAtual - deslocamento)
    
                }else{
                    this.setY(this.posMin)
                }
                
            }
    
            // começa a animação
            start (subida=8, descida=5, velocidade=25){
    
                if(this.animando) this.stop()
                this.animando = true
                this.timerID = setInterval(()=>{
    
                    if(this.voando){
                        this.subir(subida)
    
                    }else{
                        this.descer(descida)
                    }
                }, velocidade)
            }

            animar(subida=8, descida=5){

                if(this.voando){
                    this.subir(subida)

                }else{
                    this.descer(descida)
                }
            }
    
            // para a animação
            stop(){
                clearInterval(this.timerID)
                this.animando = false
            }
    }

    

    // funções genéricas -------------------------------------------------------

    // sortea um número inteiro 
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    // cria um elemento HTML genérico da classe escolhida
    function criarElemento(tag, classe){
        let novoElemento = document.createElement(tag)
        novoElemento.className = classe
        return novoElemento
    }
    //--------------------------------------------------------------------------

    // classe para lidar com a parte superior de cada cano(head)
    class Head{

        constructor(largura, altura){

            this.elemento = criarElemento('div', 'head')
            // configurações iniciais
            this.setLargura(largura)
            this.setAltura(altura)
        }

        // métodos getters e setters
        setLargura(largura){this.elemento.style.width = `${largura}px`}
        setAltura(altura){this.elemento.style.height = `${altura}px`}
        get largura(){return Number(this.elemento.style.width.replace('px',''))}
        get altura(){return Number(this.elemento.style.height.replace('px',''))}
    }

    // classe para lidar com a parte inferior de cada cano(corpo)
    class Corpo{

        constructor(largura, altura){

            this.elemento = criarElemento('div', 'corpo')
            // configurações iniciais
            this.setLargura(largura)
            this.setAltura(altura)
        }

        // métodos getters e setters
        setLargura(largura){this.elemento.style.width = `${largura}px`}
        setAltura(altura){this.elemento.style.height = `${altura}px`}
        get largura(){return Number(this.elemento.style.width.replace('px',''))}
        get altura(){return Number(this.elemento.style.height.replace('px',''))}
    }

    // classe para lidar com os obstáculos(canos) do jogo
    class Cano{

        constructor(superior=true, 
            larguraCorpo=100, alturaCorpo=120,
            larguraHead=120, alturaHead=30){

            // criando as partes do cano
            this.corpo = new Corpo(larguraCorpo, alturaCorpo)
            this.head = new Head(larguraHead, alturaHead)
            
            if(superior){
                let canoSuperior = criarElemento('div', 'cano-superior')
                canoSuperior.appendChild(this.corpo.elemento)
                canoSuperior.appendChild(this.head.elemento)
                this.elemento = canoSuperior
    
            }else{
                let canoInferior = criarElemento('div', 'cano-inferior')
                canoInferior.appendChild(this.head.elemento)
                canoInferior.appendChild(this.corpo.elemento)
                this.elemento = canoInferior
            }
        }
    }

    // classe para lidar com o par de canos(cano superior e inferior)
    class Canos{

        constructor(altura, largura, abertura, posLeft=50){

            // o elemento canos e o cano superior e inferior
            this.elemento = criarElemento('div', 'canos')
            this.canoSuperior = new Cano()
            this.canoInferior = new Cano(false)
    
            // inserindos os canos inferior e superior dentro do elemento pai
            this.elemento.appendChild(this.canoSuperior.elemento)
            this.elemento.appendChild(this.canoInferior.elemento)

            // configurações inicias dos cano
            this.sortearAlturas(altura, abertura)
            this.setPosX(posLeft)
            this.setLargura(largura)
    
            // alterando a visibilidade dos canos
            this.elemento.style.display = 'flex'
        }

        // getters e setters
        setLargura(l){this.elemento.style.width = `${l}px`}
        setPosX(pos){this.elemento.style.left = `${pos}px`}

        get posX(){return Number(this.elemento.style.left.replace('px', ''))}
        get largura(){
            return Number(this.elemento.style.width.replace('px', ''))
        }
        
        // criando um método para determinar alturas aleatórias
        sortearAlturas(altura, abertura){
                
            // calculando o valor que será utilizado para determinar as alturas do cano inferior e superior
            let alturaRestante = altura - abertura - 60 // heads

            let alturaSuperior = randomInt(0, alturaRestante) 
            let alturaInferior = alturaRestante - alturaSuperior

            // alterando as alturas dos canos superior e inferior
            this.canoSuperior.corpo.setAltura(alturaSuperior)
            this.canoInferior.corpo.setAltura(alturaInferior)
        }
    
    }

    // define como cada par de canos será configurado, distribuído e movimentado na tela
    class OrganizaçãoCanos{

        constructor(altura, largura, abertura, posLeft, distancia, quantidade=0, objBird, objScore){

            this.canos = []
            // iniciando os métodos iniciais
            this.criarConjCanos(altura, largura, abertura, posLeft, quantidade)
            this.espaçarCanos(posLeft, distancia)

             // array apenas com os elementos da classe .canos
            this.elementos = this.canos.map((e) => e.elemento)

            // atributos relacionado com deslocamento
            this.deslocamento = 3
            this.altura = altura
            this.largura = largura
            this.abertura = abertura
            this.distancia = distancia
            this.quantidade = quantidade
            this.posLeft = posLeft

            //definindo os objetos que serão utilizados aqui
            this.bird = objBird
            this.score = objScore

            // atributos relacionados com animação
            this.timerID = null // identificador da função setInterval
            this.animando = false
        }

        // métodos iniciais
        criarConjCanos = function(alt, larg, abrt, pos, quantidade){
    
            for(let n = 1; n <= quantidade; n++){
                let cano = new Canos(alt, larg, abrt, pos)
                this.canos.push(cano)
            }
        }

        espaçarCanos = function(pos, dist){

            for(let cano of this.canos){
                cano.setPosX(pos)
                pos += dist + cano.largura
            }
        }

        // reinicia para as posições iniciais dos canos
        resetarPos(){

            this.canos.forEach((par)=>{
                par.sortearAlturas(this.altura, this.abertura)
            })

            this.espaçarCanos(this.posLeft, this.distancia)
        }

        // métodos para lidar com o deslocamento
        deslocar(deslocamento=this.deslocamento, direção='left'){
            
            // deslocamento para esquerda
            if(direção == 'left' || direção == ''){

                // cada elemento é um par de canos(superior e inferior)
                for(let par of this.canos){

                    // posição de cada par de canos
                    let posAtual = par.posX
                    par.setPosX(posAtual - deslocamento)

                    // verificando se o par saiu da tela
                    if(posAtual < -par.largura){ 
                        const calculo = this.quantidade * (this.largura + this.distancia)
                        par.sortearAlturas(this.altura, this.abertura)
                        par.setPosX(calculo)
                    }

                    // ajustando placar
                    let largPosBird = this.bird.largura + this.bird.posX
                    let largPosCano = posAtual + this.largura

                    //console.log(this.canos[1].posX);

                    // verificando se o cano passou do pássaro
                    const cond1 = largPosCano <= largPosBird 
                    const cond2 = largPosCano > largPosBird - this.deslocamento
                    
                    if(cond1 && cond2){
                        //console.log('teste: ', largPosCano);
                        this.score.aumentarScore()
                    }
                }

            }
            // deslocamento para direita
            else if(direção == 'right'){

                for(let elemento of this.canos){
                    let posAtual = elemento.getPosX()
                    elemento.setPosX(posAtual + d)
                }
            }
            
        }
    
        // métodos relacionados com animação

        // começa a animação
        start(intervalo=20, deslocamento=3){

            // verificando se já existe alguma animação rodando
            if(this.animando) this.stop()

            // transformando para segundos
            //const segundos = intervalo * 1000
            this.animando = true
            this.colidiu = false
            this.timerID = setInterval(
                ()=>{this.deslocar(deslocamento)}, intervalo
            )
        }

        animar(deslocamento=3){

            if(this.animando) this.stop()
            this.deslocar(deslocamento)
        }

        // para a animação
        stop(){
            clearInterval(this.timerID)
            this.animando = false
        }

    }

   // verfica se dois elementos HTML colidem
   function checkColisão(elementoA, elementoB){

        const a = elementoA.getBoundingClientRect()
        const b = elementoB.getBoundingClientRect()

        /*------------------------------------------*/
        // elementoA colide com a frente do elementoB
        const colFrontal = a.left + a.width >= b.left

        // elementoA colide com a traseira do elementoB
        const colTraseira = b.left + b.width >= a.left

        // colisão horizontal 
        const horizontal = colFrontal && colTraseira

        /*------------------------------------------*/
        // elementoA colide em cima do elementoB
        const colSuperior = a.top + a.height >= b.top

        // elementoA colide embaixo do elementoB
        const colInferior = b.top + b.height >= a.top

        // colisão vertical
        const vertical = colSuperior && colInferior
        /*------------------------------------------*/

        return horizontal && vertical
    }

    // função específica para lidar com a colisão entre o pássaro e cada par de canos
    function colidiu(bird, paresCanos){

        let colidiram = false

        paresCanos.forEach(

            (parCano) => {

            // partes do cano superior do par de cano atual
            const supHead = parCano.canoSuperior.head.elemento
            const supCorpo = parCano.canoSuperior.corpo.elemento

            // colisão com as partes do cano superior
            let colSupHead = checkColisão(bird, supHead)
            let colSupCorpo = checkColisão(bird, supCorpo)

            // partes do cano inferior do par de cano atual
            const infHead = parCano.canoInferior.head.elemento
            const infCorpo = parCano.canoInferior.corpo.elemento

            // colisão com as partes do cano inferior
            let colInfHead = checkColisão(bird, infHead)
            let colInfCorpo = checkColisão(bird, infCorpo)

            // se já houver alguma colisão com uma de suas partes do par de cano atual, já encerra a função
            if(colSupHead || colSupCorpo || colInfHead || colInfCorpo){
                colidiram = true
                return colidiram
            }
            
        })
        return colidiram 
    }

    class Controles{

        constructor(objMenu){

            // teclas padrões
            this.teclas = {
                teclaVoar: ' ',
                teclaPausePlay: 'p',
                teclaRestart: 'r',
                teclaConfigControls: 'c',
            }
        
            // atributos relacionados com controle
            this.menu = objMenu
            this.pausado = true
        }

        // métodos relacionados com controles ----------------------------------
        addClick(objtTarget, callback){
            objtTarget.onclick = function(e){
                callback(e)
            }
        }

        addKeyDown(objTarget, tecla, callback, ){

            objTarget.addEventListener('keydown', function(e){
                if(e.key == tecla) callback(e)
            })
        
        }

        addKeyUp(objTarget, tecla, callback, ){

            objTarget.addEventListener('keyup', function(e){
                if(e.key == tecla) callback(e)
            })
        }

        // configurando os eventos para o objeto menu
        configMenu(objTarget, objMenu, tecla, callback){

            this.addClick(objMenu, callback)
            this.addKeyDown(objTarget, tecla, callback)
        }

        // configurando os eventos para o objeto bird
        configBird(objTarget, tecla, callback){

            // ao clicar ou segurar a tecla
            this.addKeyDown(objTarget, tecla, callback)

            // ao soltar a tecla
            this.addKeyUp(objTarget, tecla, callback)
        }

        configTeclaVoar(novaTecla){
            this.teclaVoar = novaTecla
            this.configBird(novaTecla)
        }

    }

    // classe onde poderemos configurar e controlar o jogo em si
    class FlappyBird{

        constructor(window){  

            this.window = window
            this.tela = new Tela('tela', 800, 400)
            this.score = new Score('score')
            this.bird = new Bird('bird', 50, 35, 200, 200, this.tela.altura)
            this.orgCanos = new OrganizaçãoCanos(
                this.tela.altura, // altura
                120, // largura
                150, // abertura
                this.tela.largura - 100,
                200,
                4,
                this.bird,
                this.score
            )

            // configurações iniciais
            this.tela.inserirVários(this.orgCanos.elementos)
            this.parado = true

            // configurando controles
            this.menu = this.tela.menu
            this.controles = new Controles(this.menu)

            this.configControles()
        }

        // métodos principais---------------------------------------------------
        startGame(velocidade=20){

            // se já existe um game rodando
            if(!this.parado) this.stopGame()

            this.parado = false
            this.temporizador = setInterval(

                () =>{

                    this.bird.animar()
                    this.orgCanos.animar()

                    // verificando colisão
                    let colidiram = colidiu(this.bird.elemento, this.orgCanos.canos)

                    // parando jogo caso haja colisão
                    if(colidiram) this.stopGame()
                    
                }
                ,velocidade
            )
        }

        stopGame(){
            clearInterval(this.temporizador)
            this.parado = true
        }

        reinciar(){

            if(!this.parado) this.stopGame()
            this.orgCanos.resetarPos()
            this.bird.resetar()
            this.score.resetar()
            this.startGame()
        }

        configControles(){

            // adicionando eventos para os elementos do menu
            let pause = this.menu.pause
            let restart = this.menu.restart
            let controles = this.menu.controles

            let pauseFunction = () =>{

                if(this.parado){
                    pause.firstElementChild.innerText = 'pause'
                    this.startGame()  
                }
                else{
                    pause.firstElementChild.innerText = 'play_arrow'
                    this.stopGame()
                }

            }

            // quando clicar no elemento pause
            this.controles.addClick(pause, pauseFunction)

            // quando digitar 'p'
            this.controles.addKeyDown(this.window, 'p', pauseFunction)

            // quando o jogo for reiniciado
            this.controles.addClick(restart, () => this.reinciar())

            // quando cliar em 'r'
            this.controles.addKeyDown(this.window, 'r', () => this.reinciar())

            // configurando o pássaro
            this.controles.addKeyDown(this.window, ' ', ()=>{
                this.bird.voando = true
            })

            this.controles.addKeyUp(this.window, ' ', ()=>{
                this.bird.voando = false
            })
        }
    }

    const game = new FlappyBird(window)

    

