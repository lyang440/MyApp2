import $ from 'jquery';
import _ from 'lodash';
import React from 'react';

const debug = console.debug.bind(console);

const API_HOST = 'http://localhost:5000';

const fetch = async (url) => new Promise((resolve, reject) => {
  if (_.startsWith(url, 'http://') || _.startsWith(url, 'https://')) {

  } else {
    if (!_.startsWith(url, '/')) {
      url = '/' + url;
    }
    url = API_HOST + url;
  }
  $.get(url, res => {
    if (res && res.code === 200) {
      resolve(res.data);
    } else {
      reject(res);
    }
  }).fail(err => reject(err));

});


const tr = w => {
  const v = {
    'mysql-admin': 'mysql管理节点',
    perconahaproxy: 'mysql入口节点',
    normal: '正常',
    true: '是',
    false: '否',
  };
  console.assert(_.isString(w));
  if (w == '') {
    return '无';
  }
  if (v[w]) {
    return v[w];
  }
  if (/^percona-cluster-/.test(w)) {
    return w.replace('percona-cluster-', '数据节点');
  }
  return w;
};

function notNull(node, msg = <h1>Loading...</h1>) {
  if (node) {
    return node;
  }
  return msg;
}

function space(n) {
  n = n ? n : 1;
  return '　'.repeat(n);
}
export {debug, fetch, tr, notNull, space};



