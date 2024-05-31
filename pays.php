<?php
/**
 * Package Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/e0958030
Version: 1.0.0
Description: Permet d'afficher les destinations qui répondent à certains critères
*/
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
function creer_bouton_pays()
{
  $articles = get_posts();
  $contenu = '';
  foreach ($articles as $article) {
    // echo $article;
  }
  // $contenu = '<button' . $article . '</button>';
  // foreach ($categories as $category) {
  //   $nom = $category->name;
  //   $id = $category->term_id;
  //   // $contenu .= '<button''</button>';
  //}

  return $contenu;
}

function creation_destinations()
{
  $contenu = creer_bouton_pays() . '<div class="contenu__restapi"></div>';
  return $contenu;
}

add_shortcode('maj_pays', 'creation_destinations');
?>