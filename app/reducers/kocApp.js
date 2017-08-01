const kocApp = (state = { pageHeader: "NO_HEADER" , pageCount:0}, action) => {
  const pageCount = state.pageCount
  switch (action.type) {
    case 'CHANGE_HEADER':
      return { pageHeader: action.new_header }
      case 'INCREASE_PCA':
      return Object.assign({},state,{ pageCount: pageCount+1 });
      case 'INCREASE_PC':
      return { pageCount: pageCount+1 };
    default:
      return state;
  }
}

export default kocApp
