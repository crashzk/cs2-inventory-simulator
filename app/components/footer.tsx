/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ClientOnly } from "remix-utils/client-only";
import { DEFAULT_APP_FOOTER_NAME } from "~/app-defaults";
import { isOurHostname } from "~/utils/misc";
import { useRules } from "./app-context";

export function Footer() {
  const { sourceCommit, appFooterName } = useRules();

  return (
    <footer className="my-8 text-sm text-neutral-400 drop-shadow-xs select-none">
      <div className="text-center text-sm">
        <span>
        {appFooterName || DEFAULT_APP_FOOTER_NAME}
        </span>
      </div>
      <div className="text-center">
        <span>          
        &copy; Todos os direitos reservados | 2017 - {new Date().getFullYear()}{" "}
        </span>		
      </div>
      <ClientOnly
        children={() =>
          isOurHostname() ? (
            <div className="flex items-center justify-center gap-2 text-xs">
            </div>
          ) : (
            <div className="text-center text-[10px]">
            </div>
          )
        }
      />
    </footer>
  );
}
