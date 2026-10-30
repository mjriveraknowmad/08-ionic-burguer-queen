import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '08-ionic-burguer-queen',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: false // Luego habilitaremos este plugin desde el app.component.ts, para que no de problemas al iniciar la app
    }
  }
};

export default config;
