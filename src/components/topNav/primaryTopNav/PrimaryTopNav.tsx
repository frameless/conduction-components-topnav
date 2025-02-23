import * as React from "react";
import * as styles from "./PrimaryTopNav.module.css";
import clsx from "clsx";
import { Link } from "@gemeente-denhaag/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface ITopNavItem {
  label: string;
  icon?: JSX.Element;
  current?: boolean;
  handleClick?: () => any;
  subItems?: {
    label: string;
    icon?: JSX.Element;
    current?: boolean;
    handleClick?: () => any;
  }[];
}

export interface TopNavProps {
  items: ITopNavItem[];
  mobileLogo?: JSX.Element;
  layoutClassName?: string;
}

export const PrimaryTopNav = ({ items, mobileLogo, layoutClassName }: TopNavProps): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleItemClick = (handleClick?: () => any) => {
    if (handleClick) {
      handleClick();

      setIsOpen(false);
    }
  };

  return (
    <div className={clsx(styles.container, layoutClassName && layoutClassName)}>
      <div className={styles.menuToggleContainer}>
        {mobileLogo}

        <button className={styles.menuToggle} onClick={() => setIsOpen((o) => !o)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <nav className={clsx(styles.primary, isOpen && styles.isOpen)}>
        <ul className={styles.ul}>
          {items.map(({ label, icon, current, handleClick, subItems }, idx) => (
            <li
              onClick={() => handleItemClick(handleClick)}
              className={clsx(styles.li, current && styles.current)}
              key={idx}
            >
              <Link className={clsx(styles.link, styles.label)} icon={icon} iconAlign="start">
                {label}
              </Link>

              {subItems && (
                <ul className={styles.dropdown}>
                  {subItems.map(({ label, icon, current, handleClick }, idx) => (
                    <li
                      key={idx}
                      className={clsx(styles.li, current && styles.current)}
                      onClick={() => handleItemClick(handleClick)}
                    >
                      <Link className={clsx(styles.link, styles.label)} icon={icon} iconAlign="start">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
