var contatos = [];

$(function () {
    listarcontatos();
    $("#carregando").hide();
    $("#form-novo").submit(function () {
        adicionarContato();
    });
});

function adicionarContato() {
    var contato = new Object();
    contato.nome = $('input#novo-nome').val();
    contato.sobrenome = $('input#novo-sobrenome').val();
    contato.email = $('input#novo-email').val();
    contato.telefone = $('input#novo-telefone').val();
    contato.nascimento = $('input#novo-nascimento').val();
    contato.endereco = $('textarea#novo-endereco').val();
    contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    listarcontatos();
    $("#modal-novo").modal('hide');
}

function editarContato(elemento) {
    var contato = contatos[$(elemento).attr('cod')];
    $("input#editar-nome").val(contato.nome);
    $("input#editar-sobrenome").val(contato.sobrenome);
    $("input#editar-email").val(contato.email);
    $("input#editar-telefone").val(contato.telefone);
    $("input#editar-nascimento").val(contato.nascimento);
    $("textarea#editar-endereco").val(contato.endereco);
    $("#modal-editar").modal('show');

    $("#form-editar").submit(function () {
        contato.nome = $('input#editar-nome').val();
        contato.sobrenome = $('input#editar-sobrenome').val();
        contato.email = $('input#editar-email').val();
        contato.telefone = $('input#editar-telefone').val();
        contato.nascimento = $('input#editar-nascimento').val();
        contato.endereco = $('textarea#editar-endereco').val();
        contatos[$(elemento).attr('cod')] = contato;
        localStorage.setItem('contatos', JSON.stringify(contatos));
        listarcontatos();
        $("#modal-editar").modal('hide');
    });

    $("#apagar").click(function () {
        contatos.splice($(elemento).attr('cod'), 1);
        localStorage.setItem('contatos', JSON.stringify(contatos));
        listarcontatos();
        $("#modal-editar").modal('hide');
    });
}

function listarcontatos() {
    contatos = JSON.parse(localStorage.getItem('contatos'));
    if (!contatos.length) {
        $('#tabela').hide();
        $("#alone").show();
    } else {
        var tabela;
        $.each(contatos, function (indice, contato) {
            tabela += '<tr id="editar-contato" cod="' + contatos.indexOf(contato) + '">';
            tabela += '<td>' + contato.nome + " " + contato.sobrenome + '</td>';
            tabela += '<td class="text-muted"><a class="mailto" href="mailto:' + contato.email + '">' + contato.email + '</a></td>';
            tabela += '<td>' + contato.telefone + '</td></tr>';
        });
        $("#alone").hide();
        $('#contatos').html(tabela);
        $('#tabela').show();
        $("tr#editar-contato").click(function () {
            editarContato(this);
        });
    }
}