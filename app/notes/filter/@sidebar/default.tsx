import css from './SidebarNotes.module.css' 
import Link from 'next/link';

const tags: string []= ['Meeting', 'Personal', 'Shopping', 'Todo', 'Work'];
const SidebarNotes = async () => {

  return (
 
      <ul className={css.menuList}>
        <li key={'all'} className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
  
  );
};

export default SidebarNotes;





