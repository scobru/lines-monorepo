import React from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "~~/services/store/store";
import { HeartIcon } from "@heroicons/react/24/outline";
import SwitchTheme from "./SwitchTheme";

/**
 * Site footer
 */
export default function Footer() {
  const ethPrice = useAppStore(state => state.ethPriceSlice.ethPrice);

  return (
    <div className="min-h-0 p-5 flex justify-between items-center flex-col sm:flex-row gap-4 bg-base-100"  >
      <div>
        <div className="fixed z-10 m-4 bottom-0 left-0">
          {ethPrice > 0 && (
            <div className="btn btn-primary btn-sm font-normal cursor-auto">
              <CurrencyDollarIcon className="h-4 w-4 mr-0.5" />
              <span>{ethPrice}</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <ul className="menu menu-horizontal px-1">
          <div className="flex items-center gap-2 text-sm">
            <div>
              <a
                href="https://github.com/scobru/lines-monorepo"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Code
              </a>
            </div>
            <span>·</span>
            <div>
              Coded <HeartIcon className="inline-block h-4 w-4" /> by{" "}
              <a
                href="https://github.com/scobru"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                scobru
              </a>{" "}
              with{" "}
              <a
                href="https://github.com/scaffold-eth/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Scaffold-Eth
              </a>
            </div>
            <span>·</span>
            <div>
              <a
                href="https://twitter/scobru1988"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                Follow me
              </a>
            </div>
          </div>
        </ul>
      </div>
      <div className="mr-4 text-sm">
        <div className="fixed z-10 m-4 bottom-0 right-0">
          <SwitchTheme />
        </div>
      </div>
    </div>
  );
}
