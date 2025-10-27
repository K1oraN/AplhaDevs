import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Carrega arquivos de tradução da pasta /public/locales/[lng]/translation.json
  .use(HttpApi) 
  // Detecta o idioma do navegador do usuário
  .use(LanguageDetector) 
  // Integra o i18n com o React
  .use(initReactI18next) 
  .init({
    // Lista de idiomas que vamos suportar
    supportedLngs: ['pt-BR', 'en-US', 'es'], 

    // Idioma padrão caso a detecção falhe ou o idioma do usuário não esteja na lista
    fallbackLng: 'pt-BR', 

    // Configurações do detector de idioma
    detection: {
      // Ordem de detecção: 1º URL (?lng=en), 2º Cookie, 3º LocalStorage, 4º Navegador
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      // Onde salvar a escolha do usuário? Em um cookie.
      caches: ['cookie'], 
    },

    // Configurações do HttpApi (onde buscar os JSONs)
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', 
    },

    // Configuração do React (desativa o Suspense, que não precisamos aqui)
react: {
          // ***** ALTERE AQUI *****
          useSuspense: true, 
        },

        debug: true, 
      });

    export default i18n;