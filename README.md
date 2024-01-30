## Autenticación con Nest.js y Passport

1. El backend recibe unas credenciales en una petición http:
   1. Controller Post que recibe las credenciales en el body invoca al método AuthService.signin(), pasando las credenciales. **Ver paso 3**.
   2. Decoramos el controller con un Guard de tipo strategia local de passport (significa que llama a la estrategia local de passport)
      1. Crear la estrategia de passport con el método validate.
      2. El meth. validate debe invocar al método validateUser del AuthService.
      3. El método AuthService.validateUser debe llamar al método findUserByUsername del UserService para comprobar si existe un usuario con ese valor de username.
      4. el método UserService.findUserByUsername() debe llamar al método del repositorio(modelo, etc.) para hacer la query a la bbdd con el valor del username --> this.userModel.findOne(username).lean().exec().
   3. El controller invoca al método del AuthService que devuelve el token (AuthService.signin()).
      1. El método AuthService.signin() invoca al método de la librería jwtService.sign(información del user) pasando la información del user que ha inyectado la estrategia passport-local para generar el token de respuesta.
