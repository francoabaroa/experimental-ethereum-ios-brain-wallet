import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import Spacer from './Spacer';

const About = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>
        About CN
      </H1>
      <Spacer size={10} />
      <Text>
        CN is the safest wallet out there. Boom.
        {' '}
      </Text>
    </Content>
  </Container>
);

export default About;
