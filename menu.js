incluirCSS("menu.css");

//Geração
const div_wrapperMenu = document.createElement("div");
div_wrapperMenu.id="wrapperMenu";
div_wrapperMenu.setAttribute("recolhido",null);
const div_menuBarraTopoClicavel = document.createElement("div");
div_menuBarraTopoClicavel.classList.value="barra topo clicavel";
div_menuBarraTopoClicavel.setAttribute("onclick","alternarExibirMenu()");
var img_logoBarraTopo = document.createElement("img");
img_logoBarraTopo.src="imagens/logo.svg";
img_logoBarraTopo.style.flexGrow="0";
img_logoBarraTopo.style.marginRight="0.5em";
div_menuBarraTopoClicavel.appendChild(img_logoBarraTopo);
var p_menuBarraTopo = document.createElement("p");
p_menuBarraTopo.innerHTML="Menu";
div_menuBarraTopoClicavel.appendChild(p_menuBarraTopo);
div_wrapperMenu.appendChild(div_menuBarraTopoClicavel);
const div_menu = document.createElement("div");
div_menu.id="menu";
div_menu.classList.add("dropdown");
const div_perfil = document.createElement("div");
div_perfil.classList.add("perfil");
var img_perfil = document.createElement("img");
img_perfil.src="imagens/usuario.svg";
div_perfil.appendChild(img_perfil);
var p_perfil = document.createElement("p");
p_perfil.innerHTML="Usuário da Silva<br><small>Gestor de horário</small>";
div_perfil.appendChild(p_perfil);
div_menu.appendChild(div_perfil);
const ul_opcoes = document.createElement("ul");
div_menu.appendChild(ul_opcoes);
div_wrapperMenu.appendChild(div_menu);
document.body.appendChild(div_wrapperMenu);
menu_novaOpcao("Home","index.html");
if (gestor) {
    menu_novaOpcao("Gestão","gestao.html");
}
menu_novaOpcao("Logoff","#");

function menu_novaOpcao(argOpcao,argLink,argIcone=null) {
    let novaOpcao_li=document.createElement("li");
    let novaOpcao_a=document.createElement("a");
    novaOpcao_a.innerHTML=argOpcao;
    novaOpcao_a.href=argLink;
    novaOpcao_li.appendChild(novaOpcao_a);
    ul_opcoes.appendChild(novaOpcao_li);
}
function alternarExibirMenu() {
    if (div_wrapperMenu.hasAttribute("recolhido")) {
        div_wrapperMenu.removeAttribute("recolhido");
    } else {
        div_wrapperMenu.setAttribute("recolhido",null);
        document.body.removeEventListener("click",alternarExibirMenu);
    }
}
div_wrapperMenu.onmouseenter=(e)=>{
    if (!div_wrapperMenu.hasAttribute("recolhido")) {
        document.body.removeEventListener("click",alternarExibirMenu);
    }
}
div_wrapperMenu.onmouseleave=(e)=>{
    if (!div_wrapperMenu.hasAttribute("recolhido")) {
        document.body.addEventListener("click",alternarExibirMenu);
    }
}