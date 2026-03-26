// carregar ocorrencias da API

fetch("https://api-olho-urbano.onrender.com/ocorrencias")

.then(res => res.json())

.then(dados => {

dados.forEach(o=>{

let icone;

if(o.tipo === "Buraco na rua"){
icone = iconeBuraco;
}

else if(o.tipo === "Poste sem iluminação"){
icone = iconePoste;
}

else if(o.tipo === "Lixo acumulado"){
icone = iconeLixo;
}

else if(o.tipo === "Alagamento"){
icone = iconeAlagamento;
}

let popup = `
<b>${o.tipo}</b><br>
${o.endereco}<br>
<img src="${o.foto}" width="200">
`;

L.marker([o.latitude,o.longitude], {icon: icone})
.addTo(map)
.bindPopup(popup);

});

});