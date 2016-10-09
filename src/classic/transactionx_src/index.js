import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import todoApp from './reducers'
import App from './components/App'

const sagaMiddleware = createSagaMiddleware()

const app = {
  rootSaga,
  sagaMiddleware,
  todoApp,
  App
}
export default app
