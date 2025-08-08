"use client";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
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
      )}
    </div>
  );
};

export default TagsMenu;
