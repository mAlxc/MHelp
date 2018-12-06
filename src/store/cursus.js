export default {
  firestorePath: 'cursus/{userId}',
  firestoreRefType: 'doc', // or 'doc'
  moduleName: 'cursus',
  statePropName: 'cursus',
  state: {
    list: []
  }
  // you can also add state/getters/mutations/actions
  // for other config like fillables see 'Extra features'

}
