import css from "./SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/work" className={css.menuLink}>
            Work
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/personal" className={css.menuLink}>
            Personal
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/meeting" className={css.menuLink}>
            Meeting
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/shopping" className={css.menuLink}>
            Shopping
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/todo" className={css.menuLink}>
            Todo
          </Link>
        </li>
      </ul>
    </ul>
  );
};
