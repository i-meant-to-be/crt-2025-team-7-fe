import { QRCodeSVG } from 'qrcode.react';
import useGetSharedRecipe from '../../../apis/hooks/useGetSharedRecipe';
import { useEffect, useState } from 'react';
import { IoLinkOutline, IoShareOutline } from 'react-icons/io5';
import clsx from 'clsx';

interface RecipeShareModalProps {
  id: number;
}

export default function RecipeShareModal({ id }: RecipeShareModalProps) {
  const { data, isLoading } = useGetSharedRecipe(id);
  const shareUrl = import.meta.env.VITE_SHARE_URL + `/${id}`;
  const [copyState, setCopyState] = useState(false);

  const handleCopy = async () => {
    if (data) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopyState(true);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  // Close indicator after 3 seconds
  // which tells user that URL is copied to clipboard
  useEffect(() => {
    if (copyState) {
      setTimeout(() => {
        setCopyState(false);
      }, 3000);
    }
  }, [copyState]);

  // If no error or on loading, print modal contents
  return (
    <div className="flex w-[500px] flex-col items-center justify-center space-y-10 p-[40px]">
      <div className="relative flex size-[290px] items-center justify-center rounded-2xl">
        {/* This component appears to tell the user that URL is succefully copied to clipboard. */}
        {/* It will disappear after 3 seconds. */}
        {copyState && (
          <div className="absolute flex size-full rounded-2xl">
            <div className="absolute z-10 size-full rounded-2xl bg-default-black opacity-80" />
            <div className="absolute z-20 flex size-full flex-col items-center justify-center space-y-4  p-[30px] text-default-white">
              <IoShareOutline className="size-[120px]" />
              <p className="whitespace-nowrap text-center text-[20px]">
                링크가 클립보드에 복사됨
              </p>
            </div>
          </div>
        )}

        {/* QR code is here. */}
        {/* If QR code is not prepared because response is not arrived, spinner will be shown. */}
        <div className="m-[50px] flex size-full items-center justify-center">
          {isLoading && <p>로딩 실패</p>}
          {!isLoading && (
            <QRCodeSVG
              value={shareUrl}
              bgColor="#f6f5f4"
              className="size-full"
            />
          )}
        </div>
      </div>

      {/* Button that copies URL to the user's clipboard. */}
      <button
        // className="button enabled brand flex w-[360px] items-center justify-center gap-[12px] rounded-full"
        // className={`button ${!isLoading ? 'enabled' : 'disabled'} relative flex h-[64px] w-[360px] items-center px-5`}
        className={clsx(
          'flex w-[360px] items-center justify-center gap-[12px] rounded-full',
          {
            'button disabled': isLoading,
            'button enabled brand': !isLoading,
          },
        )}
        disabled={isLoading}
        onClick={handleCopy}
      >
        <IoLinkOutline className="size-[24px]" />
        <p>{isLoading ? '링크 준비 중' : '공유 링크 복사'}</p>
      </button>
    </div>
  );
}
