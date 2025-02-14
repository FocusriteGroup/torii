import UUIDGenerator from '@focusritegroup/torii/lib/uuid-generator';
import QUnit from 'qunit';

let { module, test } = QUnit;

module('Unit | Lib | UUIDGenerator');

test('exists', function(assert){
  assert.ok(UUIDGenerator);
});

test('.generate returns a new uuid each time', function(assert){
  var first = UUIDGenerator.generate();
  var second = UUIDGenerator.generate();

  assert.notEqual(first, second);
});
