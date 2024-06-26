/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ian Lucas. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { middleware } from "~/http.server";

export const meta: MetaFunction = () => {
  return [{ title: "ZK Servidores™ | Skinchanger" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await middleware(request);
  return null;
}

export default function Index() {
  return null;
}
