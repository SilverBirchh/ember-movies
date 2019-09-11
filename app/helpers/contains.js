import { helper } from '@ember/component/helper';

export default helper(function contains([items, item]/*, hash*/) {
  return items.map((movie) => {
    return movie.id;
  }).includes(item);
});
