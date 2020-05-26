---
id: 315
title: Create and test a service using translator container with Symfony2
date: 2015-10-16T16:24:24+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=315
permalink: /blog/315-create-test-symfony-service/
categories:
  - Uncategorized
---
Here is the code to create a service which uses the translator component from Symfony2. The service is also tested.

## Create the service

in _messages.en.yml_ :

<pre>cb.texta1: Travel from %A% to %B%</pre>

in _services.yml_ :

<pre>cb.labelbuilder:
  class: AppBundle\Service\LabelBuilder
  arguments: [@translator]</pre>

_LabelBuilder.php_`<br />
` 

<pre class="brush:php">namespace AppBundle\Service;

use Symfony\Component\Translation\TranslatorInterface;

class LabelBuilder {
    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(TranslatorInterface $translator) {
        $this-&gt;translator = $translator;
    }

    public function buildText1($labelA, $labelB) {
        return $this-&gt;translator-&gt;trans(
            'cb.texta1',
            [
                '%A%' =&gt; $labelA,
                '%B%' =&gt; $labelB
            ]
        );
    }
}</pre>

`<br />
` 

## Use the service in your controller

<pre>$this-&gt;get('cb.labelbuilder')-&gt;buildText1($lblA, $lblB);</pre>

## To test with PHPUnit

[Source SO](http://stackoverflow.com/questions/17798143/how-can-i-test-a-service-in-symfony2)

_LabelBuilderTest.php_

<pre class="brush:php">namespace AppBundle\Service;

use AppBundle\Entity\StatPriceDuration;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LabelBuilderTest extends WebTestCase {

    protected static $translation;

    public static function setUpBeforeClass() {
        $kernel = static::createKernel();
        $kernel-&gt;boot();
        self::$translation = $kernel-&gt;getContainer()-&gt;get('translator');
    }

    public function testBuildText1() {
        $builder = new LabelBuilder(self::$translation);

        $result = $builder-&gt;buildText1("Paris", "Lille");

        $this-&gt;assertEquals(
            trim($result),
            "Travel from Paris to Lille"
        );
    }
}</pre>

_  
_