import { ReactNode, useState, useCallback, useEffect } from 'react';
import { GlobalPortal } from '../utils/GlobalPortal';
import { CgClose } from 'react-icons/cg';

interface UseModalOptions {
  closeOnOverlayClick?: boolean;
  isCloseButtonExist?: boolean;
  onClose?: () => void;
}

/**
 * 모달을 쉽게 열고 닫을 수 있는 훅.
 * @param options 모달 표시 옵션
 */
export function useModal(options: UseModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    closeOnOverlayClick = true,
    isCloseButtonExist = true,
    onClose = () => {},
  } = options;

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    onClose();
    setIsOpen(false);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        closeModal();
      }
    },
    [closeModal, closeOnOverlayClick],
  );

  const ModalWrapper = ({
    children,
    closeButtonColor = 'text-neutral-0 hover:text-gray-300',
  }: {
    children: ReactNode;
    closeButtonColor?: string;
  }) => {
    if (!isOpen) return null;

    return (
      <GlobalPortal.Consumer>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="relative overflow-hidden rounded-[20px] bg-white shadow-lg">
            {children}
            {isCloseButtonExist && (
              <button
                type="button"
                onClick={closeModal}
                className={`absolute right-4 top-4 text-3xl cursor-pointer ${closeButtonColor}`}
                aria-label="모달 닫기"
              >
                <CgClose className="size-[32px]" />
              </button>
            )}
          </div>
        </div>
      </GlobalPortal.Consumer>
    );
  };

  return { isOpen, openModal, closeModal, ModalWrapper };
}
