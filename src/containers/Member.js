import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData, refreshBalance } from '../actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    refreshBalance: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => {
    const { fetchData } = this.props;
    refreshBalance();
    fetchData();
  }

  render = () => {
    const { Layout, member, memberLogout } = this.props;
    console.log(member,' MEMBER');

    return <Layout member={member} logout={memberLogout} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
  refreshBalance: refreshBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
