import { clearStorage, getItem, setItem } from 'ember-movies/utils/local-storage';
import { module, test } from 'qunit';

module('Unit | Utility | local-storage', function(hooks) {

  hooks.afterEach(async function() {
    await clearStorage();
  });

  test('it can and set an item', async function(assert) {
    await setItem('foo', 'bar');
    const value = await getItem('foo');
    assert.equal(value, 'bar');
  });
});
