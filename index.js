'use strict';

module.exports = {
  name: require('./package').name,
  /**
	 * Add our scripts to the page if enabled.
   * @public
   * @param {String} type
   * @param {Object} envConfig
	 * @return {undefined|String}
   */
   contentFor(type, envConfig) {
     const env = envConfig.environment;
     let content = '';

     if ( type === 'head' ) {
       content += this.addGoogleAnalytics(envConfig, env);
     }

     return content;
   },
   /**
  * Returns the google analytics script.
  * @public
  * @param {Object} settings
  * @return {String}
  */
  addGoogleAnalytics(settings, env) {
    const analyticsSettings = get(settings, 'emberTracker.analyticsSettings');
    let script = '';

    if (env === 'test' || !analyticsSettings || !analyticsSettings.trackingId) {
      return '';
    }

    const trackingId = analyticsSettings.trackingId;

    script += `<!-- Global site tag (gtag.js) - Google Analytics -->
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-TNXR3G6X5B"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${trackingId}');
              </script>`;
    console.log(scripts)

    return script;
  },
};

function get(obj, keys) {
	if (!obj) {
		return null;
	}

	const parts = keys.split('.');

	if (obj[parts[0]] === 'undefined') {
		return null;
	}

	if (parts.length === 1) {
		return obj[parts[0]];
	}

	return get(obj[parts.shift()], parts.join('.'));
}
