import { ConfigUI } from '../components/ConfigUi';
import { ChatUI } from '../components/ChatUi';

export function Preview() {
  return (
    <div className="max-w-7xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto w-full">
  <ConfigUI />
  <ChatUI />
</div>

  );
}

export default Preview;