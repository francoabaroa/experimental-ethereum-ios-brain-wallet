import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMoney } from '../actions/member';

const SendMoney = ({
  Layout,
  onFormSubmit,
  member,
  isLoading,
  errorMessage,
  successMessage,
}) => (
  <Layout
    member={member}
    loading={isLoading}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
  />
);

SendMoney.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

SendMoney.defaultProps = {
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: sendMoney,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
