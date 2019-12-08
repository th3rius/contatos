<?php

const SERVIDOR = "localhost:3306";
const BANCO = "agenda";
const USUARIO = "root";
const SENHA = "";
$conexao = new PDO("mysql:host=" . SERVIDOR . "; dbname=" . BANCO, USUARIO, SENHA);

if (! isset($_POST['acao'])) {
    print json_encode(0);
    return;
}

switch ($_POST['acao']) {
    case 'buscar_contato':
        $contato = new stdClass();
        $contato = json_decode($_POST['contato']);
        $sql = "select * from contatos where cod_contato = ?";
        $pre = $conexao->prepare($sql);
        $pre->execute(array(
            $contato->id
        ));
        print json_encode($pre->fetchAll(PDO::FETCH_ASSOC));
        break;
    case 'listar_contato':
        $sql = "select * from contatos order by nome";
        $pre = $conexao->prepare($sql);
        $pre->execute();
        print json_encode($pre->fetchAll(PDO::FETCH_ASSOC));
        break;
    case 'adicionar_contato':
        $contato = new stdClass();
        $contato = json_decode($_POST['contato']);
        $sql = "insert into contatos(cod_usuario, nome, sobrenome, email, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?)";
        $pre = $conexao->prepare($sql);
        $pre->execute(array(
            0,
            $contato->nome,
            $contato->sobrenome,
            $contato->email,
            $contato->telefone,
            $contato->endereco
        ));
        print json_encode($conexao->lastInsertId());
        break;
    case 'excluir_contato':
        $contato = new stdClass();
        $contato = json_decode($_POST['contato']);
        $sql = "delete from contatos where cod_contato=? ";
        $pre = $conexao->prepare($sql);
        $pre->execute(array(
            $contato->id
        ));
        break;
    case 'editar_contato':
        $contato = new stdClass();
        $contato = json_decode($_POST['contato']);
        $sql = "update contatos set nome = ?, sobrenome = ?, telefone = ?, email = ?, endereco = ? where id = ? ";
        $pre = $conexao->prepare($sql);
        $pre->execute(array(
            $contato->nome,
            $contato->sobrenome,
            $contato->email,
            $contato->telefone,
            $contato->endereco,
            $contato->id
        ));
        print json_encode(1);
        break;
}
?>