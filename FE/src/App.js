import Header from './component/header';
import Addbar from './component/addbar';
import TodoTable from './component/todotable';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( {
  app: {
    textAlign: 'center'
  }
})

function App() {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <Header />
      <Addbar />
      <TodoTable />
    </div>
  );
}

export default App;
