import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class LoginAdditional extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      color: '',
      passcode: null,
      word: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.tabbar())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Additional Security"
            content="Please fill out your answers to the following"
          />

          {error && <Messages message={error} />}

          <Form>

            <Item stackedLabel>
              <Label>
Passcode (4-8 Digits)
              </Label>
              <Input onChangeText={v => this.handleChange('passcode', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
Favorite Color (Case Sensitive)
              </Label>
              <Input onChangeText={v => this.handleChange('color', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
Random Word (Case Sensitive)
              </Label>
              <Input onChangeText={v => this.handleChange('word', v)} />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
Finalize Login
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default LoginAdditional;
