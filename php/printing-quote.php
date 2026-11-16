<?php
require __DIR__.'/lib.php'; guard();
$d = validate([
  'name'=>['Full name',1,'str'],'company'=>['Company name',0,'str'],'phone'=>['Phone number',1,'phone'],'email'=>['Email address',1,'email'],
  'service'=>['Service',1,'str'],'quantity'=>['Quantity',1,'str'],'description'=>['Project description',1,'text'],'date'=>['Delivery date',0,'date'],
]);
$file = save_upload('file');
$body = "New printing & branding quote request\n\n"; foreach ($d as $k => $v) $body .= ucfirst($k).": $v\n";
if ($file) $body .= "Attachment: {$file[1]}\n";
finish(send_notification(cfg()['printing_to'], 'Quote request: '.$d['service'].' ('.$d['name'].')', $body, $d['email'], $file),
  'Thank you! Your quote request has been sent. We will get back to you shortly.');
