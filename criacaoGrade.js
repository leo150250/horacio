const div_escolhaCriacao=document.getElementById("escolhaCriacao");
const div_formCriacao=document.getElementById("formCriacao");
const div_formTurmas=document.getElementById("formTurmas");
const div_formConfirmacao=document.getElementById("formConfirmacao");
const div_formEditorGrade=document.getElementById("formEditorGrade");
const div_wrapperAutoCalendarioTurnos=document.getElementById("wrapperCalendarioTurnos");
const div_turnosAdicionais=document.getElementById("turnosAdicionais");
const div_wrapperAutoCalendarioTurmas=document.getElementById("wrapperCalendarioTurmas");
const div_turmasAdicionais=document.getElementById("turmasAdicionais");
const div_wrapperAutoCalendarioConfirmar=document.getElementById("wrapperCalendarioConfirmar");

var numTurnos=1;
var calendario=[[2,3,4,5,6],['07:30A', '08:20A', '09:10A', '10:00I', '10:10A', '11:00A', '11:50F'],['Informática A', 'Informática B', 'Matemática A', 'Matemática B', 'Agropecuária']];
var numTurmas=1;
var turnosAdicionais=[];

var mascoteAcionado=false;

var acaoMascote=0;
var acoesMascote=[
	["Todos os horários tem sua base nos dias. Certifique-se de marcar os dias corretos aqui!","Entendi!","executarExplicacaoCriacaoAuto()","diasSemana_sab"],
	["Cada turno precisa destas informações para que eu possa entender como será a distribuição das horas neste calendário.","Entendi!","executarExplicacaoCriacaoAuto()","duracaoIntervalo_t1"],
	["Todas as mudanças que você fizer no turno serão atualizadas aqui na pré-visualização, para que você compreenda melhor a situação atual das informações.","Entendi!","executarExplicacaoCriacaoAuto()","wrapperCalendarioTurnos"],
	["Caso este horário tenha mais de um período no dia, você pode adicionar mais turnos clicando aqui!","Entendi!","executarExplicacaoCriacaoAuto()","botaoNovoTurno"],
	["E não se preocupe: Se algo acontecer de errado, o programa irá alertá-lo, para que você faça as devidas correções!","Ok",null,null]
]
function executarExplicacaoCriacaoAuto() {
	balaoMascote(acoesMascote[acaoMascote][0],[[acoesMascote[acaoMascote][1],acoesMascote[acaoMascote][2]]],acoesMascote[acaoMascote][3]);
	acaoMascote++;
}

function fecharForms() {
	div_escolhaCriacao.style.display="none";
	div_formCriacao.style.display="none";
	div_formTurmas.style.display="none";
	div_formConfirmacao.style.display="none";
	div_formEditorGrade.style.display="none";
}
function abrirForm() {
	fecharForms();
	div_formCriacao.style.display="block";
	if (mascoteAcionado==false) {
		mascoteAcionado=true;
		setTimeout(aparecerMascote,1000);
	}
	autoAtualizarTurnos();
}
function autoAtualizarDias() {
	calendario[0]=[];
	if (document.getElementById("diasSemana_dom").checked) { calendario[0].push(1); }
	if (document.getElementById("diasSemana_seg").checked) { calendario[0].push(2); }
	if (document.getElementById("diasSemana_ter").checked) { calendario[0].push(3); }
	if (document.getElementById("diasSemana_qua").checked) { calendario[0].push(4); }
	if (document.getElementById("diasSemana_qui").checked) { calendario[0].push(5); }
	if (document.getElementById("diasSemana_sex").checked) { calendario[0].push(6); }
	if (document.getElementById("diasSemana_sab").checked) { calendario[0].push(7); }
	autoAtualizarTurnos();
}
function autoAtualizarTurnos() {
	calendario[1]=[];
	for(let turno=1; turno<=numTurnos; turno++) {
		let turnoHorario=document.getElementById("horario_t"+turno).value;
		let turnoAulas=parseInt(document.getElementById("aulas_t"+turno).value);
		let turnoDuracao=parseInt(document.getElementById("duracao_t"+turno).value);
		let turnoAulasIntervalo=parseInt(document.getElementById("aulasIntervalo_t"+turno).value);
		let turnoDuracaoIntervalo=parseInt(document.getElementById("duracaoIntervalo_t"+turno).value);
		let turnoHorario_hora=parseInt(turnoHorario.substring(0,2));
		let turnoHorario_minuto=parseInt(turnoHorario.substring(3,5));
		let configHorario="A";
		calendario[1].push(formatarHorario([turnoHorario_hora,turnoHorario_minuto])+configHorario);
		for (let i=0; i<turnoAulas; i++) {
			configHorario="A";
			if (i==turnoAulasIntervalo-1) {
				configHorario="I";
			}
			if (i==turnoAulas-1) {
				configHorario="F";
			}
			turnoHorario_minuto+=turnoDuracao;
			if (turnoHorario_minuto>=60) {
				turnoHorario_minuto-=60;
				turnoHorario_hora++;
			}
			calendario[1].push(formatarHorario([turnoHorario_hora,turnoHorario_minuto])+configHorario);
			if (i==turnoAulasIntervalo-1) {
				configHorario="A";
				turnoHorario_minuto+=turnoDuracaoIntervalo;
				if (turnoHorario_minuto>=60) {
					turnoHorario_minuto-=60;
					turnoHorario_hora++;
				}
				calendario[1].push(formatarHorario([turnoHorario_hora,turnoHorario_minuto])+configHorario);
			}
		}
		console.log(calendario[1]);
		gerarAutoCalendario("turnos");
	}
}
function gerarAutoCalendario(argTipo) {
	let wrapperGeracao=null;
	switch (argTipo) {
		case "turnos": wrapperGeracao=div_wrapperAutoCalendarioTurnos; break;
		case "turmas": wrapperGeracao=div_wrapperAutoCalendarioTurmas; break;
		case "confirmacao": wrapperGeracao=div_wrapperAutoCalendarioConfirmar; break;
	}
	wrapperGeracao.innerHTML="";
	wrapperGeracao.appendChild(document.createElement("div"));
	switch (argTipo) {
		case "turnos": {
			wrapperGeracao.style.gridTemplateColumns="repeat("+(calendario[0].length+1)+", auto)";
			calendario[0].forEach((diaDaSemana)=>{
				let novoDiaDaSemana=document.createElement("div");
				let textoDia="";
				switch (diaDaSemana) {
					case 1: textoDia="DOM"; break;
					case 2: textoDia="SEG"; break;
					case 3: textoDia="TER"; break;
					case 4: textoDia="QUA"; break;
					case 5: textoDia="QUI"; break;
					case 6: textoDia="SEX"; break;
					case 7: textoDia="SÁB"; break;
				}
				novoDiaDaSemana.innerHTML=textoDia;
				wrapperGeracao.appendChild(novoDiaDaSemana);
			});
			for(let horario=0; horario<calendario[1].length; horario++) {
				let novoHorario=document.createElement("div");
				novoHorario.innerHTML=calendario[1][horario].substring(0,5);
				let novaClasse=calendario[1][horario].substring(5,6);
				novoHorario.classList.add(novaClasse);
				wrapperGeracao.appendChild(novoHorario);
				if (novaClasse!="F") {
					for (let i=0; i<calendario[0].length; i++) {
						let placeholder=document.createElement("div");
						placeholder.innerHTML="-";
						placeholder.classList.add(calendario[1][horario].substring(5,6));
						wrapperGeracao.appendChild(placeholder);
					}
				} else {
					novoHorario.style.gridColumn="1 / "+(calendario[0].length+2);
				}
			}
		} break;
		case "turmas": {
			wrapperGeracao.style.gridTemplateColumns="repeat("+(calendario[2].length+1)+", auto)";
			calendario[2].forEach((nomeDaTurma)=>{
				let novaTurma=document.createElement("div");
				novaTurma.innerHTML=nomeDaTurma;
				wrapperGeracao.appendChild(novaTurma);
			});
			for(let horario=0; horario<calendario[1].length; horario++) {
				let novoHorario=document.createElement("div");
				novoHorario.innerHTML=calendario[1][horario].substring(0,5);
				let novaClasse=calendario[1][horario].substring(5,6);
				novoHorario.classList.add(novaClasse);
				wrapperGeracao.appendChild(novoHorario);
				if (novaClasse!="F") {
					for (let i=0; i<calendario[2].length; i++) {
						let placeholder=document.createElement("div");
						placeholder.innerHTML="-";
						placeholder.classList.add(calendario[1][horario].substring(5,6));
						wrapperGeracao.appendChild(placeholder);
					}
				} else {
					novoHorario.style.gridColumn="1 / "+(calendario[2].length+2);
				}
			}
		} break;
		case "confirmacao": {
			wrapperGeracao.appendChild(document.createElement("div"));
			wrapperGeracao.style.gridTemplateColumns="3em 3em repeat("+(calendario[2].length)+", auto)";
			calendario[2].forEach((nomeDaTurma)=>{
				let novaTurma=document.createElement("div");
				novaTurma.innerHTML=nomeDaTurma;
				wrapperGeracao.appendChild(novaTurma);
			});
			calendario[0].forEach((diaDaSemana,iterador)=>{
				let novoDiaDaSemana=document.createElement("div");
				let textoDia="";
				switch (diaDaSemana) {
					case 1: textoDia="Domingo"; break;
					case 2: textoDia="Segunda"; break;
					case 3: textoDia="Terça"; break;
					case 4: textoDia="Quarta"; break;
					case 5: textoDia="Quinta"; break;
					case 6: textoDia="Sexta"; break;
					case 7: textoDia="Sábado"; break;
				}
				novoDiaDaSemana.innerHTML=textoDia;
				novoDiaDaSemana.style.gridRow=(2+(iterador*calendario[1].length)) + " / " + (2+(iterador*calendario[1].length)+(calendario[1].length-1));
				wrapperGeracao.appendChild(novoDiaDaSemana);
				for(let horario=0; horario<calendario[1].length; horario++) {
					let novoHorario=document.createElement("div");
					novoHorario.innerHTML=calendario[1][horario].substring(0,5);
					let novaClasse=calendario[1][horario].substring(5,6);
					novoHorario.classList.add(novaClasse);
					wrapperGeracao.appendChild(novoHorario);
					if (novaClasse!="F") {
						for (let i=0; i<calendario[2].length; i++) {
							let placeholder=document.createElement("div");
							placeholder.innerHTML="-";
							placeholder.classList.add(calendario[1][horario].substring(5,6));
							wrapperGeracao.appendChild(placeholder);
						}
					} else {
						novoHorario.style.gridColumn="2 / "+(calendario[2].length+3);
					}
				}
			});
		}
	}
}
function adicionarNovoTurno() {
	numTurnos++;
	let novoTitulo=document.createElement("h2");
	novoTitulo.innerHTML="Turno #"+numTurnos;
	let novoBotaoRemover=document.createElement("button");
	novoBotaoRemover.innerHTML="<img src=\"imagens/remocao.svg\"> Remover";
	novoBotaoRemover.onclick=(e)=>{
		removerTurno(numTurnos);
	};
	novoTitulo.appendChild(novoBotaoRemover);
	div_turnosAdicionais.appendChild(novoTitulo);
	let novoDivForm=document.createElement("div");
	novoDivForm.classList.add("flex");
	novoDivForm.appendChild(gerarInput(
		"horario_t"+numTurnos,
		"Horário de início",
		"time",
		formatarHorario(incrementarHorario(calcularTurno(numTurnos-1)[1],[1,30])),
		[["onchange","autoAtualizarTurnos()"],["required",null]])[0]);
	novoDivForm.appendChild(gerarInput(
		"aulas_t"+numTurnos,
		"Nº de aulas",
		"number",
		"5",
		[["onchange","autoAtualizarTurnos()"],["required",null],["min","1"],["max","10"]])[0]);
	novoDivForm.appendChild(gerarInput(
		"duracao_t"+numTurnos,
		"Duração da aula",
		"number",
		"50",
		[["onchange","autoAtualizarTurnos()"],["required",null],["min","5"],["max","180"]],
		"minutos")[0]);
	novoDivForm.appendChild(gerarInput(
		"aulasIntervalo_t"+numTurnos,
		"Nº de aulas antes do intervalo",
		"number",
		"3",
		[["onchange","autoAtualizarTurnos()"],["required",null],["min","1"],["max","10"]])[0]);
	novoDivForm.appendChild(gerarInput(
		"duracaoIntervalo_t"+numTurnos,
		"Duração do intervalo",
		"number",
		"10",
		[["onchange","autoAtualizarTurnos()"],["required",null],["min","5"],["max","180"]],
		"minutos")[0]);
	div_turnosAdicionais.appendChild(novoDivForm);
	autoAtualizarTurnos();
}
function calcularTurno(argTurno) {
	let resultado=[];
	let turnoHorario=document.getElementById("horario_t"+argTurno).value;
	let turnoAulas=parseInt(document.getElementById("aulas_t"+argTurno).value);
	let turnoDuracao=parseInt(document.getElementById("duracao_t"+argTurno).value);
	let turnoAulasIntervalo=parseInt(document.getElementById("aulasIntervalo_t"+argTurno).value);
	let turnoDuracaoIntervalo=parseInt(document.getElementById("duracaoIntervalo_t"+argTurno).value);
	let turnoHorario_hora=parseInt(turnoHorario.substring(0,2));
	let turnoHorario_minuto=parseInt(turnoHorario.substring(3,5));
	let resultadoDuracao=0;
	resultado[0]=[turnoHorario_hora,turnoHorario_minuto]; //Hora do início
	for (let i=0; i<turnoAulas; i++) {
		turnoHorario_minuto+=turnoDuracao;
		resultadoDuracao+=resultadoDuracao;
		if (turnoHorario_minuto>=60) {
			turnoHorario_minuto-=60;
			turnoHorario_hora++;
		}
		if (i==turnoAulasIntervalo-1) {
			turnoHorario_minuto+=turnoDuracaoIntervalo;
			resultadoDuracao+=turnoDuracaoIntervalo;
			if (turnoHorario_minuto>=60) {
				turnoHorario_minuto-=60;
				turnoHorario_hora++;
			}
		}
	}
	resultado[1]=[turnoHorario_hora,turnoHorario_minuto]; //Hora do encerramento
	resultado[2]=resultadoDuracao; //Duração, em minutos;
	return resultado;
}
function abrirFormTurmas() {
	fecharForms();
	div_formTurmas.style.display="block";
	autoAtualizarTurmas();
	sumirMascote();
}
function autoAtualizarTurmas() {
	calendario[2]=[];
	let maisUmaTurma=false;
	for(let turma=1; turma<=numTurmas; turma++) {
		maisUmaTurma=false;
		let nomeTurma=document.getElementById("nomeTurma_"+turma).value;
		if (turma>1 && nomeTurma!="") {
			maisUmaTurma=true;
			calendario[2].push(nomeTurma);
		} else if (turma==1 && nomeTurma!="") {
			maisUmaTurma=true;
			calendario[2].push(nomeTurma);
			document.getElementById("botaoConcluirEdicao").disabled=false;
		}
	}
	if (maisUmaTurma) {
		let p_novaTurma=document.createElement("p");
		let novoInput=gerarInput("nomeTurma_"+(numTurmas+1),"Turma #"+(numTurmas+1),"text","",[["onchange","autoAtualizarTurmas()"],["removivel",null]]);
		let novoBotaoRemover=document.createElement("button");
		novoBotaoRemover.innerHTML="<img src=\"imagens/remocao.svg\">";
		novoBotaoRemover.style.float="right";
		novoInput[0].appendChild(novoBotaoRemover);
		p_novaTurma.appendChild(novoInput[0]);
		div_turmasAdicionais.appendChild(p_novaTurma);
		novoInput[1].focus();
		numTurmas++;
	}
	console.log(calendario[2]);
	gerarAutoCalendario("turmas");
}
function abrirConfirmacao() {
	fecharForms();
	div_formConfirmacao.style.display="block";
	gerarAutoCalendario("confirmacao");
}
balaoMascote("Precisa de ajuda para preencher este formulário?",[["Sim","executarExplicacaoCriacaoAuto()"],["Não",null]]);
function abrirEditorGrade() {
	fecharForms();
	div_formEditorGrade.style.display="block";
	//console.log(calendario);
	editor_montarCalendario(calendario);
}

//DEBUG
//abrirForm();
//abrirFormTurmas();
//abrirConfirmacao();
//abrirEditorGrade();
//adicionarNovoTurno();