
import css from './Home.module.css'

// import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>

      {/* <Link href="/">Go back home</Link> */}
    </div>
  );
};

export default NotFound;




