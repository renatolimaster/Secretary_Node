const log = console.log;
const addminutes = async (hours, actualminutes, newminutes) => {
  console.log('================> addminutes <======================');
  let newhours = parseInt(hours);
  let totalminutes = parseInt(actualminutes) + parseInt(newminutes);
  log('hours', hours);
  log('actualminutes', actualminutes);
  log('newminutes', newminutes);
  if (totalminutes >= 60) {
    newhours = parseInt(hours) + 1;
    newminutes = totalminutes - 60;
  } else {
    newminutes = totalminutes;
  }
  log('newhours', newhours);
  log('newminutes', newminutes);
  return { newhours, newminutes };
};

module.exports = { addminutes };