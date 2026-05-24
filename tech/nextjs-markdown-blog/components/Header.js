import Link from "next/link";

const Header = () => {
  return (
    <header className='content'>
      <nav className='navigation'>
        <Link href='/' passHref>
          <a>My Blog</a>
        </Link>
        <Link href='/about' passHref>
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
