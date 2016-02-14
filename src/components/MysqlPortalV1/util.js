import $ from 'jquery';

const debug = console.debug.bind(console);


const fetch = async (url) => new Promise((resolve, reject) =>
  $.get(url, res => {
    if (res && res.code === 200) {
      resolve(res.data);
    } else {
      reject(res);
    }
  }).fail(err => reject(err))
);


const tr = w => {
  const v = {
    'mysql-admin': 'mysql管理节点',
    perconahaproxy: 'mysql入口',
  };
  return v[w] ? v[w] : w;
};

function notNull(node, msg=<h1>Loading...</h1>){
  if(node){
    return node;
  }
  return msg;
}
export {debug, fetch, tr, notNull};



