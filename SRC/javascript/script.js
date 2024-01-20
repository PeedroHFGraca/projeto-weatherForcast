document.querySelector('#search').addEventListener('submit', async (event) => { // 'Async - chamada a API'
    event.preventDefault();
    /* Quando clicamos no botão de submit, o comportamento padrão da página
       é recarregar. Esta função vai tirar isso 
    */ 

    const cityName = document.querySelector('#city_name').value;

    if(!cityName) { // Se não for digitado nenhum valor...
        document.querySelector('#weather').classList.remove('show'); // Remover quando não haver nenhuma cidade com o nome digitado
        showAlert('Informe sua Cidade!')
        return;
    }

    //console.log(cityName) - pegar a cidade informada e enviar pro Console (Inspecionar > Console para ver o resultado)

    const apiKey = '0dc39af79ac620806a9dfaab8e258a12'; // key da minha conta no openweathermap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    // "encodeURI(cityName)" caso o nome da cidade digitado tenha acentos ;
    // apiKey - meu key gerado no openweather
    // units=metric - unidade de medida em grau celcios ; lang=pt_br

    const results = await fetch(apiUrl); // realizar a chamada a API utilizando o Fetch
    const json = await results.json();
    /*A função fetch ou Fetch API, é uma API de busca do Javascript que permite realizar requisições HTTP assíncronas entre
    uma aplicação web e recursos externos. */ 

    // console.log(json)// retortar os dados da API


    if (json.cod === 200) {
    /* Na img 'Inspecionar_network' mostra o que acontece quando enviamos o nome da cidade com o Inspecionar
    aberto na parte de Network. Se o campo estiver assim:  "Status Code: 200 OK"
    quer dizer que a API está funcionando corretamente*/

        showInfo({
            city: json.name,
            country: json.sys.country,
            humidity: json.main.humidity,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed
            /* o campo city(eu q escolhi) vai receber o caminho da sua respectiva info
            Na img 'Inspecionar_network_preview' está destacado onde pego o caminho destes campos*/
        });

    } else {
        document.querySelector('#weather').classList.remove('show'); // Remover quando não haver nenhuma cidade com o nome digitado

        showAlert(`<p>Não foi possível localizar...</p>
            <img src="src/img/location_search2.png"/>
        `)
        // Se o campo não estiver dessa forma "Status Code: 200 OK", a API não está funcionado corretamente! 
    }


        
});

function showInfo(json){ // Pega as infos no showInfo no IF acima e mostrá na tela
    showAlert(''); // limpar qualquer alerta na tela

    document.querySelector('#weather').classList.add('show'); // quando for informado a cidade, mostrará os dados

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}` // json.campo que escolhi como nome
    
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).replace('.',',')} <sup>C°</sup>` 
    /*Pegar temperatura atual na cidade ;
      toFixed(1) = número de casas decimais ; replace('.' , ',') trocar o PONTO por VÍRGULA
    */

    document.querySelector('#temp_description').innerHTML = `${json.description}`
    // Descrição do tempo - ex: Chuvoso

    document.querySelector("#temp_img").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    // mudar a img conforme o tempo, estamos pegando as img da URL acima

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).replace('.',',')} <sup>C°</sup>` 
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).replace('.',',')} <sup>C°</sup>` 
    // Pegar temperaturas máximas e mínimas

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`


}

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg
}
