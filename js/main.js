$(function() {
	listarContatos();
	$("#carregando").hide();
	$("#form-novo").submit(function() {
		adicionarContato();
	});
});

function adicionarContato() {
	var Contato = new Object();
	Contato.nome = $('input#novo-nome').val();
	Contato.sobrenome = $('input#novo-sobrenome').val();
	Contato.email = $('input#novo-email').val();
	Contato.telefone = $('input#novo-telefone').val();
	Contato.nascimento = $('input#novo-nascimento').val();
	Contato.endereco = $('textarea#novo-endereco').val();
	var contatoJson = JSON.stringify(Contato);
	$.post('https://ifscagenda.000webhostapp.com/', {
		acao : 'adicionar_contato',
		contato : contatoJson
	}, function() {
		$("input#novo-nome").val("");
		$("input#novo-sobrenome").val("");
		$("input#novo-email").val("");
		$("input#novo-telefone").val("");
		$("input#novo-nascimento").val("");
		$("textarea#novo-endereco").val("");
		listarContatos();
		$("#modal-novo").modal('hide');
	}, "json");
}

function editarContato(elemento) {
	var Contato = new Object();
	Contato.cod_contato = $(elemento).attr('cod_contato');
	var contatoJson = JSON.stringify(Contato);
	$.post('https://ifscagenda.000webhostapp.com/', {
		acao : 'buscar_contato',
		contato : contatoJson
	}, function(dadoJson) {
		Contato = dadoJson[0];
		$("input#editar-nome").val(Contato.nome);
		$("input#editar-sobrenome").val(Contato.sobrenome);
		$("input#editar-email").val(Contato.email);
		$("input#editar-telefone").val(Contato.telefone);
		$("input#editar-nascimento").val(Contato.nascimento);
		$("textarea#editar-endereco").val(Contato.endereco);
		$("#modal-editar").modal('show');
	}, "json");
	
	$("#form-editar").submit(function() {
		Contato.nome = $('input#editar-nome').val();
		Contato.sobrenome = $('input#editar-sobrenome').val();
		Contato.email = $('input#editar-email').val();
		Contato.telefone = $('input#editar-telefone').val();
		Contato.nascimento = $('input#editar-nascimento').val();
		Contato.endereco = $('textarea#editar-endereco').val();
		console.log(Contato.nascimento);
		var contatoJson = JSON.stringify(Contato);
		$.post('https://ifscagenda.000webhostapp.com/', {
			acao : 'atualizar_contato',
			contato : contatoJson
		}, function() {
			listarContatos();
			$("#modal-editar").modal('hide');
		}, "json");
	});
	
	$("#apagar").click(function() {
		$.post('https://ifscagenda.000webhostapp.com/', {
			acao : 'apagar_contato',
			contato : contatoJson
		}, function() {
		}, "json");
		listarContatos();
		$("#modal-editar").modal('hide');
	});
}

function listarContatos() {
	$
			.post(
					'https://ifscagenda.000webhostapp.com/',
					{
						acao : 'listar_contato'
					},
					function(dadosJson) {
						var dados = JSON.parse(dadosJson);
						if (dados.length == 0) {
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
							$
									.each(
											dados,
											function(indice, Contato) {
												tabela += '<tr id="editar-contato" cod_contato="'
														+ Contato.cod_contato
														+ '">';
												tabela += '<td>' + Contato.nome
														+ " "
														+ Contato.sobrenome
														+ '</td>';
												tabela += '<td class="text-muted"><a class="mailto" href="mailto:'
														+ Contato.email
														+ '">'
														+ Contato.email
														+ '</a></td>';
												tabela += '<td>'
														+ Contato.telefone
														+ '</td>';
											});
							tabela += '</tbody>';
							tabela += '</table>';
							tabela += '</div>';
							$('div#contatos').html(tabela);
							$("tr#editar-contato").click(function() {
								editarContato(this);
							});
						}
					})
}