import { ApplicantValidationRenderer } from './ApplicantValidationRenderer';
import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => { 
    let aliases = ['t', 'i18n']; 
    TCustomAttribute.configureAliases(aliases);
    instance.i18next.use(Backend); 
    return instance.setup({
      fallbackLng: 'en', 
      whitelist: ['en'],
      preload: ['en'], 
      ns: 'translation', 
      defaultNS: 'translation',
      fallbackNS: false,
      attributes: aliases,      
      lng: 'en', 
      debug: true, 
      backend: {                                  
        loadPath: './locales/{{lng}}/{{ns}}.json',
      }
    });
  });
  aurelia.use
  .standardConfiguration()
  .developmentLogging()
  .plugin(PLATFORM.moduleName('aurelia-dialog'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'))
  aurelia.container.registerHandler("simple-renderer", container => container.get(ApplicantValidationRenderer));
  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
