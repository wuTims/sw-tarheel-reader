<?php
function slug_get_post_meta_cb( $object, $field_name, $request ) {
    $res = get_post_meta( $object[ 'id' ], $field_name, true );
    return $res;
}

function slug_update_post_meta_cb( $value, $object, $field_name ) {
    return update_post_meta( $object->ID, $field_name, $value );
}

function get_content_cb( $object, $field_name, $request ) {
    $c = get_post_field( 'post_content', $object[ 'id' ], 'raw' );
    $pages = array_map(trim, explode("<!--more-->", $c));
    return $pages;
}

function update_content_cb( $value, $object, $field_name ) {
    $content = implode('<!--more-->', $value);
    wp_update_post(array(
        'ID' => $object->ID,
        'post_content' => $content
    ));
}

function get_pages_cb( $object, $field_name, $request ) {
    $c = get_post_field( 'post_content', $object[ 'id' ], 'raw' );
    $captions = array_slice(array_map(trim, explode("<!--more-->", $c)), 1);
    $images = get_post_meta( $object['id'], 'images', true);
    $pages = array_map(function($caption, $image) { return array('caption'=>$caption, 'image'=>$image); }, $captions, $images);
    return $pages;
}

function update_pages_cb( $value, $post, $field_name ) {
    $captions = array();
    $images = array();
    foreach($value as $v) {
        $captions[] = $v['caption'];
        $images[] = $v['image'];
    }
    $title = $post->post_title;
    $author = get_post_meta( $post->ID, 'pseudonym', true);
    array_unshift($captions, $title . ' ' . $author);
    $content = implode("\n<!--more-->\n", $captions);
    wp_update_post(array(
        'ID' => $post->ID,
        'post_content' => $content
    ));
    update_post_meta( $post->ID, 'images', $images);
}

add_action( 'rest_api_init', function() {
    $fields = array(
        'audience',
        'images',
        'language',
        'pseudonym',
        'rating_count',
        'rating_sum',
        'reviewed'
    );
    foreach($fields as $field) {
        register_api_field( 'post',
            $field,
            array(
               'get_callback'    => 'slug_get_post_meta_cb',
               'update_callback' => 'slug_update_post_meta_cb',
               'schema'          => null,
            )
         );
    }
    register_api_field( 'post',
        'content',
        array(
            'get_callback' => 'get_pages_cb',
            'update_callback' => 'update_pages_cb',
            'schema' => null,
        )
    );

});
?>
