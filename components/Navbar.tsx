'use client';

import { FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import useDarkMode from "@/utils/hooks/useDarkMode";
import { signIn } from "next-auth/react";

interface AppbarProps { }

const Appbar: React.FC<AppbarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [colorTheme, setTheme] = useDarkMode();

  const handleClick = () => {
    const email = session?.user?.email;
    router.push(pathname! + "?email=" + email);
  }

  return (
    status === "loading" ?
      <div className="mx-auto">
        <p>Validating session ...</p>
      </div>
      :
      <header className="flex justify-between container items-center py-2 px-4 shadow-sm">
        <div className="flex space-x-5">
          <Link href="/">
            <span className="text-lg font-bold">Logo</span>
          </Link>
          <Link href="/">
            <span className="text-gray-500 hover:text-gray-900">Home</span>
          </Link>
          <Link href="/portfolios">
            <span className="text-gray-500 hover:text-gray-900">Assets</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {colorTheme === "light" ? (
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme("light")}
            >
              {<FiSun />}
            </button>
          ) : (
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme("dark")}
            >
              {<FiMoon />}
            </button>

          )}
          {session ? (
            <>
              <button
                type="button"
                onClick={(handleClick)}
              >
                {<FiUser className="ml-1" />}
              </button>
              <button
                type="button"
                onClick={() => signOut()}
              >
                {<FiLogOut className="ml-1" />}
              </button>
              <Image
                src={session?.user?.image || "/user.svg"}
                alt={session?.user?.name!}
                className="w-8 h-8 rounded-full"
                width="100"
                height="100"
              />
            </>
          ) : (
            <Link href="/api/auth/signin">
              <span className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">
                <a onClick={()=> signIn()}>Sign In</a>
              </span>
            </Link>
          )}
        </div>
      </header>

  );
};

export default Appbar;
