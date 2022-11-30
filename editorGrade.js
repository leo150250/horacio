const div_wrapperEditorGrade=document.getElementById("wrapperEditorGrade");
const div_editGrade=document.getElementById("editGrade");
const div_editToolbar=document.getElementById("editToolbar");
const div_editListagens=document.getElementById("editListagens");

var ferramenta="editar";
let ferramentaAnterior=ferramenta;
function definirFerramenta(argFerramenta) {
    ferramentaAnterior=ferramenta;
    ferramenta=argFerramenta;
    console.log("Ferramenta alterada para: "+ferramenta);
}
var ferramentaCard=null;

var corProfessor_alt=0;
var corProfessor_var=120;
var corProfessor_lim=80;
var corProfessor_r=240;
var corProfessor_g=corProfessor_lim;
var corProfessor_b=corProfessor_lim;
function obterNovaCor() {
    let corRetornar="#";
    corRetornar+=corProfessor_r.toString(16).padStart(2,"0");
    corRetornar+=corProfessor_g.toString(16).padStart(2,"0");
    corRetornar+=corProfessor_b.toString(16).padStart(2,"0");
    switch (corProfessor_alt) {
        case 0: {
            corProfessor_g+=corProfessor_var;
            if (corProfessor_g>=240) {
                corProfessor_g=240;
                corProfessor_alt=1;
            }
        } break;
        case 1: {
            corProfessor_r-=corProfessor_var;
            if (corProfessor_r<=corProfessor_lim) {
                corProfessor_r=corProfessor_lim;
                corProfessor_alt=2;
            }
        } break;
        case 2: {
            corProfessor_b+=corProfessor_var;
            if (corProfessor_b>=240) {
                corProfessor_b=240;
                corProfessor_alt=3;
            }
        } break;
        case 3: {
            corProfessor_g-=corProfessor_var;
            if (corProfessor_g<=corProfessor_lim) {
                corProfessor_g=corProfessor_lim;
                corProfessor_alt=4;
            }
        } break;
        case 4: {
            corProfessor_r+=corProfessor_var;
            if (corProfessor_r>=240) {
                corProfessor_r=240;
                corProfessor_alt=5;
            }
        } break;
        case 5: {
            corProfessor_b-=corProfessor_var;
            if (corProfessor_b<=corProfessor_lim) {
                corProfessor_b=corProfessor_lim;
                corProfessor_alt=0;
            }
        } break;
    }
    //console.log(corRetornar);
    return corRetornar;
}

class Disciplina {
    constructor(argNome) {
        this.nome = argNome;
        this.card = document.createElement("div");
        this.card.classList.add("card");
        this.card.innerHTML = argNome;
        this.card.draggable = true;
        this.card.ondragstart=(e)=>{
            ferramentaCard=this;
            definirFerramenta("arrastarCardDisciplina");
        }
        this.card.ondragend=(e)=>{
            ferramentaCard=null;
            definirFerramenta(ferramentaAnterior);
        }
        div_listagemDisciplinas.appendChild(this.card);
    }
}
class Professor {
    constructor(argNome) {
        this.nome = argNome;
        this.corCampo = obterNovaCor();
        this.card = document.createElement("div");
        this.card.classList.add("card");
        this.card.innerHTML = argNome;
        this.card.style.backgroundColor=this.corCampo;
        this.card.draggable = true;
        this.card.ondragstart=(e)=>{
            ferramentaCard=this;
            definirFerramenta("arrastarCardProfessor");
        }
        this.card.ondragend=(e)=>{
            ferramentaCard=null;
            definirFerramenta(ferramentaAnterior);
        }
        div_listagemDocentes.appendChild(this.card);
    }
}
class Turma {
    constructor(argNome) {
        this.nome=argNome;
        this.elemento=document.createElement("div");
        this.elemento.innerHTML=this.nome;
        this.elemento.classList.add("turma");
    }
}
class Escola {
    constructor() {
        this.disciplinas=[];
        this.professores=[];
        this.grades=[];
        this.turmas=[];
        this.alertas=[];
    }
    criarNovaDisciplina(argNome) {
        let novaDisciplina=new Disciplina(argNome);
        this.disciplinas.push(novaDisciplina);
        return novaDisciplina;
    }
    criarNovoProfessor(argNome) {
        let novoProfessor=new Professor(argNome);
        this.professores.push(novoProfessor);
        return novoProfessor;
    }
    criarNovaTurma(argNome) {
        let novaTurma=new Turma(argNome);
        this.turmas.push(novaTurma);
        return novaTurma;
    }
    criarNovaGrade(argGrade) {
        let novaGrade=new Grade(argGrade);
        this.grades.push(novaGrade);
        return novaGrade;
    }
    criarNovoAlerta(argTexto, argCampo, argSeveridade=0) {
        let novoAlerta=new Alerta(argTexto,argCampo,argSeveridade);
        this.alertas.push(novoAlerta);
        button_listagemAlertas.classList.add("atencao");
        div_listagemAlertas.appendChild(novoAlerta.elemento);
    }
    limparAlertas() {
        this.alertas.forEach((alerta)=>{
            div_listagemAlertas.removeChild(alerta.elemento);
        })
        button_listagemAlertas.classList.remove("atencao");
        this.alertas=[];
    }
    pesquisarDisciplinas(argString) {
        let resultados=[];
        this.disciplinas.forEach((disciplina)=>{
            if (resultados.length<10) {
                if (disciplina.nome.toLowerCase().includes(argString.toLowerCase())) {
                    resultados.push(disciplina);
                }
            }
        });
        return resultados;
    }
    pesquisarProfessores(argString) {
        let resultados=[];
        this.professores.forEach((professor)=>{
            if (resultados.length<10) {
                if (professor.nome.toLowerCase().includes(argString.toLowerCase())) {
                    resultados.push(professor);
                }
            }
        });
        return resultados;
    }
    checarChoques() {
        this.limparAlertas();
        let choques=[];
        this.grades.forEach((grade)=>{
            let resultadoChoques=grade.checarChoques();
            if (resultadoChoques!=null) {
                resultadoChoques.forEach((choque)=>{
                    choques.push(choque);
                });
            }
        })
        return choques;
    }
    debug() {
        this.criarNovaDisciplina("Banco de dados I");
        this.criarNovaDisciplina("Estrutura de dados");
        this.criarNovaDisciplina("Matemática");
        this.criarNovaDisciplina("Português");
        this.criarNovoProfessor("Andréia Maciel");
        this.criarNovoProfessor("Leandro Gabriel");
        this.criarNovoProfessor("Jorge Werneck");
        this.criarNovoProfessor("Sérgio Nunes");
        console.log(this.checarChoques());
    }
}
class Grade {
    constructor(argGrade) {
        this.dias=[];
        argGrade[0].forEach(dia=>{
            let novoDia=new HorarioDia(dia);
            argGrade[1].forEach(horarioMomento=>{
                novoDia.adicionarMomento(obterHorario(horarioMomento),horarioMomento.substring(5));
            });
            this.dias.push(novoDia);
        });
        this.turmas=[];
        argGrade[2].forEach(turma=>{
            let novaTurma=new Turma(turma);
            this.turmas.push(novaTurma);
        })
        this.elementosTopo=[];
        this.elementosLateral=[];
    }
    gerarGrade() {
        let geracaoGrade=document.createElement("div");
        geracaoGrade.classList.add("grade");
        geracaoGrade.style.gridTemplateColumns="10em repeat("+(this.turmas.length)+", 15em)";
        let inicioGrade=document.createElement("div");
        inicioGrade.style.position="relative";
        inicioGrade.style.zIndex="2";
        inicioGrade.style.backgroundColor="#EEE";
        //inicioGrade.classList.add("campo");
        geracaoGrade.appendChild(inicioGrade);
        this.elementosLateral.push(inicioGrade);
        this.turmas.forEach(turma => {
            geracaoGrade.appendChild(turma.elemento);
            this.elementosTopo.push(turma.elemento);
        });
        this.dias.forEach(dia=>{
           dia.elemento.style.gridColumn="1 / "+(this.turmas.length+3);
           dia.elemento.style.gridTemplateColumns="5em 5em repeat("+(this.turmas.length)+", 15em)";
           dia.elementoLabel.style.gridRow="1 / "+(dia.momentos.length+1);
           this.elementosLateral.push(dia.elementoLabel);
           dia.momentos.forEach(horarioMomento=>{
                dia.elemento.appendChild(horarioMomento.elemento);
                this.elementosLateral.push(horarioMomento.elemento);
                if (horarioMomento.tipo!="F") {
                    this.turmas.forEach(turma => {
                        let geracaoCampo=horarioMomento.adicionarCampo(turma);
                        dia.elemento.appendChild(geracaoCampo.elemento);
                    });
                } else {
                    //horarioMomento.elemento.style.gridColumn="1 / "+(this.turmas.length+3);
                    horarioMomento.elemento.style.gridColumn="2 / 3";
                    let geracaoCampo=horarioMomento.adicionarCampo(null);
                    geracaoCampo.tipo="F";
                    geracaoCampo.elemento.style.gridColumn="3 / "+(this.turmas.length+3);
                    dia.elemento.appendChild(geracaoCampo.elemento);
                }
           });
           geracaoGrade.appendChild(dia.elemento);
        });
        return geracaoGrade;
    }
    moverTopo(argPosicao) {
        this.elementosTopo.forEach((elemento)=>{
            elemento.style.top=argPosicao;
        });
    }
    moverLateral(argPosicao) {
        this.elementosLateral.forEach((elemento)=>{
            elemento.style.left=argPosicao;
        });
    }
    checarChoques() {
        let choques=[];
        this.dias.forEach((dia)=>{
            let resultadoChoques=dia.checarChoques();
            if (resultadoChoques!=null) {
                resultadoChoques.forEach((choque)=>{
                    choques.push(choque);
                });
            }
        })
        return choques;
    }
}
class HorarioDia {
    constructor(argDia) {
        this.dia=argDia;
        this.elemento=document.createElement("div");
        this.elemento.classList.add("dia");
        this.elementoLabel=document.createElement("div");
        this.elementoLabel.classList.add("labelDia");
        this.elementoLabel.innerHTML=this.obterDiaExtenso();
        this.elemento.appendChild(this.elementoLabel);
        this.momentos=[];
    }
    adicionarMomento(argHorarioMomento,argTipo) {
        let novoHorarioMomento=new HorarioMomento(argHorarioMomento,this,argTipo);
        this.momentos.push(novoHorarioMomento);
    }
    obterDiaExtenso() {
        let textoDia="";
        switch (this.dia) {
            case 1: textoDia="Domingo"; break;
            case 2: textoDia="Segunda"; break;
            case 3: textoDia="Terça"; break;
            case 4: textoDia="Quarta"; break;
            case 5: textoDia="Quinta"; break;
            case 6: textoDia="Sexta"; break;
            case 7: textoDia="Sábado"; break;
       }
       return textoDia;
    }
    checarChoques() {
        let choques=[];
        this.momentos.forEach((momento)=>{
            let resultadoChoques=momento.checarChoques();
            if (resultadoChoques!=null) {
                resultadoChoques.forEach((choque)=>{
                    choques.push(choque);
                });
            }
        })
        return choques;
    }
}
class HorarioMomento {
    constructor(argHorario,argDia,argTipo) {
        this.momento=argHorario;
        this.dia=argDia;
        this.tipo=argTipo;
        this.elemento=document.createElement("div");
        this.elemento.classList.add("horario");
        switch (this.tipo) {
            case "I": this.elemento.classList.add("intervalo"); break;
            case "F": this.elemento.classList.add("fim"); break;
        }
        this.campos=[];
        this.atualizarElemento();
    }
    atualizarElemento() {
        this.elemento.innerHTML="";
        this.elemento.innerHTML+=this.obterMomentoFormatado();
        switch (this.tipo) {
            case "I": this.elemento.innerHTML+="<br>Intervalo"; break;
            case "F": this.elemento.innerHTML+="<br>Fim do turno"; break;
        }
    }
    obterMomentoFormatado() {
        return formatarHorario(this.momento);
    }
    adicionarCampo(argTurma) {
        let novoCampo=new HorarioCampo(this,argTurma);
        this.campos.push(novoCampo);
        return novoCampo;
    }
    checarChoques() {
        let alertas=[];
        let professoresChecagem=[];
        let relacaoProfessoresCampos=[];
        this.campos.forEach((campo)=>{
            if (campo.elemento.classList.contains("erro")) {
                campo.elemento.classList.remove("erro");
            }
            let resultadoAlertas=campo.checarAlertas();
            if (resultadoAlertas!=null) {
                resultadoAlertas.forEach((alerta)=>{
                    alertas.push(alerta);
                });
            }
            if (campo.professor!=null) {
                if (!professoresChecagem.includes(campo.professor)) {
                    professoresChecagem.push(campo.professor);
                    let novoArray=[];
                    novoArray[0]=campo.professor;
                    novoArray[1]=[campo];
                    novoArray[2]=false; //Há choque?
                    relacaoProfessoresCampos.push(novoArray);
                } else {
                    relacaoProfessoresCampos.forEach((relacao)=>{
                        if (relacao[0]==campo.professor) {
                            relacao[1].push(campo);
                            relacao[2]=true;
                        }
                    });
                }
            }
        })
        relacaoProfessoresCampos.forEach((relacao)=>{
            if (relacao[2]) {
                relacao[1].forEach((campoRelacionado)=>{
                    campoRelacionado.elemento.classList.add("erro");
                });
                escola.criarNovoAlerta("Há um choque de horário com o docente "+relacao[0].nome+".",relacao[1][0],2);
            }
        });
        return alertas;
    }
}
class HorarioCampo {
    constructor(argHorario,argTurma=null,argDisciplina=null,argProfessor=null) {
        this.horario=argHorario;
        this.turma=argTurma;
        this.disciplina=argDisciplina;
        this.professor=argProfessor;
        this.elemento=document.createElement("div");
        this.elemento.classList.add("campo");
        if (this.horario.tipo=="I") {
            this.elemento.classList.add("intervalo");
        }
        if (this.horario.tipo=="F") {
            this.elemento.classList.add("fim");
        }
        this.elemento.addEventListener("mouseenter",(e)=>{
            this.horario.elemento.classList.add("destaque");
            this.horario.dia.elementoLabel.classList.add("destaque");
            if (this.turma!=null) {
                this.turma.elemento.classList.add("destaque");
            }
            if (this.horario.tipo!="F") {
                div_editorCampoEspecial.style.left=(this.elemento.offsetLeft+this.elemento.offsetWidth+this.horario.dia.elemento.offsetLeft);
                div_editorCampoEspecial.style.top=(this.elemento.offsetTop+this.elemento.offsetHeight+this.horario.dia.elemento.offsetTop);
                if (ferramenta=="arrastarEspecial") {
                    executarFerramenta(e,this);
                } else {
                    campoEspecial=this;
                }
            }
        },true);
        this.elemento.addEventListener("mouseleave",(e)=>{
            this.horario.elemento.classList.remove("destaque");
            this.horario.dia.elementoLabel.classList.remove("destaque");
            if (this.turma!=null) {
                this.turma.elemento.classList.remove("destaque");
            }
        },true);
        if (this.horario.tipo!="F") {
            this.elemento.addEventListener("click",(e)=>{
                executarFerramenta(e,this);
            },true);
            this.elemento.ondragover=(e)=>{
                if (ferramenta=="arrastarCardDisciplina" || ferramenta=="arrastarCardProfessor") {
                    e.preventDefault();
                    this.elemento.classList.add("dragOver");
                }
            }
            this.elemento.ondragleave=(e)=>{
                this.elemento.classList.remove("dragOver");
            }
            this.elemento.ondrop=(e)=>{
                if (ferramenta=="arrastarCardDisciplina") {
                    e.preventDefault();
                    aplicarDisciplina(this,ferramentaCard);
                    this.atualizarElemento();
                }
                if (ferramenta=="arrastarCardProfessor") {
                    e.preventDefault();
                    aplicarProfessor(this,ferramentaCard);  
                    this.atualizarElemento();
                }
                this.elemento.classList.remove("dragOver");
            }
        }
        this.atualizarElemento();
    }
    atualizarElemento() {
        if (this.horario.tipo!="F") {
            this.elemento.innerHTML="";
            if (this.disciplina==null) {
                this.elemento.innerHTML+="-";
            } else {
                this.elemento.innerHTML+=this.disciplina.nome;
            }
            this.elemento.innerHTML+="<br>";
            if (this.professor==null) {
                this.elemento.innerHTML+="-";
                this.elemento.style.backgroundColor=null;
            } else {
                this.elemento.innerHTML+=this.professor.nome;
                this.elemento.style.backgroundColor=this.professor.corCampo;
            }
        }
    }
    obterDisciplina() {
        if (this.disciplina==null) {
            return "";
        } else {
            return this.disciplina.nome;
        }
    }
    obterProfessor() {
        if (this.professor==null) {
            return "";
        } else {
            return this.professor.nome;
        }
    }
    checarAlertas() {
        if (this.professor!=null && this.disciplina==null) {
            escola.criarNovoAlerta("O docente "+this.professor.nome+" não possui disciplina.",this,1);
        }
        if (this.disciplina!=null && this.professor==null) {
            escola.criarNovoAlerta("A disciplina "+this.disciplina.nome+" não possui docente",this,1);
        }
    }
}
class Alerta {
    constructor(argTexto, argCampo=null, argSeveridade=0) {
        this.texto=argTexto;
        this.campo=argCampo;
        this.severidade=argSeveridade;
        this.elemento=document.createElement("fieldset");
        this.elemento.classList.add("alerta");
        switch (this.severidade) {
            case 1: this.elemento.classList.add("aviso"); break;
            case 2: this.elemento.classList.add("erro"); break;
        }
        let cabecalhoAlerta=document.createElement("legend");
        cabecalhoAlerta.innerHTML=this.campo.horario.dia.obterDiaExtenso()+", "+this.campo.horario.obterMomentoFormatado();
        this.elemento.appendChild(cabecalhoAlerta);
        let paragrafoTexto=document.createElement("p");
        paragrafoTexto.innerHTML=this.texto;
        this.elemento.appendChild(paragrafoTexto);
        if (this.campo!=null) {
            this.elemento.onclick=(e)=>{
                this.campo.elemento.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            }
            this.elemento.style.cursor="pointer";
        }
    }
}

var escola = new Escola;

function editor_montarCalendario(argCalendario) {
    let novaGrade=escola.criarNovaGrade(argCalendario);
    argCalendario[2].forEach(nomeTurma => {
        escola.criarNovaTurma(nomeTurma);
    });
    div_editGrade.appendChild(novaGrade.gerarGrade());
    escola.debug();
}
div_editGrade.addEventListener("scroll",(e)=>{
    escola.grades.forEach((grade)=>{
        grade.moverTopo(div_editGrade.scrollTop);
        grade.moverLateral(div_editGrade.scrollLeft);
    });
},true);

var campoSendoEditado=null
var campoEspecial=null;
function executarFerramenta(argEvento,argCampo) {
    switch (ferramenta) {
        case "editar": {
            exibirEditorCampo();
            campoSendoEditado=argCampo;
            //console.log({argCampo});
            div_editorCampo.style.top=(argCampo.elemento.offsetTop+argCampo.horario.dia.elemento.offsetTop);
            div_editorCampo.style.left=(argCampo.elemento.offsetLeft+argCampo.horario.dia.elemento.offsetLeft);
            div_editorCampo.style.width=argCampo.elemento.offsetWidth;
            //div_editorCampo.style.minHeight=argCampo.elemento.offsetHeight;
            if (editorCampo_altura==0) {
                editorCampo_altura=div_editorCampo.offsetHeight;
            }
            div_editorCampo.style.height=argCampo.elemento.offsetHeight;
            div_editorCampo.style.animation="none";
            div_editorCampo.style.transition="none";
            spanTitulo_editorCampo.innerHTML=formatarHorario(argCampo.horario.momento);
            editorCampo_disciplinaEditando=argCampo.disciplina;
            editorCampo_professorEditando=argCampo.professor;
            input_editorCampo_disciplina.value=argCampo.obterDisciplina();
            input_editorCampo_professor.value=argCampo.obterProfessor();
            botao_editorCampo.onclick=()=>{
                aplicarAlteracoes();
            }
            setTimeout(()=>{
                div_editorCampo.style.animation="editorCampoAnim 0.2s forwards";
                div_editorCampo.style.transition="height 0.2s, opacity 0.5s";
                div_editorCampo.style.height=editorCampo_altura;
                div_editorCampo.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            },10);
        } break;
        case "arrastarEspecial": {
            if (argCampo.horario.tipo=="A") {
                camposArrastarEspecial.push(argCampo);
                argCampo.elemento.classList.add("selecionado");
            }
        }
    }
}
function aplicarDisciplina(argCampo,argDisciplina) {
    argCampo.disciplina=argDisciplina;
    calcularAlertas();
}
function aplicarProfessor(argCampo,argProfessor) {
    argCampo.professor=argProfessor;
    calcularAlertas();
}
function aplicarAlteracoes() {
    if (editorCampo_disciplinaEditando!=null) {
        aplicarDisciplina(campoSendoEditado,editorCampo_disciplinaEditando);
    } else {
        let textoDisciplina=input_editorCampo_disciplina.value;
        if (textoDisciplina!="") {
            let novaDisciplina=escola.criarNovaDisciplina(textoDisciplina);
            aplicarDisciplina(campoSendoEditado,novaDisciplina);
        } else {
            if (campoSendoEditado.disciplina!=null) {
                aplicarDisciplina(campoSendoEditado,null);
            }
        }
    }
    if (editorCampo_professorEditando!=null) {
        aplicarProfessor(campoSendoEditado,editorCampo_professorEditando);
    } else {
        let textoProfessor=input_editorCampo_professor.value;
        if (textoProfessor!="") {
            let novoProfessor=escola.criarNovoProfessor(textoProfessor);
            aplicarProfessor(campoSendoEditado,novoProfessor);
        } else {
            if (campoSendoEditado.professor!=null) {
                aplicarProfessor(campoSendoEditado,null);
            }
        }
    }
    campoSendoEditado.atualizarElemento();
    calcularAlertas();
    sumirEditorCampo();
}
function sumirEditorCampo() {
    div_editorCampo.style.opacity=0;
    div_editorCampo.style.pointerEvents="none";
    div_editorCampo.style.height=0;
    div_autoCompletarDisciplina.style.display="none";
    div_autoCompletarProfessor.style.display="none";
}
function exibirEditorCampo() {
    div_editorCampo.style.opacity=1;
    div_editorCampo.style.pointerEvents=null;
    input_editorCampo_disciplina.focus();
    div_autoCompletarDisciplina.style.display="none";
    div_autoCompletarProfessor.style.display="none";
}

var div_editorCampo=document.createElement("div");
div_editorCampo.classList.add("editorCampo");
div_editorCampo.classList.add("flex");
div_editorCampo.style.opacity=0;
div_editorCampo.style.pointerEvents="none";
div_editorCampo.addEventListener("keydown",(e)=>{
    if (e.key==="Escape") {
        sumirEditorCampo();
    }
});
var titulo_editorCampo=document.createElement("h2");
var spanTitulo_editorCampo=document.createElement("span");
spanTitulo_editorCampo.innerHTML="Aaaah!";
var botao_editorCampo=document.createElement("button");
botao_editorCampo.innerHTML="Ok";
titulo_editorCampo.appendChild(spanTitulo_editorCampo);
titulo_editorCampo.appendChild(botao_editorCampo);
div_editorCampo.appendChild(titulo_editorCampo);
var formEditorCampo_disciplina=gerarInput("editorCampo_disciplina","Disciplina","text");
var formEditorCampo_professor=gerarInput("editorCampo_professor","Docente","text");
var input_editorCampo_disciplina=formEditorCampo_disciplina[1];
input_editorCampo_disciplina.addEventListener("keydown",(e)=>{
    if (e.key==="Enter") {
        div_autoCompletarDisciplina.style.display="none";
        input_editorCampo_professor.focus();
    } else if (e.key==="ArrowDown") {
        e.preventDefault();
        autoCompletarDisciplina_selecionar(numero_autoCompletarDisciplina+1);
    } else if (e.key==="ArrowUp") {
        e.preventDefault();
        autoCompletarDisciplina_selecionar(numero_autoCompletarDisciplina-1);
    } else {
        autoCompletarDisciplina();
    }
});
var input_editorCampo_professor=formEditorCampo_professor[1];
input_editorCampo_professor.addEventListener("keydown",(e)=>{
    if (e.key==="Enter") {
        aplicarAlteracoes();
    } else if (e.key==="ArrowDown") {
        e.preventDefault();
        autoCompletarProfessor_selecionar(numero_autoCompletarProfessor+1);
    } else if (e.key==="ArrowUp") {
        e.preventDefault();
        autoCompletarProfessor_selecionar(numero_autoCompletarProfessor-1);
    } else {
        autoCompletarProfessor();
    }
});
div_editorCampo.appendChild(formEditorCampo_disciplina[0]);
div_editorCampo.appendChild(formEditorCampo_professor[0]);
div_editGrade.appendChild(div_editorCampo);
var editorCampo_altura=div_editorCampo.offsetHeight;

//Auto-completar Disciplina
var editorCampo_disciplinaEditando=null;
var div_autoCompletarDisciplina=document.createElement("div");
div_autoCompletarDisciplina.classList.add("autoCompletar");
div_autoCompletarDisciplina.style.display="none";
var numero_autoCompletarDisciplina=-1;
div_autoCompletarDisciplina.addEventListener("keydown",(e)=>{
    if (e.key==="Enter") {
        div_autoCompletarDisciplina.getElementsByTagName("button")[numero_autoCompletarDisciplina].click();
    } else if (e.key==="ArrowDown") {
        e.preventDefault();
        autoCompletarDisciplina_selecionar(numero_autoCompletarDisciplina+1);
    } else if (e.key==="ArrowUp") {
        e.preventDefault();
        autoCompletarDisciplina_selecionar(numero_autoCompletarDisciplina-1);
    } else {
        autoCompletarDisciplina();
    }
});
function autoCompletarDisciplina() {
    editorCampo_disciplinaEditando=null;
    numero_autoCompletarDisciplina=-1;
    div_autoCompletarDisciplina.style.display="block";
    div_autoCompletarDisciplina.style.left=formEditorCampo_disciplina[0].offsetLeft+div_editorCampo.offsetLeft+10;
    div_autoCompletarDisciplina.style.top=(formEditorCampo_disciplina[0].offsetTop+formEditorCampo_disciplina[0].offsetHeight+div_editorCampo.offsetTop);
    div_autoCompletarDisciplina.style.width=input_editorCampo_disciplina.offsetWidth-20;
    div_autoCompletarDisciplina.innerHTML="";
    let disciplinas=escola.pesquisarDisciplinas(input_editorCampo_disciplina.value);
    disciplinas.forEach((disciplina)=>{
        let novaDisciplinaCompletada=document.createElement("button");
        novaDisciplinaCompletada.classList.add("secundario");
        novaDisciplinaCompletada.innerHTML=disciplina.nome;
        novaDisciplinaCompletada.onclick=()=>{
            autoCompletarDisciplina_aplicar(disciplina);
        }
        div_autoCompletarDisciplina.appendChild(novaDisciplinaCompletada);
    });
}
function autoCompletarDisciplina_aplicar(argDisciplina) {
    editorCampo_disciplinaEditando=argDisciplina;
    div_autoCompletarDisciplina.style.display="none";
    input_editorCampo_disciplina.value=argDisciplina.nome;
    input_editorCampo_professor.focus();
}
function autoCompletarDisciplina_selecionar(argOpcao) {
    let opcoesDisciplinas=div_autoCompletarDisciplina.getElementsByTagName("button");
    if (opcoesDisciplinas.length>0) {
        if (argOpcao<=-1) {
            argOpcao=opcoesDisciplinas.length-1;
        }
        if (argOpcao>=opcoesDisciplinas.length) {
            argOpcao=0;
        }
        opcoesDisciplinas[argOpcao].focus();
        numero_autoCompletarDisciplina=argOpcao;
    }
}
div_editGrade.appendChild(div_autoCompletarDisciplina);
//Auto-completar Professor
var editorCampo_professorEditando=null;
var div_autoCompletarProfessor=document.createElement("div");
div_autoCompletarProfessor.classList.add("autoCompletar");
div_autoCompletarProfessor.style.display="none";
var numero_autoCompletarProfessor=-1;
div_autoCompletarProfessor.addEventListener("keydown",(e)=>{
    if (e.key==="Enter") {
        div_autoCompletarProfessor.getElementsByTagName("button")[numero_autoCompletarProfessor].click();
    } else if (e.key==="ArrowDown") {
        e.preventDefault();
        autoCompletarProfessor_selecionar(numero_autoCompletarProfessor+1);
    } else if (e.key==="ArrowUp") {
        e.preventDefault();
        autoCompletarProfessor_selecionar(numero_autoCompletarProfessor-1);
    } else {
        autoCompletarProfessor();
    }
});
function autoCompletarProfessor() {
    editorCampo_professorEditando=null;
    numero_autoCompletarProfessor=-1;
    div_autoCompletarProfessor.style.display="block";
    div_autoCompletarProfessor.style.left=formEditorCampo_professor[0].offsetLeft+div_editorCampo.offsetLeft+10;
    div_autoCompletarProfessor.style.top=(formEditorCampo_professor[0].offsetTop+formEditorCampo_professor[0].offsetHeight+div_editorCampo.offsetTop);
    div_autoCompletarProfessor.style.width=input_editorCampo_professor.offsetWidth-20;
    div_autoCompletarProfessor.innerHTML="";
    let professores=escola.pesquisarProfessores(input_editorCampo_professor.value);
    professores.forEach((professor)=>{
        let novoProfessorCompletado=document.createElement("button");
        novoProfessorCompletado.classList.add("secundario");
        novoProfessorCompletado.innerHTML=professor.nome;
        novoProfessorCompletado.onclick=()=>{
            autoCompletarProfessor_aplicar(professor);
        }
        div_autoCompletarProfessor.appendChild(novoProfessorCompletado);
    });
}
function autoCompletarProfessor_aplicar(argProfessor) {
    editorCampo_professorEditando=argProfessor;
    div_autoCompletarProfessor.style.display="none";
    input_editorCampo_professor.value=argProfessor.nome;
    input_editorCampo_professor.focus();
}
function autoCompletarProfessor_selecionar(argOpcao) {
    let opcoesProfessores=div_autoCompletarProfessor.getElementsByTagName("button");
    if (opcoesProfessores.length>0) {
        if (argOpcao<=-1) {
            argOpcao=opcoesProfessores.length-1;
        }
        if (argOpcao>=opcoesProfessores.length) {
            argOpcao=0;
        }
        opcoesProfessores[argOpcao].focus();
        numero_autoCompletarProfessor=argOpcao;
    }
}
div_editGrade.appendChild(div_autoCompletarProfessor);

var camposArrastarEspecial=[];
var div_editorCampoEspecial=document.createElement("div");
div_editorCampoEspecial.classList.add("editorCampoEspecial");
div_editorCampoEspecial.addEventListener("mousedown",(e)=>{
    if (e.button==0) {
        definirFerramenta("arrastarEspecial");
        campoEspecial.elemento.classList.add("selecionado");
        camposArrastarEspecial=[];
        sumirEditorCampo();
        document.body.onmouseup=(e)=>{
            camposArrastarEspecial.forEach(campo => {
                campoEspecial.elemento.classList.remove("selecionado");
                campo.elemento.classList.remove("selecionado");
                aplicarDisciplina(campo,campoEspecial.disciplina);
                aplicarProfessor(campo,campoEspecial.professor);
                campo.atualizarElemento();
                //console.log(campo);
            });
            definirFerramenta(ferramentaAnterior);
            document.body.onmouseup=null;
        };
    }
},true);
div_editGrade.appendChild(div_editorCampoEspecial);

function calcularAlertas() {
    console.log(escola.checarChoques());
}

//Listagens
const div_listagemAlertas = document.getElementById("listagemAlertas");
const div_listagemDocentes = document.getElementById("listagemDocentes");
const div_listagemDisciplinas = document.getElementById("listagemDisciplinas");
const button_listagemAlertas = document.getElementById("botaoListagemAlertas");
const button_listagemDocentes = document.getElementById("botaoListagemDocentes");
const button_listagemDisciplinas = document.getElementById("botaoListagemDisciplinas");
function exibirListagem(argListagem) {
    switch (argListagem) {
        case "alertas": {
            div_listagemAlertas.style.left="0%";
            div_listagemDocentes.style.left="100%";
            div_listagemDisciplinas.style.left="200%";
            button_listagemAlertas.classList.remove("secundario");
            button_listagemDocentes.classList.add("secundario");
            button_listagemDisciplinas.classList.add("secundario");
        } break;
        case "docentes": {
            div_listagemAlertas.style.left="-100%";
            div_listagemDocentes.style.left="0%";
            div_listagemDisciplinas.style.left="100%";
            button_listagemAlertas.classList.add("secundario");
            button_listagemDocentes.classList.remove("secundario");
            button_listagemDisciplinas.classList.add("secundario");
        } break;
        case "disciplinas": {
            div_listagemAlertas.style.left="-200%";
            div_listagemDocentes.style.left="-100%";
            div_listagemDisciplinas.style.left="0%";
            button_listagemAlertas.classList.add("secundario");
            button_listagemDocentes.classList.add("secundario");
            button_listagemDisciplinas.classList.remove("secundario");
        } break;
    }
}
exibirListagem("alertas");