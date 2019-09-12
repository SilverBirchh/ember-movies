import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | date', function(hooks) {
    setupRenderingTest(hooks);

    test('it a beautiful date', async function(assert) {
        this.set('date', '2019-09-08');

        await render(hbs `{{date date}}`);

        assert.equal(this.element.textContent.trim(), '8 / 8 / 2019');
    });
});