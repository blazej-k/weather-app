import date from 'date-and-time';

const validateDate = (dateToFormat: Date, format: string) => date.format(dateToFormat, format)

export default validateDate