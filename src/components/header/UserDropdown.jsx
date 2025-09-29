import { useState } from "react";
import Button from "../ui/Button";
import { ArrowDownIcon, LogoutIcon } from "../../icons";
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import Avatar from "../ui/Avatar";
import { Image } from "../../utils/constant";
import { useLogout } from "../../hooks/queries/auth.query";
import { useAuthStore } from "../../store/auth.store";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuthStore()
  const { mutate, isPending, isError, error } = useLogout()

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Avatar src={user?.avatar || Image} />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{user?.first_name}</span>
        <ArrowDownIcon isOpen={isOpen} />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={toggleDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
        </div>

        <Button loading={isPending} className="mt-2" onClick={mutate} variant='neutral' startIcon={<LogoutIcon width={18} height={18} />}>Sign out</Button>
      </Dropdown>
    </div>
  );
}
