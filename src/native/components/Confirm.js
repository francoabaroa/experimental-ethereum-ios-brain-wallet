import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View,
} from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class Confirm extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    member: PropTypes.shape({
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
    };

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
         <Header
            title={`Sent!`}
            content={`Please head over to Etherscan to confirm.`}
            fontSize={15}
          />
        </Content>
      </Container>
    );
  }
}

export default Confirm;
