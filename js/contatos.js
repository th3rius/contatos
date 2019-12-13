var contatos;
var contato;
$(function () {
    listarcontatos();
    $("#carregando").hide();
    $("#form-novo").submit(function () {
        adicionarContato();
    });
    $("#form-editar").submit(function () {
       editarContato() ;
    });
    $("#apagar").click(function () {
       apagarContato(); 
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

function modalEditar(elemento) {
    contato = contatos[$(elemento).attr('cod')];
    $("input#editar-nome").val(contato.nome);
    $("input#editar-sobrenome").val(contato.sobrenome);
    $("input#editar-email").val(contato.email);
    $("input#editar-telefone").val(contato.telefone);
    $("input#editar-nascimento").val(contato.nascimento);
    $("textarea#editar-endereco").val(contato.endereco);
    $("#modal-editar").modal('show');
}

function listarcontatos() {
    contatos = JSON.parse(localStorage.getItem('contatos'));
    if(contatos == null)
        contatos = [];
    if (contatos.length) {
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
            modalEditar(this);
        });
    } else {
        $('#tabela').hide();
        $("#alone").show();
    }
}

function editarContato() {
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
}

function apagarContato(elemento) {
    contatos.splice($(elemento).attr('cod'), 1);
        localStorage.setItem('contatos', JSON.stringify(contatos));
        listarcontatos();
        $("#modal-editar").modal('hide');
}