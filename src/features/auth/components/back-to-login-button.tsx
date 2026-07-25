import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function BackToLoginButton() {
  return (
    <Link href="/login" className="w-full">
      <Button variant="secondary" className="w-full">
        Back to login
      </Button>
    </Link>
  );
}
