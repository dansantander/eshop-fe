import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogIn from '../components/auth/LogIn';
import Wrapper from './Wrapper';

Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Wrapper>
        <LogIn />
      </Wrapper>,
    );
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Has a non empty form', () => {
    expect(wrapper.find('form').children()).not.toBeNull();
  });
});
