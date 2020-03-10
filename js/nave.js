//Codigos Unicos para direcao
var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;
var DIRECAO_CIMA = 3;
var DIRECAO_BAIXA = 4;

function Nave(context, teclado, imagem, imgExplosao, musica){
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.imgExplosao = imgExplosao;
    this.musica = musica;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.direcao = DIRECAO_CIMA;
    this.spritesheet = new Spritesheet(context, imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
    this.acabaramVidas = null;
    this.vidasExtras = 3;
}

Nave.prototype = {
    atualizar: function(){
        var incremento = this.velocidade * this.animacao.decorrido/ 1000;
        if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0){
            this.direcao = DIRECAO_ESQUERDA;
            this.x -= incremento;
        }
        if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36){
            this.direcao = DIRECAO_DIREITA;
            this.x += incremento;
        }
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 0){
            this.direcao = DIRECAO_CIMA;
            this.y -= incremento;
        }
        if(this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48){
            this.direcao = DIRECAO_BAIXA;
            this.y += incremento;
        }
    },
    desenhar: function (){
        if (this.teclado.pressionada(SETA_ESQUERDA))
            this.spritesheet.linha = 1;
        else if (this.teclado.pressionada(SETA_DIREITA))
            this.spritesheet.linha = 2;
        else
            this.spritesheet.linha = 0;

        this.spritesheet.desenhar(this.x,this.y);
        this.spritesheet.proximoQuadro();
    },
    atirar: function() {
        var t = new Tiro(this.context, this);
    
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    retangulosColisao: function(){
        // Valores vão sendo ajustados aos poucos
        var rets = [
            {x: this.x+2, y: this.y+19, largura: 9, altura: 13},
            {x: this.x+13, y: this.y+3, largura: 10, altura: 33},
            {x: this.x+25, y: this.y+19, largura: 9, altura: 13}
        ];

        // Desenhando os retângulos para visualização
        // var ctx = this.context;
        // for(var i in rets) {
        //     ctx.save();
        //     ctx.strokeStyle = 'yellow';
        //     ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
        //     ctx.restore();
        // }
        return rets;

    },
    colidiuCom: function(outro) {
        // Se colidiu com um Ovni...
        if (outro instanceof Ovni){
            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(outro);
            

            var exp1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            var exp2 = new Explosao(this.context, this.imgExplosao, outro.x, outro.y);

            this.animacao.novoSprite(exp1);
            this.animacao.novoSprite(exp2);
            var nave = this;
            exp1.fimDaExplosao = function() {
                nave.vidasExtras--;
                if(nave.vidasExtras < 0){
                    if (nave.acabaramVidas) nave.acabaramVidas();
                } else {
                    // Recolocar a nave no engine
                    nave.colisor.novoSprite(nave);
                    nave.animacao.novoSprite(nave);
                    nave.posicionar();
                }
            }
 
        }
    },
    posicionar : function () {
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 18;
        this.y = canvas.height -48;
    }
}

Object.defineProperty(Nave.prototype, 'constructor', {
    value: Nave,
    enumerable: false,
    writable : true
});