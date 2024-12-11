<?php

/*
  Plugin Name: KW Image Gallery
  Description: Use custom block type to display images from the media library
  Version: 1.0
  Author: Karl Witek
  Author URI: https://karlwitek.com
*/

if (!defined('ABSPATH')) exit;

class SimpleGallery {
  function __construct() {
    add_action('init', array($this, 'loadAdmin'));
    add_action('wp_enqueue_scripts', array($this, 'loadCss'));
  }

  function loadAdmin() {

    // add custom image sizes here
    add_image_size('custkw-size', 100, 75);
    add_image_size('main-size', 800, 600);
    add_image_size('custom-test-full', 1200, 800, true);

    wp_register_script('simplegalleryblocktype', plugin_dir_url(__FILE__) . '/build/index.js', array('wp-blocks', 'wp-element', 'jquery'));
    register_block_type('kwplugin/simple-gallery', array(
      'editor_script' => 'simplegalleryblocktype',
      'render_callback' => array($this, 'blockHTML')
    ));

    // conditional for correct page here..move
    wp_enqueue_media();

  }

  function blockHTML($attributes) {

    // enqueue script to control the gallery features
    wp_enqueue_script('featuresjs',
                    plugin_dir_url(__FILE__) . 'javascript/gallery.js',
                    array('jquery'),
                    '1.0',
                    true
                    );

    ob_start(); ?>
      <div class="kwsg-block-container">
        <div class="kwsg-main-image-container">
          <div class="kwsg-overlay-parent">
              <div class="kwsg-abs-pos-overlay"></div>
              <?php foreach($attributes['arrIds'] as $key => $value) {
                ?>
                <div class="kwsg-large-img" data-id="<?php echo $key ?>">
                  <?php echo wp_get_attachment_image($value, 'full', false, [ 'class' => 'kwsg-gallery-large']);
                  ?>
                </div>
                <?php
              } ?>
          </div>       
        </div>
        <div class="kwsg-slide-container">
     
            <?php foreach($attributes['arrIds'] as $key => $value) { 
              ?>
                <div class="kwsg-slide-image-container" data-id="<?php echo $key ?>">
                <?php
                  echo wp_get_attachment_image($value, 'thumb', false, ['class' => 'kwsg-slide-size']);
                ?>
                </div>
              <?php
            } ?>
        </div>
      </div>
 

    <?php return ob_get_clean();
  }

  function loadCss() {
    wp_enqueue_style('gallerystyle',
    plugin_dir_url(__FILE__) . 'css/plugin-gallery.css',
    array(),
    'all'
    );
  }
}

$simpleGallery = new SimpleGallery();
