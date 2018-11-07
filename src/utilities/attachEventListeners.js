import storageChanged from 'storage-changed'

export default () => {
  storageChanged('local')
  storageChanged('session')
}
