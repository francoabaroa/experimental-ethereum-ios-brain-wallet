import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import SignUpAdditionalComponent from '../components/SignUpAdditional';
import SignUpAdditionalContainer from '../../containers/SignUpAdditional';

import LoginAdditionalComponent from '../components/LoginAdditional';
import LoginAdditionalContainer from '../../containers/LoginAdditional';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import SendMoneyContainer from '../../containers/SendMoney';
import SendMoneyComponent from '../components/SendMoney';

import ConfirmContainer from '../../containers/Confirm';
import ConfirmComponent from '../components/Confirm';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';

const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >

        <Stack
          key="profile"
          title="WALLET"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUpAdditional"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpAdditionalContainer}
            Layout={SignUpAdditionalComponent}
          />
          <Scene
            back
            key="loginAdditional"
            title="LOG IN"
            {...DefaultProps.navbarProps}
            component={LoginAdditionalContainer}
            Layout={LoginAdditionalComponent}
          />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>

        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        {/*
        <Stack
          key="recipes"
          title="RECIPES"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack>
        */}

      </Tabs>
    </Scene>

    {/* <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    /> */}
    <Scene
      back
      clone
      key="sendTxn"
      title="SEND MONEY"
      {...DefaultProps.navbarProps}
      component={SendMoneyContainer}
      Layout={SendMoneyComponent}
    />

    <Scene
      back
      clone
      key="confirm"
      title="Sent"
      {...DefaultProps.navbarProps}
      component={ConfirmContainer}
      Layout={ConfirmComponent}
    />

  </Stack>
);

export default Index;
