import { getScript } from 'belter/src';

import { SDK_SETTINGS } from './constants';
import { getHost, getPath } from './globals';

export function getSDKScript() {
    var script = getScript({ host: getHost(), path: getPath() });

    if (!script) {
        throw new Error('PayPal Payments SDK script not present on page! Excected to find <script src="https://' + getHost() + getPath() + '">');
    }

    return script;
}

export function getSDKSettings() {
    var sdkScript = getSDKScript();

    return {
        clientToken: sdkScript.getAttribute(SDK_SETTINGS.CLIENT_TOKEN),
        partnerAttributionID: sdkScript.getAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID)
    };
}

export function getClientToken() {
    var _getSDKSettings = getSDKSettings(),
        clientToken = _getSDKSettings.clientToken;

    if (!clientToken) {
        throw new Error('Expected data-client-token="xyz" to be passed with client token, to ' + getSDKScript().outerHTML);
    }

    return clientToken;
}