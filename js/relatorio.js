

function renderRegistros() {
    const registros = JSON.parse(localStorage.getItem("register")) || [];
    const listaRegistros = document.getElementById("lista-registros");
    listaRegistros.innerHTML = "";
    registros.forEach((registro) => {
        const li = document.createElement("li");
       
        li.textContent = `${registro.data} - ${registro.hora} | ${registro.tipo}`;
        
        if (registro.localizacao && registro.localizacao.latitude && registro.localizacao.longitude) {
            const localizacaoSpan = document.createElement("span");
            localizacaoSpan.textContent = ` | Localização: ${registro.localizacao.latitude.toFixed(5)}, ${registro.localizacao.longitude.toFixed(5)}`;
            localizacaoSpan.style.color = 'green';
            li.appendChild(localizacaoSpan);
        } else {
            const localizacaoSpan = document.createElement("span");
            localizacaoSpan.textContent = ` | Localização não disponível`;
            localizacaoSpan.style.color = 'red'; 
            li.appendChild(localizacaoSpan);
        }
        
        if (registro.justificativa) {
            const justificativaSpan = document.createElement("span");
            justificativaSpan.textContent = ` | Justificativa: ${registro.justificativa}`;
            li.appendChild(justificativaSpan);
        }
        
        if (registro.observacao) {
            const observacaoSpan = document.createElement("span");
            observacaoSpan.textContent = ` | Observação: ${registro.observacao}`;
            observacaoSpan.style.color = 'blue'; 
            li.appendChild(observacaoSpan);
        }
        
        if (registro.arquivo) {
            const arquivoLink = document.createElement("a");
            arquivoLink.textContent = ` | Arquivo: ${registro.arquivo}`;
            arquivoLink.href = `path/to/your/files/${registro.arquivo}`;
            arquivoLink.target = "_blank";
            arquivoLink.rel = "noopener noreferrer"; 
            li.appendChild(arquivoLink);
        }
        
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => {
            editRegister(registro.id);
        });
        li.appendChild(editButton);
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => {
            alert("Ponto não pode ser excluído");
        });
        li.appendChild(deleteButton);
        listaRegistros.appendChild(li);
    });
}

function editRegister(id) {
    const registros = JSON.parse(localStorage.getItem("register")) || [];
    const registro = registros.find(r => r.id === id);
    
    
    const novaData = prompt("Edite a data (dd/mm/aaaa):", registro.data || "");
    const novaObservacao = prompt("Edite a observação:", registro.observacao || "");
    
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (novaData && !dateRegex.test(novaData)) {
        alert("Data inválida! Use o formato DD/MM/AAAA.");
        return;
    }
    
    if (novaData) {
        registro.data = novaData; 
    }
    registro.observacao = novaObservacao; 
    
    localStorage.setItem("register", JSON.stringify(registros));
    renderRegistros(); 
}

document.getElementById('filtro').addEventListener('change', () => {
    renderRegistros();
});
renderRegistros();