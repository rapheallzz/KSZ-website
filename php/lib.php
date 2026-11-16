<?php
// Shared helpers for both form endpoints.
function cfg(): array { static $c; return $c ??= require __DIR__.'/config.php'; }
function respond(int $code, array $d): void { http_response_code($code); header('Content-Type: application/json'); echo json_encode($d); exit; }
function clean(string $v, int $max = 500): string { $v = trim(strip_tags($v)); $v = preg_replace('/[\r\n]+/', ' ', $v); return mb_substr($v, 0, $max); }
function clean_text(string $v, int $max = 3000): string { return mb_substr(trim(strip_tags($v)), 0, $max); }

function guard(): void {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['ok'=>false,'message'=>'Method not allowed.']);
  if (!empty($_POST['website'])) respond(200, ['ok'=>true,'message'=>'Thank you.']);              // honeypot (bots fill it)
  $t = (int)($_POST['_t'] ?? 0);
  if ($t && (time() - intdiv($t, 1000)) < cfg()['min_seconds']) respond(429, ['ok'=>false,'message'=>'Please take a moment to complete the form, then submit again.']);
  session_start();
  $now = time(); $_SESSION['sent'] = array_filter($_SESSION['sent'] ?? [], fn($x) => $x > $now - 3600);
  if (count($_SESSION['sent']) >= cfg()['max_per_hour']) respond(429, ['ok'=>false,'message'=>'Too many submissions. Please try again later or call us.']);
}

function validate(array $rules): array {            // rules: field => [label, required, type]
  $out = []; $err = [];
  foreach ($rules as $f => [$label, $req, $type]) {
    $v = clean((string)($_POST[$f] ?? ''), $type === 'text' ? 3000 : 200);
    if ($type === 'text') $v = clean_text((string)($_POST[$f] ?? ''));
    if ($req && $v === '') { $err[$f] = "$label is required."; continue; }
    if ($v !== '') {
      if ($type === 'email' && !filter_var($v, FILTER_VALIDATE_EMAIL)) $err[$f] = 'Enter a valid email address.';
      if ($type === 'phone' && !preg_match('/^(\+?234|0)[789][01]\d{8}$|^\+?\d{7,15}$/', preg_replace('/[\s\-()]/', '', $v))) $err[$f] = 'Enter a valid phone number.';
      if ($type === 'date' && !strtotime($v)) $err[$f] = 'Enter a valid date.';
      if ($type === 'int' && !ctype_digit($v)) $err[$f] = "$label must be a number.";
    }
    $out[$f] = $v;
  }
  if ($err) respond(422, ['ok'=>false,'message'=>'Please fix the highlighted details.','errors'=>$err]);
  return $out;
}

function save_upload(string $field): ?array {       // returns [path, original name] or null
  if (empty($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) return null;
  $f = $_FILES[$field]; $c = cfg();
  if ($f['error'] !== UPLOAD_ERR_OK || $f['size'] > $c['max_upload_bytes']) respond(422, ['ok'=>false,'message'=>'File upload failed or is larger than 5 MB.']);
  $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
  if (!in_array($ext, $c['allowed_ext'], true)) respond(422, ['ok'=>false,'message'=>'This file type is not allowed. Use PDF, image, AI, PSD, CDR or ZIP.']);
  $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
  if (preg_match('#php|x-httpd|html|javascript#i', (string)$mime)) respond(422, ['ok'=>false,'message'=>'This file type is not allowed.']);
  $dir = dirname(__DIR__).'/uploads'; if (!is_dir($dir)) mkdir($dir, 0755, true);
  $name = bin2hex(random_bytes(12)).'.'.$ext;
  if (!move_uploaded_file($f['tmp_name'], "$dir/$name")) respond(500, ['ok'=>false,'message'=>'Could not store the uploaded file.']);
  return ["$dir/$name", clean($f['name'], 120)];
}

function send_notification(string $to, string $subject, string $body, ?string $replyTo = null, ?array $attach = null): bool {
  $c = cfg();
  if ($c['dev_log_only']) { @file_put_contents(dirname(__DIR__).'/logs/submissions.log', date('c')."\n$subject\n$body\n".($attach ? "ATTACHMENT: {$attach[0]}\n" : '')."----\n", FILE_APPEND); return true; }
  if ($c['transport'] === 'smtp') {
    $auto = dirname(__DIR__).'/vendor/autoload.php';
    if (!file_exists($auto)) return false; require $auto;
    try { $m = new PHPMailer\PHPMailer\PHPMailer(true); $s = $c['smtp'];
      $m->isSMTP(); $m->Host = $s['host']; $m->Port = $s['port']; $m->SMTPAuth = true; $m->Username = $s['user']; $m->Password = $s['pass']; $m->SMTPSecure = $s['secure'];
      $m->setFrom($c['from_email'], $c['from_name']); $m->addAddress($to); if ($replyTo) $m->addReplyTo($replyTo);
      $m->Subject = $subject; $m->Body = $body; if ($attach) $m->addAttachment($attach[0], $attach[1]); return $m->send();
    } catch (Throwable $e) { return false; }
  }
  $from = sprintf('%s <%s>', $c['from_name'], $c['from_email']);
  $h = "From: $from\r\n".($replyTo ? "Reply-To: $replyTo\r\n" : '');
  if ($attach) {
    $b = 'b'.bin2hex(random_bytes(8)); $h .= "MIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"$b\"\r\n";
    $msg = "--$b\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$body\r\n--$b\r\nContent-Type: application/octet-stream; name=\"{$attach[1]}\"\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"{$attach[1]}\"\r\n\r\n".chunk_split(base64_encode(file_get_contents($attach[0])))."--$b--";
    return mail($to, $subject, $msg, $h);
  }
  return mail($to, $subject, $body, $h."Content-Type: text/plain; charset=UTF-8\r\n");
}

function finish(bool $sent, string $okMsg): void {
  if (!$sent) respond(500, ['ok'=>false,'message'=>'We could not send your request right now. Please call us or use WhatsApp.']);
  $_SESSION['sent'][] = time(); respond(200, ['ok'=>true,'message'=>$okMsg]);
}
