function Animacao(context){
    this.context = context;
    this.sprites = [];
    this.ligado = false;
    this.processamentos = [];
    this.spritesExcluir = [];
    this.processamentosExcluir = [];
    this.ultimoCiclo = 0;
    this.decorrido = 0;

}

Animacao.prototype = {
    novoSprite : function(sprite){
        this.sprites.push(sprite);
        sprite.animacao = this;
    },
    ligar : function (){
        this.ultimoCiclo = 0;
        this.ligado = true;
        this.proximoFrame();
    },
    desligar: function(){
        this.ligado = false;
    },
    proximoFrame :  function (){
        if(!this.ligado){
            return;
        }
        var agora = new Date().getTime();
        if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
        this.decorrido = agora - this.ultimoCiclo;
      
        // A cada ciclo, limpamos as tela ou desenhamos um fundo
        // this.limparTela();

        // Atualizamos o estado dos Sprites
        for(let i in this.sprites){
            this.sprites[i].atualizar();
        }

        // Desenhamos os Sprites
        for(let i in this.sprites){
            this.sprites[i].desenhar();
        }

        //Processamentos gerais
        for(let i in this.processamentos){
            this.processamentos[i].processar();
        }

        //Processamento de Exclusões
        this.processarExclusoes();

        //Atualizar o instante do último ciclo
        this.ultimoCiclo = agora;

        // Chamamos o próximo ciclo
        requestAnimationFrame( () =>   {
            this.proximoFrame();
        });
    },
    processarExclusoes: function(){
        //Criar novos arrays
        var novoSprites = [];
        var novoProcessamentos = [];

        //Adicionar somente se não constar no array de excluídos
        for (var i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1){
                novoSprites.push(this.sprites[i]);
            }      
        }

        for (var i in this.processamentos) {
            if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1){
                novoProcessamentos.push(this.processamentos[i]);
            }      
        }

        //Limpar os arrays de excluões
        this.spritesExcluir = [];
        this.processamentosExcluir = [];

        //Substituir os arrays velhos pelos novos
        this.sprites = novoSprites;
        this.processamentos = novoProcessamentos;
    },
    limparTela : function() {
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
    },
    novoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    },
    excluirSprite: function(sprite) {
        this.spritesExcluir.push(sprite);
    },
    excluirProcessamento: function(processamento) {
        this.processamentosExcluir.push(processamento);
    }

};

Object.defineProperty(Animacao.prototype,'constructor',{
    value: Animacao,
    enumerable :false,
    writable : true
});


