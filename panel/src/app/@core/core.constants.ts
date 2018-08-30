import { environment } from '../../environments/environment';

export const SITE_URL:string = !environment.production ? "http://api.login-base.test/v1/" : "https://api.login-base.test/v1/";

export const IMAGES_ROOT = 'assets/img/';

export const isMobile = () => (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());

export const SITE_CONF = {
    "companyName" : "Incubit"
};
