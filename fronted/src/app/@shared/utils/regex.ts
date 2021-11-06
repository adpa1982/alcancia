export const regexType = {
  default: {
    exp: '^[a-zA-Z0-9ñÑáéíóúüÁÉÍÓÚÜ,.\\-_\\s]*$'
  },
  nameLastName: {
    exp: '([a-zA-Z]+) ([a-zA-Z]+)',
    message: 'Debe de ser en formato de nombre y apellido.'
  },
  word: {
    exp: '^[a-zA-Z0-9ñÑáéíóúüÁÉÍÓÚÜ,.\\-_]*$'
  },
  name: {
    exp: '^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ\\s]*$'
  },
  alphanumberWord: {
    exp: '^[a-zA-Z0-9]*$'
  },
  charWord: {
    exp: '^[a-zA-Z]*$'
  },
  anyWord: {
    exp: '^\\S*$'
  },
  percent: {
    exp: '^100$|^[0-9]{1,2}$|^[0-9]{1,2}\\.[0-9]{1,2}$'
  },
  email: {
    exp: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  },
  number: {
    exp: '^[0-9]*$'
  },
  time24: {
    exp: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
  },
  date: {
    exp: '^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}$',
    internal: 'dd/mm/yyyy'
  },
  password: {
    exp: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
  },
  documentNumber: {
    exp: '^[+]?([0-9][0-9]?[0-9]?)$'
  }

};
