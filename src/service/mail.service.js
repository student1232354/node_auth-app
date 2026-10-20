'use strict';

const nodemailer = require('nodemailer');
// бібліотека яка дозволяє кидати лист на email

// Транспортер створюється під час відправки, щоб змінні з .env
// точно були вже завантажені.
const getTransporter = () => {
  const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;
  // беремо інфу про акк, у  .env

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    throw new Error('EMAIL_USER and EMAIL_APP_PASSWORD must be set in .env');
  } // кидає помилку якщо того чи іншого немає

  return nodemailer.createTransport({
    // тут створюємо об'єкт який отримує функція createTransport
    service: 'gmail', // яким саме форматом буде кидатись
    auth: {
      // автор цього листа, ті значення які ми отримали з  .env
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });
};

const sendActivationEmail = async (email, activationToken) => {
  const apiUrl =
    process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`;
  // типу як посилання на наш сервер,

  const activationUrl = `${apiUrl}/activation/${activationToken}`; // Url-ка яка веде до активації, беремо наший apiUrl, та activationToken
  // P.S. ACtivationToken - рандомний набір символів який записується в наш
  // User.Model.js - і потім використовується для того
  // щоб підтвердити реєстрацію

  await getTransporter().sendMail({
    // очікуємо якусь незрозумілу функцію getTransporter(),
    //  від якої можемо кинути функцію semdMail - яка отримує в себе об'єкт
    from: `"Auth App" <${process.env.EMAIL_USER}>`, // від нашого сервера
    to: email, // до email, якого ми отримуємо через async
    subject: 'Activate your account', // не знаю що це, типу просто рядок
    text: `Activate your account: ${activationUrl}`, // тут також типу як значення в об'єкті яке дорівнює нашому activationUrl
    html: `
   <p>Thank you for registering!</p> // дякую за регістрацію і т.д., типу просто якийсь шматок ромітки з нашими створеними значеннями
   <p>Click the link below to activate your account:</p>
   <p><a href="${activationUrl}">${activationUrl}</a></p>
  `,
  });
};

module.exports = {
  sendActivationEmail, // загалом це функція яка створює шаблонний об'єкт
  // який потім перетворюється на лист який отримує клієнт по значенню  email
};
