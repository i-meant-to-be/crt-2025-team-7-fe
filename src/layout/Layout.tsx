import clsx from 'clsx';
import { MenuType } from '../types/types';
import { PropsWithChildren, useState } from 'react';
import Button from '../components/Button/Button';
import { BiLogOut } from 'react-icons/bi';

export default function Layout({ children }: PropsWithChildren) {
  const [menu, setMenu] = useState<MenuType>('RECIPE');

  const handleMenuClick = (selectedMenu: MenuType) => {
    setMenu(selectedMenu);
  };

  const getButtonClass = (menuType: MenuType) => {
    return clsx('transition-colors duration-200', {
      'bg-primary-container/50 hover:bg-primary-container text-primary':
        menu === menuType,
      'bg-neutral-100 text-black hover:bg-neutral-200 ': menu !== menuType,
    });
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="relative flex flex-col h-full w-48 px-4 py-12 bg-primary-container/30 shadow-md rounded-xl  border-dim items-center space-y-8">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full" />

        {/* Title and user Info */}
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-primary text-[24px]">브루로그</h1>
          <p className="text-[12px]">사용자 이름</p>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-2">
          {[
            { type: 'RECIPE', label: '레시피' },
            { type: 'BREWING_HISTORY', label: '브루잉 기록' },
          ].map((item) => (
            <Button
              key={item.type}
              label={item.label}
              className={getButtonClass(item.type as MenuType)}
              onClick={() => handleMenuClick(item.type as MenuType)}
            />
          ))}
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <button className="bg-neutral-100 text-black p-3 rounded-full hover:bg-neutral-400 duration-200 transition-colors shadow-md size-10 flex items-center justify-center cursor-pointer">
            <BiLogOut className="size-full" />
          </button>
        </div>
      </div>
      <div className="flex w-full">{children}</div>
    </div>
  );
}
