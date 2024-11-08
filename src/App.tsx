import { RecoilRoot } from 'recoil';

import { EventMain } from './feature/ui/EventMain.tsx';

function App() {
  return (
    <RecoilRoot>
      <EventMain />
    </RecoilRoot>
  );
}

export default App;
