import { helper } from '@ember/component/helper';

export default helper(function date([date]/*, hash*/) {
  const fullDate = new Date(date);
  return `${fullDate.getDate()} / ${fullDate.getMonth()} / ${fullDate.getFullYear()}`;
});
