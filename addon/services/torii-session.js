import { Promise as EmberPromise, reject } from 'rsvp';
import Service from '@ember/service';
import { on } from '@ember/object/evented';
import { get, computed } from '@ember/object';
import createStateMachine from 'torii/session/state-machine';
import { getOwner } from 'torii/lib/container-utils';
// import { tagForObject } from '@ember/-internals/metal';
// import { updateTag } from '@glimmer/validator';
// import { setProxy, setupMandatorySetter, isObject } from '@ember/-internals/utils';
// import { setCustomTagFor } from '@glimmer/manager';

// function contentFor(proxy) {
//   let content = get(proxy, 'content');
//   updateTag(tagForObject(proxy), tagForObject(content));
//   return content;
// }

// function customTagForProxy(proxy, key, addMandatorySetter) {
//   let meta = tagMetaFor(proxy);
//   let tag = tagFor(proxy, key, meta);

//   if (DEBUG) {
//     // TODO: Replace this with something more first class for tracking tags in DEBUG
//     tag._propertyKey = key;
//   }

//   if (key in proxy) {
//     if (DEBUG && addMandatorySetter) {
//       setupMandatorySetter(tag, proxy, key);
//     }

//     return tag;
//   } else {
//     let tags = [tag, tagFor(proxy, 'content', meta)];

//     let content = contentFor(proxy);

//     if (isObject(content)) {
//       tags.push(tagForProperty(content, key, addMandatorySetter));
//     }

//     return combine(tags);
//   }
// }

function lookupAdapter(container, authenticationType){
  var adapter = container.lookup('torii-adapter:'+authenticationType);
  if (!adapter) {
    adapter = container.lookup('torii-adapter:application');
  }
  return adapter;
}

export default Service.extend({
  state: null,

  stateMachine: computed(function(){
    return createStateMachine(this);
  }),

  setupStateProxy: on('init', function(){
    var sm    = this.get('stateMachine'),
        proxy = this;
    sm.on('didTransition', function(){
      proxy.set('content', sm.state);
      proxy.set('currentStateName', sm.currentStateName);
    });
  }),

  content: null,

  // isTruthy: computed('content', function () {
  //   return Boolean(get(this, 'content'));
  // }),

  // init() {
  //   this._super(...arguments);
  //   setProxy(this);
  //   tagForObject(this);
  //   setCustomTagFor(this, customTagForProxy);
  // },

  willDestroy() {
    this.set('content', null);
    this._super(...arguments);
  },

  unknownProperty(key) {
    // let content = contentFor(this);
    // console.log('content', content, this.content);
    const content = get(this, 'content')
    if (content) {
      return get(content, key);
    }
  },

  // Make these properties one-way.
  setUnknownProperty() {},

  open(provider, options) {
    var owner     = getOwner(this),
        torii     = getOwner(this).lookup('service:torii'),
        sm        = this.get('stateMachine');

    return new EmberPromise(function(resolve){
      sm.send('startOpen');
      resolve();
    }).then(function(){
      return torii.open(provider, options);
    }).then(function(authorization){
      var adapter = lookupAdapter(
        owner, provider
      );

      return adapter.open(authorization);
    }).then(function(user){
      sm.send('finishOpen', user);
      return user;
    }).catch(function(error){
      sm.send('failOpen', error);
      return reject(error);
    });
  },

  fetch(provider, options) {
    var owner     = getOwner(this),
        sm        = this.get('stateMachine');

    return new EmberPromise(function(resolve){
      sm.send('startFetch');
      resolve();
    }).then(function(){
      var adapter = lookupAdapter(
        owner, provider
      );

      return adapter.fetch(options);
    }).then(function(data){
      sm.send('finishFetch', data);
      return;
    }).catch(function(error){
      sm.send('failFetch', error);
      return reject(error);
    });
  },

  close(provider, options) {
    var owner     = getOwner(this),
        sm        = this.get('stateMachine');

    return new EmberPromise(function(resolve){
      sm.send('startClose');
      resolve();
    }).then(function(){
      var adapter = lookupAdapter(owner, provider);
      return adapter.close(options);
    }).then(function(){
      sm.send('finishClose');
    }).catch(function(error){
      sm.send('failClose', error);
      return reject(error);
    });
  }
});
