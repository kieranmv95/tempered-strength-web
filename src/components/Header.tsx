import Link from 'next/link';
import Image from 'next/image';
import paths from '@/app/pathHelper';
import TemperedStrengthSvg from '@/assets/TemperedStrength.svg';

const Header = () => (
  <header className="px-8 py-4 max-w-3xl mx-auto">
    <nav className="flex items-center">
      <Link href={paths.home.route}>
        <Image
          src={TemperedStrengthSvg as any}
          alt="Primary Logo"
          width={400}
          height={188}
          className="w-36"
          priority
        />
      </Link>
      <div>
        <Link className="p-4 hover:underline" href={paths.newsletter.route}>
          Newsletter
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
