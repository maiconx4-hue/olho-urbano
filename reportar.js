async function salvar(){

let endereco = document.getElementById("endereco").value;
let tipo = document.getElementById("tipo").value;
let arquivoFoto = document.getElementById("foto").files[0];

// buscar coordenadas do endereço

let url = "https://nominatim.openstreetmap.org/search?format=json&q=" 
+ encodeURIComponent(endereco);

let resposta = await fetch(url);
let dados = await resposta.json();

if(dados.length === 0){
alert("Endereço não encontrado");
return;
}

let lat = parseFloat(dados[0].lat);
let lng = parseFloat(dados[0].lon);


// converter imagem para base64

let leitor = new FileReader();

leitor.onload = async function(){

let fotoBase64 = leitor.result;

try{

await fetch("https://api-olho-urbano.onrender.com/ocorrencias",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

lat: lat,
lng: lng,
tipo: tipo,
endereco: endereco,
foto: fotoBase64

})

});

alert("Ocorrência registrada com sucesso!");

window.location.href="index.html";

}catch(erro){

console.log(erro);

alert("Erro ao enviar ocorrência");

}

};

if(arquivoFoto){

leitor.readAsDataURL(arquivoFoto);

}else{

alert("Selecione uma foto");

}

}