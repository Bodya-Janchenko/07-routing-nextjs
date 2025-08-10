"use client";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/app/notes/filter/@sidebar/default";

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
          {categories.map((category) => (
            <li key={category} className={css.menuItem}>
              <Link href={`/notes/filter/${category}`} className={css.menuLink}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
