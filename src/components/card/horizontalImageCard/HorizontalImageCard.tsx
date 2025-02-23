import * as React from "react";
import * as styles from "./HorizontalImageCard.module.css";
import clsx from "clsx";
import { Link } from "@gemeente-denhaag/link";
import { navigate } from "gatsby";
import { ExternalLinkIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";

interface HorizontalImageCardProps {
  iconOrImage: JSX.Element;
  title: string;
  link: {
    label: string;
    href: string;
  };
  layoutClassName?: string;
  external?: boolean;
}

export const HorizontalImageCard = ({
  title,
  layoutClassName,
  external,
  link,
  iconOrImage,
}: HorizontalImageCardProps): JSX.Element => {
  return (
    <div className={clsx(styles.container, [layoutClassName && layoutClassName])} onClick={() => navigate(link.href)}>
      <div className={styles.imageOrIconContainer}>{iconOrImage}</div>
      <div className={styles.link}>
        <div className={styles.title}>{title}</div>
        <Link icon={external ? <ExternalLinkIcon /> : <ArrowRightIcon />} iconAlign="start">
          {link.label}
        </Link>
      </div>
    </div>
  );
};
