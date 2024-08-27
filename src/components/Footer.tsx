import Link from 'next/link';
import Image from 'next/image';
import paths from '@/app/pathHelper';
import TemperedStrengthSvg from '@/assets/TemperedStrength.svg';

export const Footer = () => (
  <footer className="px-4 lg:px-8 py-4 max-w-3xl mx-auto mt-4 sticky top-[100vh]">
    <div className="md:flex gap-4 items-center">
      <Link href={paths.home.route}>
        <Image
          src={TemperedStrengthSvg as any}
          alt="Primary Logo"
          width={400}
          height={188}
          className="w-28"
        />
      </Link>
      <nav className="mt-3">
        <ul className="md:flex md:gap-4">
          <li>
            <Link
              className="hover:underline py-2 block"
              href={paths.newsletter.route}
            >
              {paths.newsletter.friendlyName}
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline py-2 block"
              href={paths.blog.route}
            >
              {paths.blog.friendlyName}
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline py-2 block"
              href={paths.tools.route}
            >
              {paths.tools.friendlyName}
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline py-2 block"
              href={paths.author.route}
            >
              {paths.author.friendlyName}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);
