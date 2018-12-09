# Panel Administrador Base creado con Angular + Lumen + JWT
## Akveo ngx-admin v3 + Lumen 5.7 + JWT 1.0-rc3

[![License](http://manu.cloud/wp-content/uploads/2017/03/manucloud_creador.png)](https://manu.cloud)
[![License](https://poser.pugx.org/laravel/lumen-framework/license.svg)](https://opensource.org/licenses/MIT)

Este repositorio cuenta con la version de Lumen 5.7 + JWT 1.0-rc3 para login de usuario y panel Akveo Ngx-admin v3, listo para clonar e iniciar todos tus proyectos.

## Instalación y configuración

1. Ingresar a 'app' y correr:
```sh
npm install
```
2. Ingresar a la carpeta 'api', en la raiz del proyecto y correr:
```sh
composer update
```
3. Correr el servicio en localhost dentro de la misma carpeta:
```sh
php -S localhost:8000 -t public
```
4. Una vez iniciado el servidor del respositorio, ingresa a la ruta <a target="_blank" href="http://localhost:8000/key">http://localhost:8000/key</a> para copiar la clave de 32 chars y luego pegarlo en tu archivo .env (APP_KEY).
5. Rellenar tu archivo .env con los datos de tu base de datos.
5. Corre las migraciones y las semillas:

```sh
php artisan migrate
php artisan db:seed
```

4. Listo! Configura tu Lumen y Panel a gusto.

[![N|Solid](http://manu.cloud/wp-content/uploads/2017/03/manucloud_createby.png)](https://manu.cloud)

Las instrucciones para generar este proyecto las podras encontrar aquí:
http://manu.cloud/framework/lumen/inicio-de-sesion-con-jwt-en-lumen/

Si deseas aprender a instalar Lumen desde cero:
http://manu.cloud/framework/lumen/como-instalar-lumen-5-4-en-nuestro-localhost/

# Creditos y Plataformas

### Ngx-Admin by Akeveo <a target="_blank" href="https://github.com/akveo/ngx-admin">Repositorio</a>
### Lumen PHP Framework <a target="_blank" href="https://github.com/laravel/lumen-framework">Repositorio</a>
### JWT-AUTH by tymondesigns <a target="_blank" href="https://github.com/tymondesigns/jwt-auth">Repositorio</a>

# Estados de los repositorios

## Ngx-Admin by Akeveo
[![Build Status](https://travis-ci.org/akveo/ngx-admin.svg?branch=master)](https://travis-ci.org/akveo/ngx-admin)
[![Join the chat at https://gitter.im/ng2-admin/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ng2-admin/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/akveo/ngx-admin/status.svg)](https://david-dm.org/akveo/ng2-admin)

# Lumen PHP Framework
[![Build Status](https://travis-ci.org/laravel/lumen-framework.svg)](https://travis-ci.org/laravel/lumen-framework)
[![Total Downloads](https://poser.pugx.org/laravel/lumen-framework/d/total.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/lumen-framework/v/stable.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/lumen-framework/v/unstable.svg)](https://packagist.org/packages/laravel/lumen-framework)
[![License](https://poser.pugx.org/laravel/lumen-framework/license.svg)](https://packagist.org/packages/laravel/lumen-framework)

# JWT-AUTH by tymondesigns
[![Build Status](http://img.shields.io/travis/tymondesigns/jwt-auth/master.svg?style=flat-square)](https://travis-ci.org/tymondesigns/jwt-auth)
[![Codecov branch](https://img.shields.io/codecov/c/github/tymondesigns/jwt-auth/develop.svg?style=flat-square)](https://codecov.io/github/tymondesigns/jwt-auth)
[![StyleCI](https://styleci.io/repos/23680678/shield?style=flat-square)](https://styleci.io/repos/23680678)
[![Latest Version](http://img.shields.io/packagist/v/tymon/jwt-auth.svg?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth)
[![Latest Dev Version](https://img.shields.io/packagist/vpre/tymon/jwt-auth.svg?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth#dev-develop)
[![Monthly Downloads](https://img.shields.io/packagist/dm/tymon/jwt-auth.svg?style=flat-square)](https://packagist.org/packages/tymon/jwt-auth)
[![Dependency Status](https://www.versioneye.com/php/tymon:jwt-auth/dev-develop/badge?style=flat-square)](https://www.versioneye.com/php/tymon:jwt-auth/dev-develop)
[![PHP-Eye](https://php-eye.com/badge/tymon/jwt-auth/tested.svg?style=flat-square)](https://php-eye.com/package/tymon/jwt-auth)
