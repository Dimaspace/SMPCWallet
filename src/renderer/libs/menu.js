import { remote } from 'electron'
console.log(remote)

const Menu = remote.Menu
const MenuItem = remote.MenuItem
function initMenu(that){

  const menu = new Menu();
  const menu2 = new Menu();
  menu.append(new MenuItem({label:that.$t('action').revoke, role: 'undo' }));
  menu.append(new MenuItem({label:that.$t('action').redo, role: 'redo' }));
  menu.append(new MenuItem({label:that.$t('action').cut, role: 'cut' }));
  menu.append(new MenuItem({label:that.$t('action').copy, role: 'copy' }));
  menu.append(new MenuItem({label:that.$t('action').paste, role: 'paste' }));
  menu.append(new MenuItem({label:that.$t('action').delete, role: 'delete' }));
  menu.append(new MenuItem({ label:that.$t('action').selectAll, role: 'selectall' }));

  menu2.append(new MenuItem({label:'复制', role: 'copy' }));

  window.addEventListener('contextmenu', (e) => { 
    console.log(that.$t('action').revoke)
    e.preventDefault();
    if(isEleEditable(e.target)){
      menu.popup(remote.getCurrentWindow());
    }else{
      //判断有文本选中
      let selectText = window.getSelection().toString();
      if(!!selectText){
          menu2.popup(remote.getCurrentWindow());
      }
    }
  }, false) 
}
function isEleEditable(e){
  // return true
  if(!e){
    return false;
  }
  //为input标签或者contenteditable属性为true
  if(e.tagName == 'INPUT' || e.contentEditable == 'true'){
    return true;
  }else{
    //递归查询父节点
    return isEleEditable(e.parentNode)
  }
}
// initMenu()
export default initMenu