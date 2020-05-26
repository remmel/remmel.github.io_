---
id: 255
title: 'Symfony 2 : This script is only accessible from localhost / You are not allowed to access this file'
date: 2011-11-09T14:28:50+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=255
permalink: /blog/255-symfony-2-this-script-is-only-accessible-from-localhost-you-are-not-allowed-to-access-this-file/
categories:
  - Uncategorized
---
Vous voulez accèder au fichier app_dev.php ou config.php de votre application Symfony 2, mais vous avez l&#8217;erreur &#8220;This script is only accessible from localhost&#8221; ou &#8220;You are not allowed to access this file&#8221;.  
Récupérer votre IP et ajouter là dans le fichier app_dev.php et config.php en modifiant le code ci-dessous:

<pre class="brush:php">if (!in_array(@$_SERVER['REMOTE_ADDR'], array(
    '127.0.0.1',
    '::1',
	'MONIP'
))) {
    header('HTTP/1.0 403 Forbidden');
    exit('This script is only accessible from localhost.');
}
</pre>