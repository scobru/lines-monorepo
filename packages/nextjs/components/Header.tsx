import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Faucet } from "~~/components/scaffold-eth";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { PencilSquareIcon, Bars4Icon, DocumentIcon, Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${isActive ? "bg-secondary shadow-md" : ""
        } hover:bg-secondary focus:bg-secondary my-3 mx-1 text-sm font-semibold rounded-full  gap-2`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/">
          {" "}
          <HomeIcon className="h-4 w-4" />
        </NavLink>
      </li>
      {/* <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Debug Contracts
        </NavLink>
      </li> */}
      <li>
        <NavLink href="/lines">
          <h1 className="text-base font-semibold my-0">Lines</h1>
        </NavLink>
      </li>
      <li>
        <NavLink href="/linetweets">
          <h1 className="text-base font-semibold my-0">LinesTweet</h1>{" "}
        </NavLink>
      </li>
      <li>
        <NavLink href="https://scobru.gitbook.io/lines/">
          <h1 className="text-base font-semibold my-0">Docs</h1>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-1 flex-shrink-0 justify-between z-20 shadow-sm shadow-secondary">
      <div className="navbar-start w-auto lg:w-1/2 ">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <button
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </button>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-2 mx-4">
          {/* <Link href="/" passHref className="flex relative w-10 h-10">
            <Image alt="scaffold-eth logo" className="cursor-pointer" fill src="/logo.svg" />
          </Link> */}
          <div className="flex flex-col py-2">
            <span className="font-bold text-xl">▤ Lines</span>
            {/*             <span className="text-xs">Decentralized Open Board</span>
 */}          </div>
        </div>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <Faucet />
      </div>
    </div>
  );
}
