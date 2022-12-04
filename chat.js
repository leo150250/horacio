incluirCSS("chat.css");

//Geração
const div_wrapperChat = document.createElement("div");
div_wrapperChat.id="wrapperChat";
div_wrapperChat.setAttribute("recolhido",null);
const div_barraTopoClicavel = document.createElement("div");
div_barraTopoClicavel.classList.value="barra topo clicavel";
div_barraTopoClicavel.setAttribute("onclick","alternarExibirChat()");
var img_setaBarraTopo = document.createElement("img");
img_setaBarraTopo.src="imagens/seta.svg";
img_setaBarraTopo.style.flexGrow="0";
div_barraTopoClicavel.appendChild(img_setaBarraTopo);
var p_barraTopo = document.createElement("p");
p_barraTopo.innerHTML="Chat";
div_barraTopoClicavel.appendChild(p_barraTopo);
const span_notifNaoLidas = document.createElement("span");
span_notifNaoLidas.style.display="none";
span_notifNaoLidas.id="notifNaoLidas";
span_notifNaoLidas.classList.add("balaoNotif");
span_notifNaoLidas.innerHTML="0";
div_barraTopoClicavel.appendChild(span_notifNaoLidas);
const div_chat = document.createElement("div");
div_chat.id="chat";
const div_barraRodape = document.createElement("div");
div_barraRodape.classList.value="barra rodape inv";
const textarea_chatInput = document.createElement("textarea");
textarea_chatInput.id="chatInput";
div_barraRodape.appendChild(textarea_chatInput);
var button_enviarChat = document.createElement("button");
button_enviarChat.style.flexGrow="0";
button_enviarChat.onclick=enviarChat;
button_enviarChat.innerHTML="&gt;";
button_enviarChat.title="Enviar mensagem";
div_barraRodape.appendChild(button_enviarChat);
div_wrapperChat.appendChild(div_barraTopoClicavel);
div_wrapperChat.appendChild(div_chat);
div_wrapperChat.appendChild(div_barraRodape);
document.body.appendChild(div_wrapperChat);

const audio_chatAudio = document.createElement("audio");
var source_chatAudio = document.createElement("source");
source_chatAudio.type = "audio/ogg";
source_chatAudio.src = "sons/chat.ogg";
audio_chatAudio.appendChild(source_chatAudio);
audio_chatAudio.load();

//Variáveis
var naoLidas=0;

function enviarChat() {
    if (textarea_chatInput.value!="") {
        novoChat(0,textarea_chatInput.value);
        textarea_chatInput.value="";
    }
}
function novoChat(argRemetente,argTexto) {
    //console.log(argRemetente+": "+argTexto);
    novoFieldset=document.createElement("fieldset");
    novoLegend=document.createElement("legend");
    novoFieldset.appendChild(novoLegend);
    if (argRemetente==0) {
        novoFieldset.classList.add("proprio");
        argRemetente="Você";
    }
    novoLegend.innerHTML=argRemetente;
    novoFieldset.innerHTML+=argTexto;
    div_chat.appendChild(novoFieldset);
    if (div_wrapperChat.hasAttribute("recolhido")) {
        naoLidas++;
        computarNaoLidas();
    }
}
function computarNaoLidas() {
    if (naoLidas>0) {
        span_notifNaoLidas.innerHTML=naoLidas;
        span_notifNaoLidas.style.display="inline-block";
        //audio_chatAudio.play();
    } else {
        span_notifNaoLidas.style.display="none";
    }
}
function alternarExibirChat() {
    if (div_wrapperChat.hasAttribute("recolhido")) {
        div_wrapperChat.removeAttribute("recolhido");
        img_setaBarraTopo.style.transform="rotate(180deg)";
        naoLidas=0;
        computarNaoLidas();
    } else {
        div_wrapperChat.setAttribute("recolhido",null);
        img_setaBarraTopo.style.transform="rotate(0deg)";
    }
}

textarea_chatInput.addEventListener("keydown",(e)=>{
    if ((e.key=="Enter") && (!e.shiftKey)) {
        e.preventDefault();
        enviarChat();
    }
},true);

novoChat("Fulano","Oi pessoal. O horário escolar base está pronto e está na fase de sugestões. Até quinta-feira, por favor, analisem, sugiram e negociem os horários que vocês preferirem. 👍");
novoChat("Ciclano","Ok, obrigado!");
novoChat("Beltrano","Asilano, tem como trocar comigo a aula de sexta-feira à tarde, após o intervalo? Tenho uma consulta no hospital agendada");
setTimeout(()=>{
    novoChat("Asilano","Ok, tudo bem professor Beltrano. Aí você pega a da quinta-feira à noite então, isso?");
},15000);
setTimeout(()=>{
    novoChat("Beltrano","Isso mesmo. Obrigado!");
},19000);
setTimeout(()=>{
    novoChat("Asilano","👍👍");
},23000);