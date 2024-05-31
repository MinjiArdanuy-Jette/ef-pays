<?php
/**
 * Package Voyage
 * Version 1.0.0
 */
/*
Plugin name: Voyage
Plugin uri: https://github.com/eddytuto
Version: 1.0.0
Description: Permet d'afficher les destinations qui répondent à certains critères
*/
echo header("Access-Control-Allow-Origin: http://localhost");
function eddym_enqueue()
{
  // filemtime // retourne en milliseconde le temps de la dernière modification
// plugin_dir_path // retourne le chemin du répertoire du plugin
// __FILE__ // le fichier en train de s'exécuter
// wp_enqueue_style() // Intègre le link:css dans la page
// wp_enqueue_script() // intègre le script dans la page
// wp_enqueue_scripts // le hook

  $version_css = filemtime(plugin_dir_path(__FILE__) . "style.css");
  $version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
  wp_enqueue_style(
    'em_plugin_voyage_css',
    plugin_dir_url(__FILE__) . "style.css",
    array(),
    $version_css
  );

  wp_enqueue_script(
    'em_plugin_voyage_js',
    plugin_dir_url(__FILE__) . "js/voyage.js",
    array(),
    $version_js,
    true
  );
}
add_action('wp_enqueue_scripts', 'eddym_enqueue');
/* Création de la liste des destinations en HTML */
function creation_destinations()
{
  $contenu = '<select id="filtres">
  <option value="4"selected>La catégorie qui plaît ce mois-ci</option>
  <option value="16">Les rabais du mois</option>
  <option value="17">Les lieux les plus visités</option>
</select>
  <div class = "slider">
    <div class="contenu__restapi">
    </div>
    </div>';
  return $contenu;
}

add_shortcode('em_destination', 'creation_destinations');
