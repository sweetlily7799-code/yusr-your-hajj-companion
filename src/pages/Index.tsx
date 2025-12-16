import { AppProvider } from '@/contexts/AppContext';
import { YusrApp } from '@/components/YusrApp';

const Index = () => {
  return (
    <AppProvider>
      <YusrApp />
    </AppProvider>
  );
};

export default Index;
