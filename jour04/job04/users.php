<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'utilisateurs';

$connection = new mysqli($host, $user, $password, $database);

if ($connection->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Connexion à la base de données échouée']);
    exit;
}

$query = 'SELECT id, nom, prenom, email FROM utilisateurs';
$result = $connection->query($query);

$users = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    $result->free();
}

$connection->close();

echo json_encode($users, JSON_UNESCAPED_UNICODE);
