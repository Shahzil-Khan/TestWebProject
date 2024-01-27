$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {



        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            $("#playButton").click(function () {

                var audio1 = new Audio('assets/INBOX.mp3');
                var audio2 = new Audio('assets/musica.mp3');
                var audio3 = new Audio('assets/Explodir.mp3');
                var audio4 = new Audio('assets/Perfect.mp3');
                var audio5 = new Audio('assets/Photograph.mp3');
                var audio6 = new Audio('assets/Next To Me.mp3');



                audio1.volume = 0.1;
                audio2.volume = 0.1;
                audio3.volume = 0.1;
                audio4.volume = 0.1;
                audio5.volume = 0.1;
                audio6.volume = 0.1;

                audio5.play();

                 audio5.addEventListener('ended', function () {
                    // Quando o áudio3 terminar, reproduza o áudio1 automaticamente
                    audio4.play();
                });

                 audio4.addEventListener('ended', function () {
                    // Quando o áudio3 terminar, reproduza o áudio1 automaticamente
                    audio6.play();
                });


                audio3.addEventListener('ended', function () {
                    // Quando o áudio3 terminar, reproduza o áudio1 automaticamente
                    audio1.play();
                });

                audio1.addEventListener('ended', function () {
                    // Quando o áudio1 terminar, reproduza o áudio2 automaticamente
                    audio2.play();
                });

                // Oculte o botão após iniciar a música
                // $("#playButton").hide();
            });
        }  
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "12/4": titulo = "April 12, 2017"; mensagem = "<p>The day when I got your message for the very first time on Instagram and honestly it was quite unexpected and I was so shy talking to you but at the end, it never felt like I talked to you for the first time</p>";break;
            case "14/5": titulo = "May 14, 2019"; mensagem = "<p>Something very unexpected, maybe odd and awkward happened to this day. A soldier went down and confessed what's inside of the heart. Everything changed that day, a fear or losing you but you understood and decided to be my side after a while but a shot that was worth it and It just felt like I've conquered the whole world.  </p>";break;
            case "09/06": titulo = "June 09, 2019"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>The day you sent me your picture for the very first time and I was like DAAAMNNNN SOMEONE PLEASE HOLD ON TO ME CUZ I'M FALLING LIKE OM SHANTI OM KA SHAHRUKH KHAN...</strong></p></section>";break;
            case "12/07": titulo = "July 12, 2019 "; mensagem = "<p>The time when we started to watch the shows together. It was the time when Stranger Things Season 1 came up maybe and we were watching and discussing together. Good Old days, dammnnn I miss this alot.</p>";break;
            case "final": titulo = "January 28, 2023"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Marking the the date today on the calender for the future that today is the date when you gave me your consent to never leave me and that on someday you'll be with me, by my side, forever...</strong></p></section>";break;    
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}