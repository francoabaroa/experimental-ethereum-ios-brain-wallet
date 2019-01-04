import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View,
} from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class SendMoney extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      amount: PropTypes.string,
      currency: PropTypes.string,
      gas: PropTypes.string,
      toAddress: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      /* ETH default */
      currency: 'ETH',
      gas: '',
      toAddress: '',
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
    onFormSubmit(this.state, this.props)
      .then(() => Actions.confirm())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, success } = this.props;
    const {
      amount,
      gas,
      toAddress,
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item stackedLabel>
              <Label>
                To Address
              </Label>
              <Input
                value={toAddress}
                style={{fontSize:14}}
                onChangeText={v => this.handleChange('toAddress', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Amount (ETH)
              </Label>
              <Input
                value={amount}
                onChangeText={v => this.handleChange('amount', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Gas (GWEI)
              </Label>
              <Input
                value={gas}
                onChangeText={v => this.handleChange('gas', v)}
              />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
                Send
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SendMoney;
