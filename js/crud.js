$(function () {
    $("#contatos").show();
    $("#novo").click(salvarContato());

    function salvarContato() {
        $('#carregando').show();
        var Contato = new Object();
        Contato.nome = $('input#nome').val();
        Contato.sobrenome = $('input#sobrenome').val();
        Contato.telefone = $('input#telefone').val();
        Contato.email = $('input#email').val();
        Contato.endereco = $('textarea#endereco').val();
        var contatoJson = JSON.stringify(Contato);
        $.post('crud.php', {
            acao: 'adicionar_contato',
            conteudocontato: contatoJson
        }, function(dado) {
            getListarContato();
        }, "json");
    }
});