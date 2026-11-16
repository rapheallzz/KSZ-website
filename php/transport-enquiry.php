<?php
require __DIR__.'/lib.php'; guard();
$d = validate([
  'name'=>['Full name',1,'str'],'phone'=>['Phone number',1,'phone'],'email'=>['Email address',1,'email'],
  'service'=>['Service',1,'str'],'pickup'=>['Pickup location',1,'str'],'destination'=>['Destination',1,'str'],
  'date'=>['Travel date',1,'date'],'passengers'=>['Passengers',0,'int'],'info'=>['Additional information',0,'text'],
]);
$body = "New transport / logistics enquiry\n\n"; foreach ($d as $k => $v) $body .= ucfirst($k).": $v\n";
finish(send_notification(cfg()['transport_to'], 'Transport enquiry: '.$d['service'].' ('.$d['name'].')', $body, $d['email']),
  'Thank you! Your enquiry has been sent. We will contact you shortly.');
