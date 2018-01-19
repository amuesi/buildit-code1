/**
 * Created by mac on 11/08/2017.
 */
import { IonicErrorHandler } from 'ionic-angular';
import Raven from 'raven-js';

Raven
    .config('https://26e167f4ec5743888ae4298e717bc1cb@sentry.io/202611')
    .install();

export class SentryErrorHandler extends IonicErrorHandler {

    handleError(error) {
        // super.handleError(error);

        try {
            Raven.captureException(error.originalError || error);
        }
        catch(e) {
            console.error(e);
        }
    }
}