import { AppRouter } from './components/AppRouter';
import { SnackbarProvider } from './hoc/SnackProvider';

function App() {
  return (
    <SnackbarProvider>
      <AppRouter />
    </SnackbarProvider>
  );
}

export default App;
