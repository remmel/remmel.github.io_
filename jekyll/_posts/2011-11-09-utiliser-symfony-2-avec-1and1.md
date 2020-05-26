---
id: 241
title: Utiliser Symfony 2 avec 1and1
date: 2011-11-09T14:06:36+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=241
permalink: /blog/241-utiliser-symfony-2-avec-1and1/
categories:
  - Uncategorized
---
Symfony 2 à besoin de php 5.2.3. Vous devez donc créer/éditer le .htaccess à la racine et y ajouter:  
  
`AddType x-mapp-php6 .php`  
  
Cela va vous permettre d&#8217;utiliser la version php 5.4.0beta1.  
  
Il reste maintenant le problème de timezone, pour cela créez un fichier php.ini dans le répertoire Symfony/web contenant:  
  
`date.timezone = "Europe/Paris"<br />
short_open_tag = off<br />
magic_quotes_gpc = off<br />`  
  
Maintenant vous pouvez lancer, `http://foo/bar/Symfony/web/config.php` et vous ne devriez plus avoir de problèmes.