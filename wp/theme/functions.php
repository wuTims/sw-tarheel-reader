<?php
function slug_get_post_meta_cb( $object, $field_name, $request ) {
    $res = get_post_meta( $object[ 'id' ], $field_name, true );
    return $res;
}

function slug_update_post_meta_cb( $value, $object, $field_name ) {
    return update_post_meta( $object->ID, $field_name, $value );
}

function get_text_cb( $object, $field_name, $request ) {
    $c = get_post_field( 'post_content', $object[ 'id' ], 'raw' );
    //$c = html_entity_decode($c, $flags=ENT_COMPAT|ENT_HTML401, 'utf-8');
    $pages = array_map(trim, explode("<!--more-->", $c));
    return $pages;
}

function update_text_cb( $value, $object, $field_name ) {
    $content = implode("\n<!--more-->\n", $value);
    wp_update_post(array(
        'ID' => $object->ID,
        'post_content' => $content
    ));
}

function get_title_cb( $object, $field_name, $request ) {
    $c = get_the_title( $object['id'] );
    $c = html_entity_decode($c, $flags=ENT_COMPAT|ENT_HTML401, 'utf-8');
    return $c;
}

add_action( 'rest_api_init', function() {
    $fields = array(
        'audience',
        'pictures',
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
        'text',
        array(
            'get_callback' => 'get_text_cb',
            'update_callback' => 'update_text_cb',
            'schema' => null,
        )
    );

    register_api_field( 'post',
        'title',
        array(
            'get_callback' => 'get_title_cb',
            'update_callback' => null,
            'schema' => null,
        )
    );

});
?>
