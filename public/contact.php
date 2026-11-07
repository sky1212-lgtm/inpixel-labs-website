<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$type = trim($data['type'] ?? 'General');
$message = trim($data['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please provide name, email, and message.']);
    exit();
}

function send_smtp_mail($to, $subject, $body_text, $from_name, $client_email) {
    $host = 'ssl://smtp.hostinger.com';
    $port = 465;
    $username = 'hello@inpixellabs.com';
    $password = 'xL7UIU4T|';

    $socket = @fsockopen($host, $port, $errno, $errstr, 15);
    if (!$socket) {
        return false;
    }

    // Read greeting
    fgets($socket, 515);

    // EHLO
    fputs($socket, "EHLO inpixellabs.com\r\n");
    while ($line = fgets($socket, 515)) {
        if (substr($line, 3, 1) === ' ') break;
    }

    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    fgets($socket, 515);

    // Username
    fputs($socket, base64_encode($username) . "\r\n");
    fgets($socket, 515);

    // Password
    fputs($socket, base64_encode($password) . "\r\n");
    $auth_res = fgets($socket, 515);
    if (substr($auth_res, 0, 3) !== '235') {
        fclose($socket);
        return false;
    }

    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    $mail_res = fgets($socket, 515);
    if (substr($mail_res, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }

    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $rcpt_res = fgets($socket, 515);
    if (substr($rcpt_res, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }

    // DATA
    fputs($socket, "DATA\r\n");
    $data_res = fgets($socket, 515);
    if (substr($data_res, 0, 3) !== '354') {
        fclose($socket);
        return false;
    }

    // Headers & Body
    $headers = "From: " . $from_name . " <" . $username . ">\r\n";
    $headers .= "To: <" . $to . ">\r\n";
    $headers .= "Reply-To: " . $client_email . "\r\n";
    $headers .= "Subject: " . $subject . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: InpixelLabs/1.0\r\n";
    $headers .= "\r\n";

    fputs($socket, $headers . $body_text . "\r\n.\r\n");
    $send_res = fgets($socket, 515);

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return (substr($send_res, 0, 3) === '250');
}

$to = 'hello@inpixellabs.com';
$subject = "New Inquiry: " . $name . " (" . $type . ")";

$body = "You have received a new project inquiry from the Inpixel Labs website:\n\n";
$body .= "Client Name: " . $name . "\n";
$body .= "Client Email: " . $email . "\n";
$body .= "Project Type: " . $type . "\n\n";
$body .= "Message:\n" . $message . "\n\n";
$body .= "---\nInpixel Labs • Jamnagar, Gujarat, India\nhttps://inpixellabs.com\n";

$sent = send_smtp_mail($to, $subject, $body, "Inpixel Labs Website", $email);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully via Hostinger SMTP!']);
} else {
    // Fallback to native mail()
    $headers = "From: Inpixel Labs <hello@inpixellabs.com>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    @mail($to, $subject, $body, $headers);
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Processed inquiry.']);
}
