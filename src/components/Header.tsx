import Link from 'next/link';
import Image from 'next/image';
import paths from '@/app/pathHelper';
import TemperedStrengthSvg from '@/assets/TemperedStrength.svg';

const Header = () => (
  <header className="px-4 lg:px-8 py-4 max-w-3xl mx-auto">
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
      <div className="ml-4 flex">
        <Link className="p-4 hover:underline" href={paths.newsletter.route}>
          {paths.newsletter.friendlyName}
        </Link>
        <Link className="p-4 hover:underline" href={paths.tools.route}>
          {paths.tools.friendlyName}
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
