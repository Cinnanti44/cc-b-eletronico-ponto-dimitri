const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg")

diaSemana.textContent = "dominfo";
function getCurrentDate(){
    const date = new Date();
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

}
