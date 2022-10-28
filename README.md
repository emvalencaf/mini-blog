# Mini Blog

## Sobre

Esse projeto foi desenvolvido durante o [curso de React do Profº. Matheus Battisti](https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/), cursado na plataforma da Udemy.

## Como usar

1. Abrir o terminal na pasta e digitar o comando: `npm install`;
2. Ir ao [firebase](https://firebase.google.com/) - caso não tenha conta, cadastrar-se - e adicionar um novo projeto vinculado a sua conta firebase;
3. Criar um aplicativo de [Autenticação]() e [Firestore]() no seu projeto firebase;
4. Ir ao diretório `src > firebase > config.firebase.js` e colocar o obejeto de configuração do aplicativo firebase, o código deverá preencher o firebaseconfig:``
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
``
5. Por fim, para colocar executar em ambiente de desenvolvimento, basta digitar o comando: `npm start` 