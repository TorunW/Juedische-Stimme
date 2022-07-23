import { combineReducers } from 'redux'

import fbData from './fbdata/fbDataSlice'
import galleries from './galleries/galleriesSlice'
import posts from './posts/postsSlice'
import categories from './categories/categoriesSlice'
import users from './users/usersSlice'
import mediaItems from './mediaitems/mediaItemsSlice'
import nav from './nav/navSlice'
import tags from './tags/tagsSlice'

const reducers = combineReducers({ 
  fbData,
  galleries,
  posts,
  categories,
  users,
  mediaItems,
  nav,
  tags
})

export default reducers;