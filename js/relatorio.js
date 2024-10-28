// Função para Renderizar Registros
function renderRegistros() {
    const registros = JSON.parse(localStorage.getItem("register")) || [];
    const listaRegistros = document.getElementById("lista-registros");
    listaRegistros.innerHTML = "";

    registros.forEach((registro) => {
        const li = document.createElement("li");

        // Adicionar data, hora e tipo
        li.textContent = `${registro.data} - ${registro.hora} | ${registro.tipo}`;

        // Adiciona a localização se estiver presente
        if (registro.localizacao && registro.localizacao.latitude && registro.localizacao.longitude) {
            const localizacaoSpan = document.createElement("span");
            localizacaoSpan.textContent = ` | Localização: ${registro.localizacao.latitude.toFixed(5)}, ${registro.localizacao.longitude.toFixed(5)}`;
            localizacaoSpan.style.color = 'green'; // Cor verde para localização
            li.appendChild(localizacaoSpan);
        } else {
            const localizacaoSpan = document.createElement("span");
            localizacaoSpan.textContent = ` | Localização não disponível`;
            localizacaoSpan.style.color = 'red'; // Cor vermelha para quando a localização não está disponível
            li.appendChild(localizacaoSpan);
        }

        // Justificativa (se houver)
        if (registro.justificativa) {
            const justificativaSpan = document.createElement("span");
            justificativaSpan.textContent = ` | Justificativa: ${registro.justificativa}`;
            li.appendChild(justificativaSpan);
        }

        // Observação (se houver)
        if (registro.observacao) {
            const observacaoSpan = document.createElement("span");
            observacaoSpan.textContent = ` | Observação: ${registro.observacao}`;
            observacaoSpan.style.color = 'blue'; // Marca observações com cor azul
            li.appendChild(observacaoSpan);
        }

        // Arquivo (se houver)
        if (registro.arquivo) {
            const arquivoLink = document.createElement("a");
            arquivoLink.textContent = ` | Arquivo: ${registro.arquivo}`;
            arquivoLink.href = `path/to/your/files/${registro.arquivo}`;
            arquivoLink.target = "_blank";
            arquivoLink.rel = "noopener noreferrer"; // Segurança adicional
            li.appendChild(arquivoLink);
        }

        // Botão de Edição
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => {
            editRegister(registro.id);
        });
        li.appendChild(editButton);

        // Botão de Exclusão
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => {
            alert("Ponto não pode ser excluído");
        });
        li.appendChild(deleteButton);

        listaRegistros.appendChild(li);
    });
}

// Função para Editar Registros
function editRegister(id) {
    const registros = JSON.parse(localStorage.getItem("register")) || [];
    const registro = registros.find(r => r.id === id);
    
    // Solicita nova data e observação
    const novaData = prompt("Edite a data (dd/mm/aaaa):", registro.data || "");
    const novaObservacao = prompt("Edite a observação:", registro.observacao || "");

    // Validação simples de data no formato DD/MM/AAAA
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (novaData && !dateRegex.test(novaData)) {
        alert("Data inválida! Use o formato DD/MM/AAAA.");
        return;
    }

    // Atualiza a data e observação do registro
    if (novaData) {
        registro.data = novaData; 
    }
    registro.observacao = novaObservacao; // Atualiza a observação

    // Atualiza o registro no localStorage
    localStorage.setItem("register", JSON.stringify(registros));
    renderRegistros(); // Re-renderiza os registros
}

// Filtro por Data (Última Semana/Mês)
document.getElementById('filtro').addEventListener('change', () => {
    renderRegistros();
});

renderRegistros();
