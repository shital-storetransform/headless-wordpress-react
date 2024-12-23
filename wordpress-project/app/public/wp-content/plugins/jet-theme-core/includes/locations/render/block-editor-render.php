<?php
namespace Jet_Theme_Core\Locations\Render;

use Jet_Theme_Core\Locations\Render\Base_Render as Base_Render;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Block_Editor_Render extends Base_Render {

	/**
	 * [$name description]
	 * @var string
	 */
	protected $name = 'block-editor-location-render';

	/**
	 * [init description]
	 * @return [type] [description]
	 */
	public function init() {}

	/**
	 * [get_name description]
	 * @return [type] [description]
	 */
	public function get_name() {
		return $this->name;
	}

	/**
	 * [render description]
	 * @return [type] [description]
	 */
	public function render() {
		$template_id = $this->get( 'template_id' );
		$location = $this->get('location');

		$template_id = apply_filters( 'jet-theme-core/location/render/template-id', $template_id );

		$structure = jet_theme_core()->locations->get_structure_for_location( $location );

		if ( $structure ) {
			jet_theme_core()->admin_bar->register_post_item( $template_id, array(
				'sub_title' => $structure->get_single_label(),
				'priority'  => $structure->get_admin_bar_priority(),
			) );
		}

		$template_obj = get_post( $template_id );
		$raw_template_content = $template_obj->post_content;

		if ( empty( $raw_template_content ) ) {
			return false;
		}

		$blocks_template_content = apply_filters( 'jet-theme-core/location/render/default-content/template/content', do_blocks( $raw_template_content ), $template_id, $location ) ;

		$this->maybe_enqueue_css();

		echo do_shortcode( $blocks_template_content );

		return true;

	}

	/**
	 * [render description]
	 * @return [type] [description]
	 */
	public function maybe_enqueue_css() {
		
		if ( ! class_exists( '\JET_SM\Gutenberg\Style_Manager' ) ) {
			return;
		}

		$template_id = $this->get( 'template_id' );
		
		\JET_SM\Gutenberg\Style_Manager::get_instance()->render_blocks_style( $template_id );
		\JET_SM\Gutenberg\Style_Manager::get_instance()->render_blocks_fonts( $template_id );

	}
}
