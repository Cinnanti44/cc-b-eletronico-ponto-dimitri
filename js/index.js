const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const nextRegister = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}

let registerLocalStorage = getRegisterLocalStorage();

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");

const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject("Erro ao recuperar a localização " + error);
        });
    });
}

const btnCloseAlertRegister = document.getElementById("alerta-registro-ponto-fechar");
btnCloseAlertRegister.addEventListener("click", () => {
    divAlertaRegistroPonto.classList.remove("show");
    divAlertaRegistroPonto.classList.add("hidden");
});

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", async () => {
    const typeRegister = document.getElementById("tipos-ponto").value;

    
    const selectedDateInput = document.getElementById('data-ponto').value;
    const selectedDate = selectedDateInput ? new Date(selectedDateInput + "T12:00:00") : new Date(); 

    const currentDate = new Date(); 

    
    if (selectedDate > currentDate) {
        alert('Não é possível registrar um ponto em uma data futura.');
        return;
    }

    let userCurrentPosition;
    try {
        userCurrentPosition = await getCurrentPosition();
    } catch (error) {
        alert(error);
        return;
    }

    
    const justificativa = document.getElementById("justificativa").value; 

    let ponto = {
        "data": selectedDate.toLocaleDateString("pt-BR"),
        "hora": getCurrentHour(),
        "localizacao": userCurrentPosition,
        "id": Date.now(),
        "tipo": typeRegister,
        "justificativa": justificativa 
    
    };

    console.log("Ponto salvo:", ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();

    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);
});

function saveRegisterLocalStorage(register) {
    const typeRegister = document.getElementById("tipos-ponto").value;
    registerLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
    localStorage.setItem("lastTypeRegister", typeRegister);
}

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if (!registers) {
        return [];
    }

    return JSON.parse(registers);
}

function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    
    let lastTypeRegister = localStorage.getItem("lastTypeRegister");
    if (lastTypeRegister) {
        const typeRegister = document.getElementById("tipos-ponto");
        typeRegister.value = nextRegister[lastTypeRegister];
        let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister");
        document.getElementById("dialog-last-register").textContent = lastRegisterText;
    }

    setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentHour();
    }, 1000);

    dialogPonto.showModal();
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(4, '0');
}

function getCurrentDateISO() {
    const date = new Date();
    return date.toISOString().split('T')[0]; 
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

printCurrentHour();
setInterval(printCurrentHour, 1000);