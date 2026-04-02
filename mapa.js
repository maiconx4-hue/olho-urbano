var map = L.map('map').setView([0.0349,-51.0694],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'OpenStreetMap'
}).addTo(map);


// icones

var iconeBuraco = L.icon({
iconUrl: 'icons/buraco.png',
iconSize: [42,42]
});

var iconePoste = L.icon({
iconUrl: 'icons/poste.png',
iconSize: [42,42]
});

var iconeLixo = L.icon({
iconUrl: 'icons/lixo.png',
iconSize: [42,42]
});

var iconeAlagamento = L.icon({
iconUrl: 'icons/alagamento.png',
iconSize: [42,42]
});


// função para escolher icone

function escolherIcone(tipo){

if(tipo === "Buraco na rua"){
return iconeBuraco;
}

if(tipo === "Poste sem iluminação"){
return iconePoste;
}

if(tipo === "Lixo acumulado"){
return iconeLixo;
}

if(tipo === "Alagamento"){
return iconeAlagamento;
}

}


// carregar ocorrências da API

async function carregarOcorrencias(){

try{

let resposta = await fetch("https://api-olho-urbano.onrender.com/ocorrencias");

let ocorrencias = await resposta.json();

ocorrencias.forEach(o=>{

// corrigir nomes possíveis vindos do banco
let lat = o.lat || o.latitude;
let lng = o.lng || o.longitude;

// validar coordenadas
if(!lat || !lng){
console.log("Ocorrência inválida:", o);
return;
}

let icone = escolherIcone(o.tipo);

let popup = `
<b>${o.tipo}</b><br>
${o.endereco || ""}<br>
<img src="${o.foto}" width="200">
`;

L.marker([parseFloat(lat),parseFloat(lng)], {icon: icone})
.addTo(map)
.bindPopup(popup);

});

}catch(erro){

console.log("Erro ao carregar ocorrências", erro);

}

}


// EXECUTAR

carregarOcorrencias();