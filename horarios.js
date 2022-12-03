const div_status = document.getElementById("status");

var gestor=true;

function atualizarEtapa() {
    let dataAtual=new Date();
    let dataRestantePrazo=new Date(dataPrazoEtapa-dataAtual);
    let stringRestantePrazo=(dataRestantePrazo.getDate()-1)+":"+dataRestantePrazo.getHours()+":"+dataRestantePrazo.getMinutes()+":"+dataRestantePrazo.getSeconds();
    switch (etapa) {
        case 0: {
            div_status.innerHTML="Etapa de sugestões<br>Tempo restante: "+stringRestantePrazo;
        } break;
    }
}
function obterHorario(argHorarioString) {
    let horario_hora=parseInt(argHorarioString.substring(0,2));
	let horario_minuto=parseInt(argHorarioString.substring(3,5));
    return [horario_hora,horario_minuto];
}
function formatarHorario(argHorario) {
	let f_hora=argHorario[0].toString();
    if (f_hora.length==1) {
        f_hora="0"+f_hora;
    }
    let f_minuto=argHorario[1].toString();
    if (f_minuto.length==1) {
        f_minuto="0"+f_minuto;
    }
    return f_hora+":"+f_minuto;
}
function incrementarHorario(argHorario,argSoma) {
    argHorario[1]+=argSoma[1];
    if (argHorario[1]>=60) {
        argHorario[1]-=60;
        argHorario[0]++;
    }
    argHorario[0]+=argSoma[0];
    return argHorario;
}
function gerarInput(argID, argLabel, argTipo, argValor="", argAttribs=[], argPosLabel="", argInputInline=false) {
    let novoSpan=document.createElement("span");
	novoSpan.classList.add("form");
	let novoLabel=document.createElement("label");
	novoLabel.innerHTML=argLabel;
    novoSpan.appendChild(novoLabel);
	let novoInput=document.createElement("input");
	novoInput.id=argID
	novoInput.type=argTipo;
    novoInput.value=argValor;
	for (let i=0; i<argAttribs.length; i++) {
        novoInput.setAttribute(argAttribs[i][0],argAttribs[i][1]);
    }
    novoSpan.appendChild(novoInput);
    if (argPosLabel!="") {
        let novoPosLabel=document.createElement("small");
        novoPosLabel.innerHTML=argPosLabel;
        novoSpan.appendChild(novoPosLabel);
    }
    return [novoSpan,novoInput,novoLabel];
}
function incluirCSS(argArquivoCSS) {
    let novoCSS=document.createElement("link");
    novoCSS.href=argArquivoCSS;
    novoCSS.type="text/css";
    novoCSS.rel="stylesheet";
    document.head.appendChild(novoCSS);
}