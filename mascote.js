incluirCSS("mascote.css");

//Mascote
var mascote_posX=0;
var mascote_posY=document.body.offsetHeight+128;
var mascote_posAlvo=null;

const div_mascote=document.createElement("div");
div_mascote.id="mascote";
div_mascote.style.left=mascote_posX;
div_mascote.style.top=mascote_posY;
div_mascote.style.display="block";
const img_mascote=document.createElement("img");
img_mascote.src="imagens/mascote.svg";
const img_mascoteMao=document.createElement("img");
img_mascoteMao.src="imagens/mascote_mao.svg";
img_mascoteMao.classList.add("mao");
img_mascoteMao.style.display="none";
const div_balaoMascote=document.createElement("div");
div_balaoMascote.id="balaoMascote";
div_balaoMascote.classList.add("balao");
div_mascote.appendChild(img_mascote);
div_mascote.appendChild(img_mascoteMao);
div_mascote.appendChild(div_balaoMascote);
document.body.appendChild(div_mascote);

const div_botaoMascote=document.createElement("div");
div_botaoMascote.id="botaoMascote";
div_botaoMascote.setAttribute("recolhido",null);
div_botaoMascote.onclick=aparecerMascote;
const img_botaoMascote=document.createElement("img");
img_botaoMascote.src="imagens/iconeAjuda.svg";
div_botaoMascote.appendChild(img_botaoMascote);
document.body.appendChild(div_botaoMascote);

var ajudaInicial=null;

var obterAjuda=false;

function balaoMascote(argTexto,argBotoes,argIrPara=null,argEspecial=null) {
    div_balaoMascote.innerHTML="";
    let novoTexto=document.createElement("p");
    novoTexto.innerHTML=argTexto;
    div_balaoMascote.appendChild(novoTexto);
    if (argBotoes.length>0) {
        let novaLinha=document.createElement("hr");
        div_balaoMascote.appendChild(novaLinha);
        let linhaBotoes=document.createElement("p");
        linhaBotoes.style.textAlign="right";
        for (let i=0; i<argBotoes.length; i++) {
            let novoBotao=document.createElement("a");
            novoBotao.innerHTML=argBotoes[i][0];
            novoBotao.href="#";
			novoBotao.setAttribute("onclick","sumirMascote()");
            if (argBotoes[i][1]!=null) {
                novoBotao.setAttribute("onclick",argBotoes[i][1]);
			}
            linhaBotoes.appendChild(novoBotao);
        }
        div_balaoMascote.appendChild(linhaBotoes);
    }
    div_balaoMascote.style.display="block";
    if (argIrPara!=null) {
        reposicionarMascote(argIrPara);
    }
    if (ajudaInicial==null) {
        ajudaInicial="balaoMascote(";
        ajudaInicial+="\""+argTexto+"\"";
        ajudaInicial+=",[";
        for (let i=0; i<argBotoes.length; i++) {
            if (i>0) {
                ajudaInicial+=",";
            }
            ajudaInicial+="[";
            ajudaInicial+="\""+argBotoes[i][0]+"\"";
            if (argBotoes[i][1]==null) {
                ajudaInicial+=",null";
            } else {
                ajudaInicial+=",\""+argBotoes[i][1].replaceAll('"',"\\\"")+"\"";
            }
            ajudaInicial+="]";
        }
        ajudaInicial+="]);";
        console.log(ajudaInicial);
    }
}
function aparecerMascote() {
    reposicionarMascote(null);
    div_botaoMascote.setAttribute("recolhido",null);
    if (ajudaInicial!=null) {
        eval(ajudaInicial);
    }
}
function sumirMascote() {
    reposicionarMascote("!");
    div_botaoMascote.removeAttribute("recolhido");
}
function reposicionarMascote(argIrPara) {
    let posicao=[];
    let posicaoEscolhida=0;
    if (argIrPara==null) {
        console.log("Reposicionando para o rodapé da página")
        mascote_posAlvo=null;
        posicao[0]=[0,document.body.offsetHeight-64];
        img_mascoteMao.style.display="none";
    } else if (argIrPara=="!") {
        console.log("Reposicionando para fora da tela")
        mascote_posAlvo="!";
        posicao[0]=[0,document.body.offsetHeight+128];
        div_balaoMascote.style.display="none";
        img_mascoteMao.style.display="none";
    } else {
        console.log("Reposicionando para "+argIrPara)
        mascote_posAlvo=document.getElementById(argIrPara);   
        posicao[0]=[mascote_posAlvo.offsetLeft+mascote_posAlvo.offsetWidth,mascote_posAlvo.offsetTop+mascote_posAlvo.offsetHeight];
        posicao[1]=[mascote_posAlvo.offsetLeft-128,mascote_posAlvo.offsetTop+mascote_posAlvo.offsetHeight];
    }
    while (
        (posicao[posicaoEscolhida][0]+128>document.body.offsetWidth || posicao[posicaoEscolhida][1]+div_mascote.offsetHeight>document.body.offsetHeight)
    ) {
        if (posicaoEscolhida<posicao.length-1) {
            posicaoEscolhida++;
            console.log("Posição "+posicao[posicaoEscolhida-1].toString()+" fora da tela. Reposicionando para "+posicao[posicaoEscolhida].toString());
        } else {
            break;
        }
    }
    mascote_posX=posicao[posicaoEscolhida][0];
    mascote_posY=posicao[posicaoEscolhida][1];
    div_mascote.style.left=mascote_posX;
    div_mascote.style.top=mascote_posY;
    if (mascote_posX+64<document.body.offsetWidth/2) {
        div_balaoMascote.style.left=100;
    } else {
        let posXTemp=-240;
        if (mascote_posX+posXTemp<0) {
            posXTemp-=(mascote_posX-240);
        }
        div_balaoMascote.style.left=posXTemp;
    }
    if (mascote_posY+64>document.body.offsetHeight/2) {
        div_balaoMascote.style.top=-96;
    } else {
        let posYTemp=96;
        if (mascote_posY+posYTemp<0) {
            posYTemp-=(mascote_posY-240);
        }
        div_balaoMascote.style.top=posYTemp;
    }
    
}