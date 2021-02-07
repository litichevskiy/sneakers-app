const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

const formatDate = ( date ) => {

  const year = date.getFullYear();
  let month = date.getMonth();
  const day = date.getDate();
  const fullDateISO = `${year}-${addZero( month + 1 )}-${addZero( day )}`;
  month = SHORT_MONTHS[month];

  return{ year, month, day, fullDateISO };
};

const addZero = ( num ) => ( num < 10 ) ? `0${num}`: num;

export default formatDate;