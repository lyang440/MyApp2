import React from 'react';
const API_HOST = "http://96a8to7r.apps.qbox.me";

const propTypesUser = React.PropTypes.arrayOf(React.PropTypes.shape({
  created_at: React.PropTypes.string.isRequired,
  department: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  real_name: React.PropTypes.string.isRequired,
  updated_at: React.PropTypes.string.isRequired,
}));

const propTypeDepartment = React.PropTypes.arrayOf(React.PropTypes.string.isRequired);

export { propTypesUser, propTypeDepartment, API_HOST };
