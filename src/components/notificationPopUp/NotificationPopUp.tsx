import * as React from "react";
import * as styles from "./NotificationPopUp.module.css";
import ReactDOM from "react-dom";
import { Button } from "@gemeente-denhaag/button";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { Link } from "@gemeente-denhaag/link";
import { StylesProvider } from "@gemeente-denhaag/stylesprovider";
import clsx from "clsx";
import { CloseIcon, ArrowRightIcon } from "@gemeente-denhaag/icons";

export interface NotificationPopUpProps {
  title: string;
  description: string | JSX.Element;
  isVisible: boolean;
  hide: () => void;
  primaryButton: {
    label: string;
    icon?: JSX.Element;
    handleClick: () => any;
    layoutClassName?: string;
  };
  secondaryButton?: {
    label: string;
    icon?: JSX.Element;
    handleClick: () => any;
    layoutClassName?: string;
  };
  layoutClassName?: string;
}

export const NotificationPopUp = ({
  title,
  description,
  isVisible,
  hide,
  primaryButton,
  secondaryButton,
  layoutClassName,
}: NotificationPopUpProps): JSX.Element | null => {
  const [animationVisible, setAnimationVisible] = React.useState<boolean>(true);

  const animationDuration = parseInt(styles.animationDuration, 10);

  const handleClick = (clickFunction?: () => any) => {
    setAnimationVisible(!setAnimationVisible);
    clickFunction && clickFunction();
    setTimeout(() => {
      hide();
      setAnimationVisible(true);
    }, animationDuration);
  };

  const modal = (
    <StylesProvider>
      <div
        style={{ animationDuration: `${animationDuration}ms` }}
        className={clsx(styles.modal, animationVisible && styles.visible, layoutClassName)}
      >
        <Heading3>{title}</Heading3>

        <Paragraph>{description}</Paragraph>

        <div className={styles.buttons}>
          {secondaryButton && (
            <div onClick={() => handleClick(secondaryButton.handleClick)} className={secondaryButton.layoutClassName}>
              <Link icon={secondaryButton.icon ?? <CloseIcon />} iconAlign="start">
                {secondaryButton.label}
              </Link>
            </div>
          )}

          <Button
            icon={primaryButton.icon ?? <ArrowRightIcon />}
            onClick={() => handleClick(primaryButton.handleClick)}
            className={primaryButton.layoutClassName}
          >
            {primaryButton.label}
          </Button>
        </div>
      </div>
    </StylesProvider>
  );

  return isVisible ? ReactDOM.createPortal(modal, document.body) : null;
};

export const NotificationPopUpController = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  return {
    isVisible,
    show,
    hide,
  };
};
