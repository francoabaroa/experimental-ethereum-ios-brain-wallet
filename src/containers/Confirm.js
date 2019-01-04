import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Confirm = ({
  Layout,
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
  />
);

Confirm.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

Confirm.defaultProps = {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
