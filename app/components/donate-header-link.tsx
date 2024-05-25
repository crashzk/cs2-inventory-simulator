/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { faStar } from "@fortawesome/free-classic-svg-icons";
import { useTranslate } from "./app-context";
import { HeaderLink } from "./header-link";

export function DonateHeaderLink() {
  const translate = useTranslate();
  /* Consider donating to the project on donate.cstrike.app if you are
  self-hosting this app! */
  return (
    typeof window !== "undefined" &&
    ["cs2.zkservidores.com", "localhost"].includes(
      window.location.hostname
    ) && (
      <HeaderLink
        className="font-bold"
        icon={faStar}
        label={translate("HeaderDonate")}
        target="_blank"
        to="https://vip.zkservidores.com"
      />
    )
  );
}
