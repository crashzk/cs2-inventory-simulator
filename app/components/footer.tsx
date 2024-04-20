/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRules } from "./app-context";

export function Footer() {
  const { buildLastCommit } = useRules();

  return (
    <footer className="my-8 select-none text-sm text-neutral-400 drop-shadow-sm">
      <div className="text-center">
        <span>
		  ZK Servidores™ - Melhores Servidores da Comunidade BR <br/>
		  &copy; 2017 - {new Date().getFullYear()} | Todos os direitos reservados
        </span>
      </div>
    </footer>
  );
}
