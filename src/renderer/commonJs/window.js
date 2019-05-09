
export default (that,action) =>
{
  that.$electron.ipcRenderer.send(`window-${action}`)
}
