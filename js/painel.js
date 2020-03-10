function Painel(context, nave) {
    this.context = context;
    this.nave = nave;
    this.pontuacao = 10;
    this.spritesheet = new Spritesheet(context, nave.imagem, 3,2);
    this.spritesheet.linha = 0;
    this.spritesheet.coluna = 0;
}

Painel.prototype = {
    atualizar: function () {

    },
    desenhar: function() {
        var ctx = this.context;

        // Reduz o tamanho pela metade
        ctx.scale(0.5, 0.5);
        var x = 20;
        var y = 20;
        for(let i = 1; i <=this.nave.vidasExtras; i++){
            this.spritesheet.desenhar(x,y);
            x+=40;
        }
        // Torna a dobrar
        ctx.scale(2, 2);
        //Pontuação
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '18px sans-serif';
        ctx.fillText(this.pontuacao, 100, 27);
        ctx.restore();
    }


}

Object.defineProperty(Painel.prototype ,  'constructor', {
    value : Painel,
    enumerable : false,
    writable: true
})