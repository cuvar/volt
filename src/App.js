import UploadScreen from './components/UploadScreen';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  i18n.changeLanguage('de-DE');

  return (
    <div className="h-screen flex flex-col justify-center">
      <UploadScreen />
    </div>
  );
}

export default App;
