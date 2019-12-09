$(function () {
    $("#form-login").submit(function () {
        var Usuario = new Object();
        Usuario.email = $("#email").val();
        Usuario.senha = $("#senha").val();
        var usuarioJson = JSON.stringify(Usuario);
        $.post('https://ifscagenda.000webhostapp.com/usuarios.php/', {
            acao: 'login',
            usuario: usuarioJson
        }, function (resultadoJson) {
            resultado = JSON.parse(resultado.JSON);
            alert(resultadoJson);
            
            // if (resultadoJson.length == 0) {
            //     alert("inavalido");
            //     window.location.href = "index.html";
            // } else {
            //     alert("suceso");
            // }
        }, "json");
    });
});