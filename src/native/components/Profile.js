import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const Profile = ({ member, logout }) =>  {
  return (
    <Container>
    <Content>
      <List>
        {(member.address)
          ? (
            <View>
              <Content padder>
                <Header
                  title={`Bonjour,`}
                  content={`Your Ethereum wallet address is ${member.address} `}
                  fontSize={15}
                />
                {/*
                <Header
                  title={`Bonjour,`}
                  content={`Your Ethereum wallet address is ${member.address} \n\nYour Ethereum wallet balance is ${member.currentBalance === '0' ? member.currentBalance : 'loading.' }`}
                  fontSize={15}
                />
                */}
              </Content>

              {/*<ListItem onPress={Actions.tabbar} icon>
                <Left>
                  <Icon name="md-arrow-round-forward" />
                </Left>
                <Body>
                  <Text>
                    Refresh Balance
                  </Text>
                </Body>
              </ListItem>*/}

              <ListItem onPress={Actions.sendTxn} icon>
                <Left>
                  <Icon name="md-arrow-round-forward" />
                </Left>
                <Body>
                  <Text>
                    Send Money
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add" />
                </Left>
                <Body>
                  <Text>
                    Update Wallet Settings
                  </Text>
                </Body>
              </ListItem>

              <ListItem onPress={logout} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
          : (
            <View>
              <Content padder>
                <Header
                  title="Hello,"
                  content="Please login or sign up to unlock your wallet"
                />
              </Content>

              <ListItem onPress={Actions.login} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Login
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle" />
                </Left>
                <Body>
                  <Text>
                    Sign Up
                  </Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <Icon name="help-buoy" />
                </Left>
                <Body>
                  <Text>
                    Forgot Password
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
      </List>
    </Content>
  </Container>
  );
}



Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
