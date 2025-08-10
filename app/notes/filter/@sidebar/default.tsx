import css from "./SidebarNotes.module.css";
import Link from "next/link";

export const categories = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
