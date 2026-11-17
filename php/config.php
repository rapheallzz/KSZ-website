<?php
// ===== EDIT HERE: recipients and mail settings =====
return [
  'transport_to' => 'kszventures@gmail.com',   // where transport enquiries go
  'printing_to'  => 'kszventures@gmail.com',   // where print quotes go
  'from_email'   => 'no-reply@ksznigeria.com', // use an address on YOUR domain so mail is not rejected
  'from_name'    => 'KSZ Ventures Website',
  // 'mail' = PHP mail(). 'smtp' = SMTP via PHPMailer (run: composer require phpmailer/phpmailer).
  'transport'    => 'mail',
  'smtp' => ['host'=>'smtp.example.com','port'=>587,'user'=>'','pass'=>'','secure'=>'tls'],
  // LOCAL TESTING ONLY: true logs submissions to logs/ and reports success without sending mail.
  'dev_log_only' => false,
  'max_upload_bytes' => 5 * 1024 * 1024,
  'allowed_ext' => ['pdf','png','jpg','jpeg','ai','psd','cdr','zip'],
  'min_seconds' => 3,       // faster submits are treated as bots
  'max_per_hour' => 5,      // per visitor session
];
