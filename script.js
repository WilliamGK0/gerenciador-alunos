const alunos = []; // Array principal que armazena objetos


function calcularMediaNotas(notas) {
    if (!notas || notas.length === 0) return 0; //verificando se notas não existem ou está vazia

    let soma = 0;
    for (const n of notas) { //calculando média
        soma += n;
    }
    return soma / notas.length;
}

function AdicionarAluno() {
    const nome = prompt("Digite o nome do aluno para cadastrá-lo:");
    if (!nome) { alert("Nome inválido!"); return; } //caso retorne vazio

    const aluno = { nome: nome.trim(), notas: [] }; //cria objetos

    for (const a of alunos) { 
        if (a.nome.toLowerCase() === aluno.nome.toLowerCase()) { //verifca se o aluno já está cadastrado
            alert(`O aluno "${aluno.nome}" já está cadastrado!`);
            return;
        }
    }

    alunos.push(aluno); //aluno adicionado em alunos
    alert(`Aluno "${aluno.nome}" adicionado com sucesso!`);
}

function ListarAlunos() {
    if (alunos.length === 0) { alert("Nenhum aluno cadastrado."); return; } //caso não tenha alunos

    let lista = "Alunos cadastrados:\n";
    for (const aluno of alunos) { 
        const notas = aluno.notas.length > 0 ? aluno.notas.join(", ") : "Sem notas"; //caso não tenha notas
        const media = calcularMediaNotas(aluno.notas).toFixed(2); 
        lista += `Aluno: ${aluno.nome} | Notas: ${notas} | Média: ${media}\n`;
    }
    alert(lista);
}

function RegistrarNotas() {
    const nome = prompt("Digite o nome do aluno que receberá a nota:");
    if (!nome) { alert("Nome inválido!"); return; }

    let alunoEncontrado = null;
    for (const a of alunos) {
        if (a.nome.toLowerCase() === nome.toLowerCase()) {
            alunoEncontrado = a;
            break;
        }
    }
    if (!alunoEncontrado) { alert("Aluno não encontrado!"); return; }

    const notasInput = prompt("Digite as notas separadas por vírgula (ex: 9.5,8,5):");
    if (!notasInput) { alert("Notas inválidas!"); return; }

    const notas = [];
    const temp = notasInput.split(",");
    for (const n of temp) {
        const numero = parseFloat(n.trim());
        if (isNaN(numero) || numero < 0 || numero > 10) {
            alert("Todas as notas devem estar entre 0 e 10!");
            return;
        }
        notas.push(numero);
    }

    for (const n of notas) {
        alunoEncontrado.notas.push(n);
    }

    alert(`Notas adicionadas ao aluno ${alunoEncontrado.nome}: ${alunoEncontrado.notas.join(", ")}`);
}

function CalcularMediaAluno() {
    const nome = prompt("Digite o nome do aluno:");
    if (!nome) { alert("Nome inválido!"); return; }

    let aluno = null;
    for (const a of alunos) {
        if (a.nome.toLowerCase() === nome.toLowerCase()) {
            aluno = a;
            break;
        }
    }
    if (!aluno) { alert("Aluno não encontrado!"); return; }
    if (aluno.notas.length === 0) { alert(`O aluno ${aluno.nome} ainda não possui notas registradas`); return; }

    const media = calcularMediaNotas(aluno.notas);
    alert(`A média de ${aluno.nome} é ${media.toFixed(2)}`);
}

function MostrarAprovados() {
    if (alunos.length === 0) { alert("Nenhum aluno cadastrado."); return; }

    let aprovados = "";
    for (const aluno of alunos) {
        if (aluno.notas.length === 0) continue;
        const media = calcularMediaNotas(aluno.notas);
        if (media >= 7) {
            aprovados += `${aluno.nome} | Média: ${media.toFixed(2)}\n`;
        }
    }

    alert(aprovados ? "Aprovados:\n" + aprovados : "Nenhum aluno aprovado ainda!");
}

function EstatisticaTurma() {
    if (alunos.length === 0) { alert("Nenhum aluno cadastrado."); return; }

    let qtdComNotas = 0;
    let somaMedias = 0;
    let maiorMedia = -1;
    let menorMedia = 11;

    for (const aluno of alunos) {
        if (aluno.notas.length === 0) continue;
        const media = calcularMediaNotas(aluno.notas);
        qtdComNotas++;
        somaMedias += media;
        if (media > maiorMedia) maiorMedia = media;
        if (media < menorMedia) menorMedia = media;
    }

    if (qtdComNotas === 0) {
        alert("Estatísticas da Turma\nSem dados disponíveis (nenhum aluno tem notas registradas).");
        return;
    }

    const mediaTurma = somaMedias / qtdComNotas;
    alert(
        `Estatísticas da Turma:\n` +
        `Total de alunos: ${alunos.length}\n` +
        `Alunos com notas: ${qtdComNotas}\n` +
        `Média geral da turma: ${mediaTurma.toFixed(2)}\n` +
        `Maior média: ${maiorMedia.toFixed(2)}\n` +
        `Menor média: ${menorMedia.toFixed(2)}`
    );
}

function Ordenar() {
    const alunosComMedia = [];
    for (const aluno of alunos) {
        if (aluno.notas.length > 0) {
            alunosComMedia.push({ nome: aluno.nome, media: calcularMediaNotas(aluno.notas) });
        }
    }

    if (alunosComMedia.length === 0) {
        alert("Nenhum aluno tem notas registradas.");
        return;
    }

    alunosComMedia.sort((a, b) => b.media - a.media);

    let lista = "Alunos ordenados por média (decrescente):\n";
    let i = 1; // contador manual
    for (const aluno of alunosComMedia) {
        lista += `${i}) ${aluno.nome} | Média: ${aluno.media.toFixed(2)}\n`;
        i++;
    }

    alert(lista);
}

function RemoverAluno() {
    if (alunos.length === 0) { alert("Nenhum aluno cadastrado."); return; }

    const nome = prompt("Digite o nome do aluno que deseja remover:");
    if (!nome || nome.trim() === "") { alert("Operação cancelada."); return; }

    let index = -1;
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nome.toLowerCase() === nome.toLowerCase()) {
            index = i;
            break;
        }
    }

    if (index === -1) { alert(`Aluno "${nome}" não encontrado!`); return; }

    if (confirm(`Tem certeza que deseja remover o aluno "${alunos[index].nome}"?`)) {
        const removido = alunos.splice(index, 1)[0];
        alert(`Aluno "${removido.nome}" removido com sucesso!`);
    } else {
        alert("Remoção cancelada.");
    }
}

// Função principal
(function main() {
    let sair = false;
    while (!sair) {
        const opc = prompt(
`---Menu---
1) Adicionar aluno
2) Listar alunos
3) Registrar notas
4) Calcular média do aluno
5) Mostrar os aprovados
6) Estatísticas da turma
7) Ordenar por média e listar
8) Remover aluno
9) Sair
Escolha uma opção:`
        );
        if (opc === null) break;

        switch (opc.trim()) {
            case "1": AdicionarAluno(); break;
            case "2": ListarAlunos(); break;
            case "3": RegistrarNotas(); break;
            case "4": CalcularMediaAluno(); break;
            case "5": MostrarAprovados(); break;
            case "6": EstatisticaTurma(); break;
            case "7": Ordenar(); break;
            case "8": RemoverAluno(); break;
            case "9": sair = true; break;
            default: alert("Opção inválida.");
        }
    }
    alert("Encerrando...");
})();
