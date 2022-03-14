$(function() {
	obterRestauranteUSP();
	obterCardapioRestUSP();
	$("table:last").css({
		width: "90%",
		"margin-left": "0"
	});
$("ul.menulist").hide();

	
});

var consultaRestaurante;

function formataData(data){
	
	var dataFormatada = data.substring(0, (data.length - 5));
	return dataFormatada;
}


function obterRestauranteUSP() {
	//var codrtnObter = $("#codrtn").val();
  	var codrtnObter = 9;

	CardapioControleDWR.obterRestauranteUsp(codrtnObter, function(lista) {
	
	consultaRestaurante = lista.length;
	if(lista.length > 0){
		var dddFone = String(lista[0].codddd1);
		var fone = String(lista[0].numtel1);
		var telefone = "Informa&ccedil;&otilde;es: (" + dddFone + ") "  + fone.substring(0, (fone.length - 4)) + "-" + fone.substring(fone.length - 4, fone.length);
				
			
		$("#restaurante").html(lista[0].nomrtn);
		$("#telefoneRestaurante").html(telefone);
		
		window.alert(dddFone);
		window.alert("aeaeofofo");
	}
		
		window.alert(dddFone);
		window.alert("aeaeofofo");
	
	
	});	
	
}

// FuncÃ£o que adciona uma quantidade de dias a uma data
function adionarDias(data, dias){
	
	var expressaoRegularData = /(\d{2})\/(\d{2})\/(\d{4})/;
	var dataPreFormatada = new Date(data.replace(expressaoRegularData,'$2/$1/$3'));
	var dataRetorno;
	dataPreFormatada.setDate(dataPreFormatada.getDate() + dias);
	dataRetorno = $.datepicker.formatDate( "dd/mm/yy", dataPreFormatada);
	return dataRetorno;
}

	
function obterCardapioRestUSP() {
		
		
	var dataSegunda;
	var dataTerminoSemana;
	//var codrtnObter = $("#codrtn").val();
	var codrtnObter = 9;
	var cardapioSabado = 0;
	var cardapioDomingo = 0;
	
	CardapioControleDWR.obterCardapioRestUSP(codrtnObter, function(lista) {
		
		if(consultaRestaurante == 0){
			$("#cardapioSAS").hide();
			$("#dataSemana").html("NÃ£o hÃ¡ restaurante cadastrado para o cÃ³digo informado!");
		}
		else if(lista.length == 0){
			
			$("#cardapioSAS").hide();
			$("#dataSemana").html("NÃ£o hÃ¡ cardÃ¡pio cadastrado para essa semana!");
			
		}	
		else{
			
				//Preparando as datas referentes ao intervalo da semana e aos Ã­tens do cardÃ¡pio
				
				if(codrtnObter == 6 ) {
					dataSegunda = lista[0].dtainismncdp;
					dataTerminoSemana = adionarDias(dataSegunda, 6);
				} 
				if(codrtnObter != 6){
					dataSegunda = lista[0].dtainismncdp;
					dataTerminoSemana = adionarDias(dataSegunda, 4)
				}
				
				$("#diaSegunda").html("Segunda-Feira: " + formataData(dataSegunda));
				$("#diaTerca").html("TerÃ§a-Feira: " + formataData(adionarDias(dataSegunda, 1)));
				$("#diaQuarta").html("Quarta-Feira: " + formataData(adionarDias(dataSegunda, 2)));
				$("#diaQuinta").html("Quinta-Feira: " + formataData(adionarDias(dataSegunda, 3)));
				$("#diaSexta").html("Sexta-Feira: " + formataData(adionarDias(dataSegunda, 4)));
				$("#diaSabado").html("SÃ¡bado: " + formataData(adionarDias(dataSegunda, 5)));
				$("#diaDomingo").html("Domingo: " + formataData(adionarDias(dataSegunda, 6)));
				
				if(lista[0].obscdpsmn != null){
					$("#observacao").html(lista[0].obscdpsmn);
				}
			
				for (var int = 0; int < lista.length; int++) {
							
					if(lista[int].diasemana == 1 && lista[int].tiprfi == 'A'){
						$("#almocoDomingo").html(lista[int].cdpdia);
						if($.trim(lista[int].cdpdia) == ""){
							cardapioDomingo += 1;
						}
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalDomingoA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
					}
					
					if(lista[int].diasemana == 1 && lista[int].tiprfi == 'J'){
						$("#jantarDomingo").html(lista[int].cdpdia);
						if($.trim(lista[int].cdpdia) == ""){
							cardapioDomingo += 1;
						}
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalDomingoJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
					}
					
					if(lista[int].diasemana == 2 && lista[int].tiprfi == 'A'){
						$("#almocoSegunda").html(lista[int].cdpdia);															
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalSegundaA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
					}
					if(lista[int].diasemana == 2 && lista[int].tiprfi == 'J'){
						$("#jantarSegunda").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalSegundaJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
						
					}
					
					if(lista[int].diasemana == 3 && lista[int].tiprfi == 'A'){
						$("#almocoTerca").html(lista[int].cdpdia);					
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalTercaA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
					}
					if(lista[int].diasemana == 3 && lista[int].tiprfi == 'J'){
						$("#jantarTerca").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalTercaJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
					}
					if(lista[int].diasemana == 4 && lista[int].tiprfi == 'A'){
						$("#almocoQuarta").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
						$("#kcalQuartaA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
						}
					}
					if(lista[int].diasemana == 4 && lista[int].tiprfi == 'J'){
						$("#jantarQuarta").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalQuartaJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
					if(lista[int].diasemana == 5 && lista[int].tiprfi == 'A'){
						$("#almocoQuinta").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalQuintaA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
					if(lista[int].diasemana == 5 && lista[int].tiprfi == 'J'){
						$("#jantarQuinta").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalQuintaJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
					if(lista[int].diasemana == 6 && lista[int].tiprfi == 'A'){
						$("#almocoSexta").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalSextaA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
					if(lista[int].diasemana == 6 && lista[int].tiprfi == 'J'){
						$("#jantarSexta").html(lista[int].cdpdia);
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalSextaJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
					if(lista[int].diasemana == 7 && lista[int].tiprfi == 'A'){
						$("#almocoSabado").html(lista[int].cdpdia);
						if($.trim(lista[int].cdpdia) == ""){
							cardapioSabado += 1;
						}
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalSabadoA").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
					
					if(lista[int].diasemana == 7 && lista[int].tiprfi == 'J'){
						$("#jantarSabado").html(lista[int].cdpdia);
						if($.trim(lista[int].cdpdia) == ""){
							cardapioSabado += 1;
						}
						
						if(!(lista[int].vlrclorfi == 0 || lista[int].vlrclorfi == null)){
							$("#kcalSabadoJ").html("Valor Cal&oacute;rico da Refei&ccedil;&atilde;o: "+lista[int].vlrclorfi + " Kcal");
							}
					}
				}
				
				
				$("#dataSemana").html("Semana de " + formataData(dataSegunda) + " a " + dataTerminoSemana);
				
				if(cardapioSabado == 2){
					$("#dataSabado").hide();
					$("#sabado").hide();
					$("#caloriaSÃ¡bado").hide();
					
				}
				if(cardapioDomingo == 2){
					$("#dataDomingo").hide();
					$("#domingo").hide();
					$("#caloriaDomingo").hide();
					
				}
			}
		
			$(".itensCardapio td").each(function(){
				
				$(this).html($(this).html().replace(/\r?\n/g, "<br>"))
				
			});
			
		});	
	
	
	
	
}
