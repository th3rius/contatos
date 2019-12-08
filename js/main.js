$(function () {	
	listarContatos();
	$("#carregando").hide();
    $("#form-novo").submit(function() {
    	$("#modal-novo").modal('hide');
        salvarContato();
    });
});

function salvarContato() {
    var Contato = new Object();
    Contato.nome = $('input#nome').val();
    Contato.sobrenome = $('input#sobrenome').val();
    Contato.telefone = $('input#telefone').val();
    Contato.email = $('input#email').val();
    Contato.endereco = $('textarea#endereco').val();
    var contatoJson = JSON.stringify(Contato);
    $.post('crud.php', {
        acao: 'adicionar_contato',
        contato: contatoJson
    }, function () {
        $("#modalNovo").modal('hide');      
    }, "json");
    listarContatos();
}

function listarContatos() {
	$.post('crud.php', {
		acao: 'listar_contato'
	}, function(dadosJson) {
		var dados = JSON.parse(dadosJson);
		if(dados.length == 0) {
			var alone = '<div class="text-muted text-center small" id="alone">';
	        alone += '<img src="images/alone.png" width="150" height="150" class="p-3 m-3"><br>';
	        alone += 'Parece que você nao tem nenhum contato.<br>';
	        alone += 'Porque não tenta <a href="#" data-toggle="modal" data-target="#modal-novo">criar um novo</a>?';
	        alone += '</div>';
	        $("div#contatos").html(alone);
		} else {
			var tabela = '<div class="p-3" id="tabela">';
	        tabela += '<table class="table table-borderless table-hover table-responsive-sm">';
	        tabela += '<thead>';
	        tabela += '<tr>';
	        tabela += '<th scope="col"><i class="far fa-user-circle mr-2"></i>Nome</th>';
	        tabela += '<th scope="col"><i class="far fa-envelope mr-2"></i>Email</th>';
	        tabela += '<th scope="col"><i class="fas fa-mobile-alt mr-2"></i>Telefone</th>';
	        tabela += '</tr>';
	        tabela += '</thead>';
	        tabela += '<tbody>';
	        $.each(dados, function(indice, contato) {
				tabela += '<tr>';
				tabela += '<td>' + contato.nome + " " + contato.sobrenome + '</td>';
				tabela += '<td class="text-muted"><a href="mailto:' + contato.email + '">' + contato.email + '</a></td>';
				tabela += '<td>' + contato.telefone + '</td>';
			});
	        tabela += '</tbody>';
	        tabela += '</table>';
	        tabela += '</div>';
	        console.log(tabela);
			$('div#contatos').html(tabela);
		}
	})
}