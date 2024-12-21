/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientOnly } from "remix-utils/client-only";
import { DEFAULT_APP_FOOTER_NAME } from "~/app-defaults";
import { isOurHostname } from "~/utils/misc";
import { useRules } from "./app-context";

export function Footer() {
  const { buildLastCommit, appFooterName } = useRules();

  return (
    <footer className="my-8 select-none text-sm text-neutral-400 drop-shadow-sm">
      <div className="text-center">
        <span>
          Todos os direitos reservados
		  &copy; {new Date().getFullYear()}{" "}
          {appFooterName || DEFAULT_APP_FOOTER_NAME}
        </span>
      </div>
      <ClientOnly
        children={() =>
          isOurHostname() ? (
            <div className="flex items-center justify-center gap-2">
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
