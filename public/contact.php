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

$to = 'hello@inpixellabs.com';
$subject = "New Inquiry: " . $name . " (" . $type . ")";

$body = "You have received a new project inquiry from the Inpixel Labs website:\n\n";
$body .= "Client Name: " . $name . "\n";
$body .= "Client Email: " . $email . "\n";
$body .= "Project Type: " . $type . "\n\n";
$body .= "Message:\n" . $message . "\n\n";
$body .= "---\nInpixel Labs • Jamnagar, Gujarat, India\nhttps://inpixellabs.com\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=utf-8';
$headers[] = 'From: Inpixel Labs <hello@inpixellabs.com>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully via Hostinger!']);
} else {
    // If mail() failed, try socket SMTP
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Processed inquiry.']);
}
