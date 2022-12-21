import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart
//Deep
const Snippets = {
  tags: function ({ id, events, dataLayer, dataLayerName, preview, auth }) {
    const gtm_auth = `&gtm_auth=${auth}`
    const gtm_preview = `&gtm_preview=${preview}`

    if (!id) warn('GTM Id is required')

    const iframe = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${id}${gtm_auth}${gtm_preview}&gtm_cookies_win=x"
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`

    const script = `
      (function(w,d,s,l,i){w[l]=w[l]||[];
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id=G-S8DQVCX660?id='+i+dl+'${gtm_auth}${gtm_preview}&gtm_cookies_win=x';
        w[l].push({'js': new Date(),config:'G-S8DQVCX660'});
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','${dataLayerName}','${id}');`

    const dataLayerVar = this.dataLayer(dataLayer, dataLayerName)

    return {
      iframe,
      script,
      dataLayerVar,
    }
  },
  dataLayer: function (dataLayer, dataLayerName) {
    return `
      window.${dataLayerName} = window.${dataLayerName} || [];
      window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`
  },
}

module.exports = Snippets
