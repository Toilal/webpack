import HelloWorld from '@/components/HelloWorld'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import { mount } from 'vue-test-utils'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(HelloWorld){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(wrapper.find('.hello h1').element.textContent)
    {{#if_eq runner "karma"}}.to.equal('Welcome to Your Vue.js App'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{/if_eq}}{{#if_eq runner "jest"}}.toEqual('Welcome to Your Vue.js App'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
