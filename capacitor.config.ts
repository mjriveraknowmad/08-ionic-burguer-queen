import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '08-ionic-burguer-queen',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: false // Luego habilitaremos este plugin desde el app.component.ts, para que no de problemas al iniciar la app
    },
    server: {
      cleartext: true, // para permitir conexiones HTTP en Android, en las ultimas versiones no lo permite, solo permite HTTPS por defecto
      androidScheme: 'http'  // relacionado con lo anterior, y en nuestro caso con las imágenes, que no se mostrarían si no ponemos esto
    }
  }
};

export default config;
