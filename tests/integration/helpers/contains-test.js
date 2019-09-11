import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | contains', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns true when the movie is in the array', async function(assert) {
    this.set('items', [
      {
        id: 1
      }
    ]);
    this.set('id', 1);

    await render(hbs`{{contains items id}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it returns false when the movie is not in the array', async function(assert) {
    this.set('items', [
      {
        id: 1
      }
    ]);
    this.set('id', 11);

    await render(hbs`{{contains items id}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });
});
