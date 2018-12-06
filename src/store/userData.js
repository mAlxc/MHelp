export default {
  firestorePath: 'users/{userId}',
  firestoreRefType: 'doc',
  moduleName: 'user',
  statePropName: 'user',
  sync: {
    guard: ['logged'] // will not be synced to firestore
  },
  state: {
    setting: { mode: 'dark' },
    email: '',
    id: '',
    logged: false,
    firstName: '',
    lastName: ''

  }
  // you can also add state/getters/mutations/actions
  // for other config like fillables see 'Extra features'

}
