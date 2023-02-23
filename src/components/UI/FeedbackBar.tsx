import ReactDOM from 'react-dom';

import styles from './FeedbackBar.module.scss';

interface FeedbackBarProps {
  children: React.ReactNode;
}

const portalElement: HTMLElement = document.getElementById('overlays')!;

const FeedbackBar = ({ children }: FeedbackBarProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            className={styles.feedback}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </>,
        portalElement
      )}
    </>
  );
};

export default FeedbackBar;
