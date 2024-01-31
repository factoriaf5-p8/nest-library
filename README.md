## Autenticación con Nest.js y Passport

1. El backend recibe unas credenciales en una petición http:
   1. Controller Post que recibe las credenciales en el body invoca al método AuthService.signin(), pasando las credenciales. **Ver paso 3**.
   2. Decoramos el controller con un Guard (aka middleware) de tipo strategia local de passport (significa que llama a la estrategia local de passport)
      1. Crear la estrategia de passport con el método validate.
      2. El meth. validate debe invocar al método validateUser del AuthService.
      3. El método AuthService.validateUser debe llamar al método findUserByUsername del UserService para comprobar si existe un usuario con ese valor de username.
      4. el método UserService.findUserByUsername() debe llamar al método del repositorio(modelo, etc.) para hacer la query a la bbdd con el valor del username --> this.userModel.findOne(username).lean().exec().
   3. El controller invoca al método del AuthService que devuelve el token (AuthService.signin()).
      1. El método AuthService.signin() invoca al método de la librería jwtService.sign(información del user) pasando la información del user que ha inyectado la estrategia passport-local para generar el token de respuesta.
(.........lapsus)

    4. Recibir una petición por un end-point protegido.
       1. Decoramos el end-point que queremos proteger con el decorador de la strategia 'jwt'
       2. Instalamos la estrategia de jwt con el método validate que llamará a un método del AuthService que abrirá el token y obtendrá el usuario que lleva.
       3. Se hace petición a la bbdd para contrastar que el usuario existe y que tiene derecho a realizar la petición.
       4. Se devuelve el resultado de la petición.