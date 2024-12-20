<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'BUK3NNI R7Km0J`(Yc/!4gQUqSB+8l$1[=K=h(1UP:S;7tU1Rc%OPIL{$>Ffx0wf' );
define( 'SECURE_AUTH_KEY',   '+9n4/Fj2^e}Ga~=e{Ew`pj #<n!+NV3_tO$oBpKdIq:M#Mz`gu[KbJ: 5yM/ZE:R' );
define( 'LOGGED_IN_KEY',     'rau(9?$%pf]8v@G*q(/%QIcH=#wqMJo[6wzyWveGMnxSVdC+-&!S`9SxXT|a4;U*' );
define( 'NONCE_KEY',         'BRC^*)@9{fGGRc+R@So;{b|{aI[/Ge;]8)|<#y_$69CWETj^PW2z6&n<[!+z xP}' );
define( 'AUTH_SALT',         'Wn|9jyZj=$-g2Gc=7~nrU>!0*&|A`{biXA0W&UUP}>Z93z@G#8aD)t%/bVcR-<8X' );
define( 'SECURE_AUTH_SALT',  '~OsYhT~_q_[;aYRTj;g1r^/2#9zN`/n)v0D3M:0X ;7Q:P{>t<~vLN|)+)vDb{|(' );
define( 'LOGGED_IN_SALT',    '{iySu4PZ_^LyTu)FOFhHamS5y{~nV;-jYet=f7;.yZbm_q+z{w8IBrcuTSEj(;z,' );
define( 'NONCE_SALT',        'WUvHA6krkD6$iUB%+s{EWm<Yb0b5Mp{@DTcHs^mv7k?c3MvEgAFe$Xe0aqr_@vzn' );
define( 'WP_CACHE_KEY_SALT', 'z?1Pnu*-;Uym_bf.C[=gyy1S~z|QE`NYSHOp;|f0e@N?B}t{nIo`^0IJwqW4$r5S' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
