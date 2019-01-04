import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, H1 } from 'native-base';
import Spacer from './Spacer';

const Header = ({ title, content, fontSize}) => (
  <View>
    <Spacer size={25} />
    <H1>
      {title}
    </H1>
    {!!content && (
      <View>
        <Spacer size={10} />
        <Text style={fontSize ? {fontSize: fontSize} : null}>
          {content}
        </Text>
      </View>
    )}
    <Spacer size={25} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Header.defaultProps = {
  title: 'Missing title',
  content: '',
};

export default Header;
