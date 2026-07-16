import CreatePostForm from '@/components/form/create-post';
import ModeToggle from '@/components/mode-toggle';

export default function HomePage() {
  return (
    <div>
      <ModeToggle />
      <CreatePostForm />
    </div>
  );
}
