import { AppRouter } from './components/AppRouter';
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
