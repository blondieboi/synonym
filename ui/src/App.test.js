import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import SearchInput from './Components/SearchInput'



describe('SearchInput', () => {
  it('has the correct text', () => {
    const wrapper = shallow(<SearchInput />);
    const text = wrapper.find('#search-text').text();
    expect(text).toEqual('What is a synonym for the word:');
  });

  it('has no value in input field when app is first rendered', () => {
    const wrapper = shallow(<SearchInput />);
    const input = wrapper.find('#search-input')
    expect(input.props().value).toEqual('')
  })

  it('has search button hidden when app is first rendered', () => {
    const wrapper = shallow(<SearchInput />);
    const button = wrapper.find('#search-button')
    expect(button).toHaveLength(0)
  })

  it('has no search results when app is first rendered', () => {
    const wrapper = shallow(<SearchInput />);
    const results = wrapper.find('#search-results')
    expect(results).toHaveLength(0)
  })

  it('has no error when app is first rendered', () => {
    const wrapper = shallow(<SearchInput />);
    const error = wrapper.find('#search-error')
    expect(error).toHaveLength(0)
  })

  it('renders the search button when user inputs a value', () => {
    const wrapper = shallow(<SearchInput />);
    const input = wrapper.find('#search-input')
    input.props().onChange({target: {value: 'a'}})
    const button = wrapper.find('#search-button')
    const loader = wrapper.find('#loader')
    expect(button).toHaveLength(1)
    expect(loader).toHaveLength(0)
    expect(button.text()).toBe('Search')
  })
});