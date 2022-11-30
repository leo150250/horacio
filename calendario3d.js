//Calendário 3D
const div_wrapperCalendario=document.getElementById("wrapperCalendario");
const div_calendario=document.getElementById("calendario");

var setMoverCalendario=0;
var setRotacionarCalendario=0;
var moverMouseX=0;
var moverMouseY=0;
var rodarMouseX=0;
var rodarMouseY=0;
var setEscala=1;
var setPosX=0;
var setPosY=0;
var setRotX=0;
var setRotY=0;
div_wrapperCalendario.addEventListener("mousedown",(e)=>{
    if (e.buttons==1) {
        e.preventDefault();
        setMoverCalendario=1;
    }
    if (e.buttons==2) {
        e.preventDefault();
        setRotacionarCalendario=1;
    }
},true);
div_wrapperCalendario.addEventListener("contextmenu",(e)=>{
    if (setRotacionarCalendario==2) {
        e.preventDefault();
    }
    setRotacionarCalendario=0;
},true);
div_wrapperCalendario.addEventListener("wheel",(e)=>{
    if (setEscala<1) {
        setEscala-=Math.sign(e.deltaY)/10;
    } else {
        setEscala-=setEscala*(Math.sign(e.deltaY)/10);
    }
    if (setEscala<0.1) {
        setEscala=0.1;
    }
    ajustarTransformCalendario();
})
function moverCalendario(e) {
    if (setMoverCalendario==1) {
        setMoverCalendario=2;
        moverMouseX=e.clientX-(setPosX*setEscala);
        moverMouseY=e.clientY-(setPosY*setEscala);
    }
    if (setMoverCalendario==2) {
        setPosX=(e.clientX-moverMouseX)/setEscala;
        setPosY=(e.clientY-moverMouseY)/setEscala;
        ajustarTransformCalendario();
    }
    if (setRotacionarCalendario==1) {
        setRotacionarCalendario=2;
        rodarMouseY=e.clientX-(setRotY*5);
        rodarMouseX=e.clientY-(-setRotX*5);
    }
    if (setRotacionarCalendario==2) {
        setRotY=(e.clientX-rodarMouseY)/5;
        setRotX=(rodarMouseX-e.clientY)/5;
        ajustarTransformCalendario();
    }
}
function pararMoverCalendario(e) {
    if (setMoverCalendario>0) {
        setMoverCalendario=0;
    }
}
function ajustarTransformCalendario() {
    div_calendario.style.transform="scale("+setEscala+") rotateX("+setRotX+"deg) rotateY("+setRotY+"deg) translate("+setPosX+"px,"+setPosY+"px)";
}
function centralizarCalendario() {
    setPosX=(div_wrapperCalendario.offsetWidth/2);
    setPosY=(div_wrapperCalendario.offsetHeight/2);
    ajustarTransformCalendario();
}
document.addEventListener("mousemove",moverCalendario,true);
document.addEventListener("mouseup",pararMoverCalendario,true);

function criarLateral(argLado,argTexto,argTamanhoX=10,argTamanhoY=10,argDeslocamento=0) {
    let novoLado=document.createElement("div");
    novoLado.classList.add("c"+argLado);
    let transformacao="";
    switch (argLado) {
        case 1: transformacao="translate3d(0,0,0)"; break;
        case 2: transformacao="rotateY(90deg) translate3d(5em,0,5em)"; break;
        case 3: transformacao="rotateX(90deg) translate3d(0,-5em,5em)"; break;
        case 4: transformacao="rotateY(180deg) translate3d(0,0,10em)"; break;
        case 5: transformacao="rotateY(270deg) translate3d(-5em,0,5em)"; break;
        case 6: transformacao="rotateX(270deg) translate3d(0,5em,"+((-argTamanhoY/2)+argDeslocamento)+"em)"; break;
    }
    novoLado.innerHTML=argTexto;
    novoLado.style.width=argTamanhoX+"em";
    novoLado.style.height=argTamanhoY+"em";
    novoLado.style.transform=transformacao;
    return novoLado;
}
function criarCuboPlaceholder(argTamanhoX=10,argTamanhoY=10) {
    let novoCubo=document.createElement("div");
    novoCubo.classList.add("cubo");
    novoCubo.style.width=argTamanhoX+"em";
    novoCubo.style.height=argTamanhoY+"em";
    return novoCubo;
}
function criarCubo(argTexto,argTamanhoX=10,argTamanhoY=10,argTamanhoZ=10) {
    let novoCubo=criarCuboPlaceholder(argTamanhoX,argTamanhoY);
    novoCubo.appendChild(criarLateral(1,argTexto[0],argTamanhoX,argTamanhoY));
    novoCubo.appendChild(criarLateral(2,argTexto[1],argTamanhoZ,argTamanhoY));
    novoCubo.appendChild(criarLateral(3,argTexto[2],argTamanhoX,argTamanhoZ));
    //novoCubo.appendChild(criarLateral(4,argTexto[3],argTamanhoX,argTamanhoY));
    //novoCubo.appendChild(criarLateral(5,argTexto[4],argTamanhoZ,argTamanhoY));
    //novoCubo.appendChild(criarLateral(6,argTexto[5],argTamanhoX,argTamanhoZ,argTamanhoY));
    return novoCubo;
}
function criarLinhaPlaceholder() {
    let novaLinha=document.createElement("div");
    novaLinha.classList.add("linha");
    return novaLinha;
}
function criarLinha(argNomeLinha,argTamanhoY,argConteudo,argCubos=true) {
    let novaLinha=criarLinhaPlaceholder();
    let novoCubo=criarCuboPlaceholder(7,argTamanhoY);
    let novaLateral=criarLateral(1,argNomeLinha,7,argTamanhoY);
    novaLateral.classList.add("header");
    novoCubo.appendChild(novaLateral);
    novaLinha.appendChild(novoCubo);
    for (let i=0; i<argConteudo.length; i++) {
        let novoCubo=null;
        if (argCubos) {
            novoCubo=criarCubo([argConteudo[i],argConteudo[i],argConteudo[i],argConteudo[i],argConteudo[i],argConteudo[i]],10,argTamanhoY);
        } else {
            novoCubo=criarCuboPlaceholder(10,argTamanhoY);
            novaLateral=criarLateral(1,argConteudo[i],10,argTamanhoY);
            novaLateral.classList.add("header");
            novoCubo.appendChild(novaLateral);
        }
        novaLinha.appendChild(novoCubo);
    }
    return novaLinha;
}
function criarSecaoPlaceholder() {
    let novaSecao=document.createElement("div");
    novaSecao.classList.add("secao");
    return novaSecao;
}
function criarSecao(argNomeSecao,argColunas,argLinhas) {
    let novaSecao=criarSecaoPlaceholder();
    let novaLinha=criarLinha(argNomeSecao,3,argColunas,false);
    novaSecao.appendChild(novaLinha);
    for (let i=0; i<argLinhas.length; i++) {
        novaLinha=criarLinha(argLinhas[i],4,["","","","","","","",""]);
        novaSecao.appendChild(novaLinha);
    }
    return novaSecao;
}
function criarBox(argDias,argColunas,argLinhas) {
    let novoBox=document.createElement("div");
    novoBox.classList.add("box");
    let profundidade=0;
    for (let i=0; i<argDias.length; i++) {
        let dia="";
        switch (argDias[i]) {
            case 1: dia="Domingo"; break;
            case 2: dia="Segunda-feira"; break;
            case 3: dia="Terça-feira"; break;
            case 4: dia="Quarta-feira"; break;
            case 5: dia="Quinta-feira"; break;
            case 6: dia="Sexta-feira"; break;
            case 7: dia="Sábado"; break;
        }
        let novaSecao=criarSecao(dia,argColunas,argLinhas);
        novaSecao.style.transform="translate3d(0,0,"+profundidade+"em)";
        profundidade-=10;
        novoBox.appendChild(novaSecao);
    }
    return novoBox;
}
function criarCalendario() {
    let novoBox=criarBox([2,3,4,5,6],["Informática A","Informática B","Informática C","Agropecuária A","Agropecuária B","Física A","Matemática A","Matemática B"],["07:30","08:20","09:10","10:00","10:20","11:10","12:00","13:30","14:20","15:10","15:30","16:20","17:10"]);
    div_calendario.appendChild(novoBox);

    //centralizarCalendario();
}
criarCalendario();